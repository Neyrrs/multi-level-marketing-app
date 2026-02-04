<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawalPolicy extends Model
{
    use HasFactory;

    protected $table = 'withdrawal_policies';

    protected $fillable = [
        'name',
        'description',
        'min_amount',
        'max_amount',
        'fee_type',
        'fee_amount',
        'processing_days',
        'is_active',
    ];

    protected $casts = [
        'min_amount' => 'decimal:2',
        'max_amount' => 'decimal:2',
        'fee_amount' => 'decimal:2',
        'processing_days' => 'integer',
        'is_active' => 'boolean',
    ];

    public function affiliates()
    {
        return $this->belongsToMany(
            Affiliate::class,
            'affiliate_withdrawal_policies',
            'policy_id',
            'affiliate_id'
        );
    }
}
