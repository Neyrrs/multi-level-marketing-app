<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'shipment_number',
        'order_id',
        'user_id',
        'affiliate_id',
        'courier',
        'tracking_number',
        'shipping_address',
        'recipient_name',
        'recipient_phone',
        'shipped_date',
        'estimated_delivery',
        'actual_delivery_date',
        'status',
        'notes',
        'signature_received',
        'receiver_name',
        'received_at',
    ];

    protected $casts = [
        'shipping_address' => 'array',
        'shipped_date' => 'datetime',
        'estimated_delivery' => 'datetime',
        'actual_delivery_date' => 'datetime',
        'received_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the order associated with this shipment
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the user (customer) associated with this shipment
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the affiliate associated with this shipment
     */
    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    /**
     * Get tracking history for this shipment
     */
    public function trackingHistories(): HasMany
    {
        return $this->hasMany(ShipmentTracking::class);
    }

    /**
     * Scopes
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeShipped($query)
    {
        return $query->where('status', 'shipped');
    }

    public function scopeDelivered($query)
    {
        return $query->where('status', 'delivered');
    }

    public function scopeReturned($query)
    {
        return $query->where('status', 'returned');
    }

    /**
     * Helper methods
     */
    public function markAsShipped($trackingNumber, $courier = null)
    {
        $this->update([
            'status' => 'shipped',
            'tracking_number' => $trackingNumber,
            'shipped_date' => now(),
            'courier' => $courier ?? $this->courier,
        ]);

        // Update order status
        if ($this->order) {
            $this->order->update(['status' => 'shipped']);
        }

        return $this;
    }

    public function markAsDelivered($receiverName = null, $signatureReceived = true)
    {
        $this->update([
            'status' => 'delivered',
            'receiver_name' => $receiverName,
            'actual_delivery_date' => now(),
            'signature_received' => $signatureReceived,
            'received_at' => now(),
        ]);

        // Update order status
        if ($this->order) {
            $this->order->update(['status' => 'completed']);
        }

        return $this;
    }

    public function markAsReturned($reason = null)
    {
        $this->update([
            'status' => 'returned',
            'notes' => $reason ?? $this->notes,
        ]);

        return $this;
    }
}
