<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Affiliate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'username',
        'slug',
        'sponsor_id',
        'upline_id',
        'activation_code_id',
        'position',
        'level',
        'direct_downline',
        'total_downline',
        'left_count',
        'right_count',
        'pair_count',
        'left_volume',
        'right_volume',
        'total_personal_volume',
        'total_volume',
        'is_active',
        'activated_at',
        'last_activity_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'level' => 'integer',
        'pair_count' => 'integer',
        'right_count' => 'integer',
        'left_count' => 'integer',
        'direct_downline' => 'integer',
        'total_downline' => 'integer',
        'left_volume' => 'decimal:2',
        'right_volume' => 'decimal:2',
        'total_personal_volume' => 'decimal:2',
        'total_volume' => 'decimal:2',
        'is_active' => 'boolean',
        'activated_at' => 'datetime',
        'last_activity_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Default attribute values.
     *
     * @var array<string, mixed>
     */
    protected $attributes = [
        'position' => 'none',
        'level' => 1,
        'pair_count' => 0,
        'right_count' => 0,
        'left_count' => 0,
        'direct_downline' => 0,
        'is_active' => true,
    ];

    /**
     * Scope untuk affiliate aktif.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope untuk affiliate berdasarkan posisi.
     */
    public function scopePosition($query, $position)
    {
        return $query->where('position', $position);
    }

    /**
     * Scope untuk affiliate berdasarkan level.
     */
    public function scopeLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    /**
     * Scope untuk affiliate dengan upline tertentu.
     */
    public function scopeUpline($query, $uplineId)
    {
        return $query->where('upline_id', $uplineId);
    }

    /**
     * Scope untuk affiliate dengan sponsor tertentu.
     */
    public function scopeSponsor($query, $sponsorId)
    {
        return $query->where('sponsor_id', $sponsorId);
    }

    /**
     * Relasi ke model User (pemilik affiliate).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke sponsor (User yang mengajak).
     */
    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sponsor_id');
    }

    /**
     * Relasi ke upline (User di atasnya dalam binary tree).
     */
    public function upline(): BelongsTo
    {
        return $this->belongsTo(User::class, 'upline_id');
    }

    /**
     * Activation code yang digunakan untuk membuat affiliate ini
     */
    public function activationCode(): BelongsTo
    {
        return $this->belongsTo(ActivationCode::class);
    }

    /**
     * Orders yang dijual oleh affiliate ini
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Commissions yang diterima affiliate ini
     */
    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class);
    }

    /**
     * Commission calculations untuk affiliate
     */
    public function commissionCalculations(): HasMany
    {
        return $this->hasMany(CommissionCalculation::class);
    }

    /**
     * Withdrawals dari affiliate
     */
    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }

    /**
     * Bank accounts milik affiliate
     */
    public function bankAccounts(): HasMany
    {
        return $this->hasMany(AffiliateBankAccount::class);
    }

    /**
     * Matching histories
     */
    public function matchingHistories(): HasMany
    {
        return $this->hasMany(MatchingHistory::class);
    }

    /**
     * Commission ledgers (audit trail)
     */
    public function commissionLedgers(): HasMany
    {
        return $this->hasMany(CommissionLedger::class);
    }

    /**
     * Binary payouts
     */
    public function binaryPayouts(): HasMany
    {
        return $this->hasMany(BinaryPayout::class);
    }

    /**
     * MLM Tree record
     */
    public function mlmTree(): HasOne
    {
        return $this->hasOne(MlmTree::class);
    }

    /**
     * Withdrawal policies (many-to-many)
     */
    public function withdrawalPolicies()
    {
        return $this->belongsToMany(
            WithdrawalPolicy::class,
            'affiliate_withdrawal_policies',
            'affiliate_id',
            'policy_id'
        );
    }

    /**
     * Relasi ke downline langsung (sponsor-based).
     */
    public function directDownlines(): HasMany
    {
        return $this->hasMany(Affiliate::class, 'sponsor_id', 'user_id');
    }

    /**
     * Relasi ke downline binary (upline-based).
     */
    public function binaryDownlines(): HasMany
    {
        return $this->hasMany(Affiliate::class, 'upline_id', 'user_id');
    }

    /**
     * Relasi ke downline di posisi left.
     */
    public function leftDownlines(): HasMany
    {
        return $this->binaryDownlines()->where('position', 'left');
    }

    /**
     * Relasi ke downline di posisi right.
     */
    public function rightDownlines(): HasMany
    {
        return $this->binaryDownlines()->where('position', 'right');
    }

    /**
     * Mendapatkan semua downline (recursive - sponsor tree).
     */
    public function getAllDownlines()
    {
        $downlines = collect();
        
        foreach ($this->directDownlines as $downline) {
            $downlines->push($downline);
            $downlines = $downlines->merge($downline->getAllDownlines());
        }
        
        return $downlines;
    }

    /**
     * Mendapatkan downline berdasarkan level tertentu.
     *
     * @param int $level Level yang dicari (1 = direct, 2 = level 2, dst)
     * @return \Illuminate\Support\Collection
     */
    public function getDownlineByLevel(int $level = 1)
    {
        if ($level === 1) {
            return $this->directDownlines;
        }
        
        $downlines = collect();
        foreach ($this->directDownlines as $downline) {
            $downlines = $downlines->merge($downline->getDownlineByLevel($level - 1));
        }
        
        return $downlines;
    }

    /**
     * Mendapatkan jaringan binary (tree structure).
     */
    public function getBinaryTree($depth = 3)
    {
        $tree = [
            'affiliate' => $this,
            'left' => null,
            'right' => null,
        ];
        
        if ($depth > 0) {
            $leftDownline = $this->leftDownlines->first();
            $rightDownline = $this->rightDownlines->first();
            
            if ($leftDownline) {
                $tree['left'] = $leftDownline->getBinaryTree($depth - 1);
            }
            
            if ($rightDownline) {
                $tree['right'] = $rightDownline->getBinaryTree($depth - 1);
            }
        }
        
        return $tree;
    }

    /**
     * Update statistik downline.
     */
    public function updateDownlineStats(): void
    {
        $this->direct_downline = $this->directDownlines()->count();
        $this->left_count = $this->leftDownlines()->count();
        $this->right_count = $this->rightDownlines()->count();
        
        // Update pairing count (min dari left dan right)
        $this->pair_count = min($this->left_count, $this->right_count);
        
        $this->save();
    }

    /**
     * Update statistik upline chain (recursive).
     */
    public function updateUplineChainStats(): void
    {
        $this->updateDownlineStats();
        
        // Update upline
        if ($this->upline) {
            $this->upline->affiliate->updateUplineChainStats();
        }
    }

    /**
     * Mendapatkan semua upline (chain ke atas).
     */
    public function getUplineChain($maxLevel = 10)
    {
        $chain = collect();
        $current = $this;
        
        for ($i = 0; $i < $maxLevel; $i++) {
            if (!$current->upline) {
                break;
            }
            
            $chain->push($current->upline);
            $current = $current->upline->affiliate;
            
            if (!$current) {
                break;
            }
        }
        
        return $chain;
    }

    /**
     * Mendapatkan total downline (semua level).
     */
    public function getTotalDownlineCount(): int
    {
        $total = $this->direct_downline;
        
        foreach ($this->directDownlines as $downline) {
            $total += $downline->getTotalDownlineCount();
        }
        
        return $total;
    }

    /**
     * Cek apakah user adalah downline dari affiliate ini.
     */
    public function isDownlineOf($affiliateId): bool
    {
        $current = $this;
        
        while ($current->upline_id) {
            if ($current->upline_id == $affiliateId) {
                return true;
            }
            
            // Move up
            $current = Affiliate::where('user_id', $current->upline_id)->first();
            if (!$current) {
                break;
            }
        }
        
        return false;
    }

    /**
     * Mendapatkan sponsor chain (hingga root).
     */
    public function getSponsorChain()
    {
        $chain = collect();
        $current = $this;
        
        while ($current->sponsor) {
            $chain->push($current->sponsor);
            $current = $current->sponsor->affiliate;
            
            if (!$current) {
                break;
            }
        }
        
        return $chain;
    }

    /**
     * Place new downline in binary position.
     *
     * @param int $newDownlineUserId
     * @param string $position
     * @return Affiliate|null
     */
    public function placeBinaryDownline($newDownlineUserId, $position = 'left'): ?Affiliate
    {
        if (!in_array($position, ['left', 'right'])) {
            return null;
        }
        
        // Cek apakah posisi sudah terisi
        if ($position === 'left' && $this->leftDownlines()->exists()) {
            return null; // Posisi left sudah terisi
        }
        
        if ($position === 'right' && $this->rightDownlines()->exists()) {
            return null; // Posisi right sudah terisi
        }
        
        // Temukan affiliate untuk user baru
        $newAffiliate = Affiliate::where('user_id', $newDownlineUserId)->first();
        
        if ($newAffiliate) {
            // Update affiliate yang sudah ada
            $newAffiliate->update([
                'upline_id' => $this->user_id,
                'position' => $position,
                'level' => $this->level + 1,
            ]);
            
            // Update stats
            $this->updateUplineChainStats();
            
            return $newAffiliate;
        }
        
        return null;
    }

    /**
     * Get depth/level in binary tree from root.
     */
    public function getBinaryDepth(): int
    {
        $depth = 0;
        $current = $this;
        
        while ($current->upline) {
            $depth++;
            $current = $current->upline->affiliate;
            
            if (!$current) {
                break;
            }
        }
        
        return $depth;
    }

    /**
     * Accessor untuk full network info.
     */
    public function getNetworkInfoAttribute(): array
    {
        return [
            'direct_downline' => $this->direct_downline,
            'total_downline' => $this->getTotalDownlineCount(),
            'left_count' => $this->left_count,
            'right_count' => $this->right_count,
            'pair_count' => $this->pair_count,
            'level' => $this->level,
            'position' => $this->position,
            'binary_depth' => $this->getBinaryDepth(),
        ];
    }

    /**
     * Accessor untuk upline info.
     */
    public function getUplineInfoAttribute(): ?array
    {
        if (!$this->upline) {
            return null;
        }
        
        return [
            'id' => $this->upline->id,
            'name' => $this->upline->name,
            'email' => $this->upline->email,
            'position' => $this->position,
        ];
    }

    /**
     * Accessor untuk sponsor info.
     */
    public function getSponsorInfoAttribute(): ?array
    {
        if (!$this->sponsor) {
            return null;
        }
        
        return [
            'id' => $this->sponsor->id,
            'name' => $this->sponsor->name,
            'email' => $this->sponsor->email,
        ];
    }

    /**
     * Boot method untuk events.
     */
    protected static function boot()
    {
        parent::boot();
        
        // Update stats setelah affiliate dibuat/diupdate
        static::saved(function ($affiliate) {
            $affiliate->updateDownlineStats();
            
            // Jika upline berubah, update upline chain
            if ($affiliate->isDirty('upline_id')) {
                $oldUplineId = $affiliate->getOriginal('upline_id');
                $newUplineId = $affiliate->upline_id;
                
                // Update old upline
                if ($oldUplineId) {
                    $oldUpline = Affiliate::where('user_id', $oldUplineId)->first();
                    if ($oldUpline) {
                        $oldUpline->updateDownlineStats();
                    }
                }
                
                // Update new upline
                if ($newUplineId) {
                    $newUpline = Affiliate::where('user_id', $newUplineId)->first();
                    if ($newUpline) {
                        $newUpline->updateDownlineStats();
                    }
                }
            }
        });
        
        // Update upline stats setelah affiliate dihapus
        static::deleted(function ($affiliate) {
            if ($affiliate->upline) {
                $affiliate->upline->affiliate->updateDownlineStats();
            }
        });
    }
}