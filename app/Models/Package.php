<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount',
        'final_price',
        'is_active',
        'is_affiliate_package',
        'activation_codes_count',
        'image',
        'notes',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'decimal:5,2',
        'final_price' => 'decimal:2',
        'activation_codes_count' => 'integer',
        'is_active' => 'boolean',
        'is_affiliate_package' => 'boolean',
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

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }
}
