<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionCalculation extends Model
{
    use HasFactory;

    protected $table = 'commission_calculations';

    protected $fillable = [
        'order_id',
        'affiliate_id',
        'method_id',
        'commission_id',
        'amount_gross',
        'amount_tax',
        'amount_fee',
        'amount_net',
        'notes',
    ];

    protected $casts = [
        'amount_gross' => 'decimal:2',
        'amount_tax' => 'decimal:2',
        'amount_fee' => 'decimal:2',
        'amount_net' => 'decimal:2',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    public function method(): BelongsTo
    {
        return $this->belongsTo(CommissionMethod::class, 'method_id');
    }

    public function commission(): BelongsTo
    {
        return $this->belongsTo(Commission::class, 'commission_id');
    }
}

