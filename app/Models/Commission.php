<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Commission extends Model
{
    use HasFactory;

    protected $table = 'commissions';

    protected $fillable = [
        'affiliate_id',
        'order_id',
        'method_id',
        'rule_id',
        'amount',
        'commission_type',
        'depth_level',
        'calculation_detail',
        'status',
        'calculated_at',
        'approved_at',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'depth_level' => 'integer',
        'calculation_detail' => 'array',
        'calculated_at' => 'datetime',
        'approved_at' => 'datetime',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // ===== BELONGS TO =====

    /**
     * Affiliate yang menerima commission
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Order yang generate commission
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Commission method
     */
    public function method(): BelongsTo
    {
        return $this->belongsTo(CommissionMethod::class, 'method_id');
    }

    /**
     * Commission rule
     */
    public function rule(): BelongsTo
    {
        return $this->belongsTo(CommissionRule::class, 'rule_id');
    }

    // ===== HAS MANY =====

    /**
     * Commission calculations
     */
    public function calculations(): HasMany
    {
        return $this->hasMany(CommissionCalculation::class, 'commission_id');
    }

    /**
     * Ledger records
     */
    public function ledgers(): HasMany
    {
        return $this->hasMany(CommissionLedger::class, 'commission_id');
    }

    /**
     * Binary payouts
     */
    public function payouts(): HasMany
    {
        return $this->hasMany(BinaryPayout::class, 'commission_id');
    }

    // ===== SCOPES =====

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}
