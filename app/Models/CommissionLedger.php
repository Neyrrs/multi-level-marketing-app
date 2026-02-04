<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionLedger extends Model
{
    use HasFactory;

    protected $table = 'commission_ledgers';

    protected $fillable = [
        'affiliate_id',
        'commission_id',
        'order_id',
        'type',
        'amount',
        'description',
        'balance_before',
        'balance_after',
        'reference',
        'reference_type',
        'status',
        'metadata',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'balance_before' => 'decimal:2',
        'balance_after' => 'decimal:2',
        'metadata' => 'array',
    ];

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class, 'commission_id');
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
