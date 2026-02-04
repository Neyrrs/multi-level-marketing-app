<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AffiliateBankAccount extends Model
{
    use HasFactory;

    protected $table = 'affiliate_bank_accounts';

    protected $fillable = [
        'affiliate_id',
        'bank_name',
        'bank_code',
        'account_number',
        'account_holder',
        'is_primary',
        'is_verified',
        'verified_at',
        'minimum_withdrawal',
        'maximum_withdrawal',
        'midtrans_token',
        'midtrans_data',
        'notes',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'minimum_withdrawal' => 'decimal:2',
        'maximum_withdrawal' => 'decimal:2',
        'midtrans_data' => 'array',
    ];

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    public function withdrawals()
    {
        return $this->hasMany(Withdrawal::class, 'bank_account_id');
    }
}
