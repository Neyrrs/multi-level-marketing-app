<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'image',
        'stock',
        'weight',
        'harga_modal',
        'harga_awal',
        'diskon',
        'harga_akhir',
        'point_value',
        'is_active',
        'is_affiliate_product',
        'generates_activation_code',
    ];

    protected $casts = [
        'harga_modal' => 'decimal:2',
        'harga_awal' => 'decimal:2',
        'diskon' => 'decimal:2',
        'harga_akhir' => 'decimal:2',
        'point_value' => 'decimal:2',
        'weight' => 'decimal:2',
        'stock' => 'integer',
        'is_active' => 'boolean',
        'is_affiliate_product' => 'boolean',
        'generates_activation_code' => 'boolean',
        'image' => 'array',
    ];

    public function packageItems(): HasMany
    {
        return $this->hasMany(PackageItem::class);
    }

    public function activationCodes(): HasMany
    {
        return $this->hasMany(ActivationCode::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
