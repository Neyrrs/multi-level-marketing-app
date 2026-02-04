<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BinaryPayout extends Model
{
    use HasFactory;

    protected $table = 'binary_payouts';

    protected $fillable = [
        'affiliate_id',
        'method_id',
        'rule_id',
        'approved_by',
        'commission_id',
        'amount_gross',
        'amount_tax',
        'amount_fee',
        'amount_total',
        'status',
        'batch_number',
        'paid_at',
        'notes',
    ];

    protected $casts = [
        'amount_gross' => 'decimal:2',
        'amount_tax' => 'decimal:2',
        'amount_fee' => 'decimal:2',
        'amount_total' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    public function method(): BelongsTo
    {
        return $this->belongsTo(CommissionMethod::class, 'method_id');
    }

    public function rule(): BelongsTo
    {
        return $this->belongsTo(CommissionRule::class, 'rule_id');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class, 'commission_id');
    }
}
