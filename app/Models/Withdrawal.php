<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Withdrawal extends Model
{
    use HasFactory;

    protected $table = 'withdrawals';

    protected $fillable = [
        'withdrawal_number',
        'affiliate_id',
        'bank_account_id',
        'destination_account',
        'destination_bank',
        'destination_name',
        'amount',
        'fee',
        'net_amount',
        'status',
        'approved_by',
        'approved_at',
        'processed_at',
        'midtrans_reference',
        'midtrans_response',
        'rejection_reason',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'fee' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'approved_at' => 'datetime',
        'processed_at' => 'datetime',
        'midtrans_response' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // ===== BELONGS TO =====

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(AffiliateBankAccount::class, 'bank_account_id');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Alias used by finance pages/controllers.
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // ===== HAS MANY =====

    public function histories(): HasMany
    {
        return $this->hasMany(WithdrawalHistory::class, 'withdrawal_id');
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
}
