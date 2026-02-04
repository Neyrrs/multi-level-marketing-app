<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ActivationCode extends Model
{
    use HasFactory;

    protected $table = 'activation_codes';

    protected $fillable = [
        'code',
        'owner_id',
        'used_by',
        'generated_by',
        'status',
        'used_at',
        'expired_at',
        'value',
        'gives_commission',
        'commission_value',
        'price',
        'product_id',
        'package_id',
        'generated_from',
        'usage_count',
        'remaining_usage',
        'notes',
    ];

    protected $casts = [
        'gives_commission' => 'boolean',
        'value' => 'decimal:2',
        'commission_value' => 'decimal:2',
        'price' => 'decimal:2',
        'usage_count' => 'integer',
        'remaining_usage' => 'integer',
        'used_at' => 'datetime',
        'expired_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // ===== BELONGS TO =====

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function usedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'used_by');
    }

    public function generatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    // ===== HAS MANY =====

    public function orderActivationCodes(): HasMany
    {
        return $this->hasMany(OrderActivationCode::class, 'activation_code_id');
    }

    public function affiliates(): HasMany
    {
        return $this->hasMany(Affiliate::class, 'activation_code_id');
    }

    // ===== SCOPES =====

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeUsed($query)
    {
        return $query->where('status', 'used');
    }

    public function scopeExpired($query)
    {
        return $query->where('status', 'expired');
    }
}
