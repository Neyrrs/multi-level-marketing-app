<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'affiliate_id',
        'payment_method',
        'midtrans_order_id',
        'midtrans_data',
        'shipping_data',
        'product_type',
        'product_id',
        'product_name',
        'quantity',
        'price',
        'total_amount',
        'shipping_cost',
        'tax_amount',
        'grand_total',
        'payment_status',
        'paid_at',
        'payment_reference',
        'status',
        'activation_codes_count',
        'generates_activation_code',
        'notes',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'grand_total' => 'decimal:2',
        'midtrans_data' => 'array',
        'shipping_data' => 'array',
        'quantity' => 'integer',
        'activation_codes_count' => 'integer',
        'generates_activation_code' => 'boolean',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // ===== BELONGS TO =====

    /**
     * Customer (pembeli)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Affiliate yang menjual
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Product (jika single product order)
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    // ===== HAS MANY =====

    /**
     * Items dalam order
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Commissions dari order ini
     */
    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class);
    }

    /**
     * Commission calculations
     */
    public function commissionCalculations(): HasMany
    {
        return $this->hasMany(CommissionCalculation::class);
    }

    /**
     * Commission ledger records
     */
    public function commissionLedgers(): HasMany
    {
        return $this->hasMany(CommissionLedger::class);
    }

    /**
     * Activation codes dalam order
     */
    public function activationCodes()
    {
        return $this->belongsToMany(
            ActivationCode::class,
            'order_activation_codes',
            'order_id',
            'activation_code_id'
        );
    }

    /**
     * Shipment(s) for this order
     */
    public function shipments(): HasMany
    {
        return $this->hasMany(Shipment::class);
    }

    /**
     * Get the primary shipment for this order
     */
    public function shipment(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Shipment::class)->latest();
    }

    // ===== SCOPES =====

    public function scopePending($query)
    {
        return $query->where('order_status', 'pending');
    }

    public function scopePaid($query)
    {
        return $query->where('payment_status', 'completed');
    }

    public function scopeCompleted($query)
    {
        return $query->where('order_status', 'completed');
    }

    // ===== HELPER METHODS =====

    public function getTotalCommission()
    {
        return $this->commissions()->sum('amount_net');
    }
}
