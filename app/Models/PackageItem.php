<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageItem extends Model
{
    use HasFactory;

    protected $table = 'package_items';

    protected $fillable = [
        'package_id',
        'product_id',
        'quantity',
        'harga_awal',
        'diskon',
        'harga_akhir',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'harga_awal' => 'decimal:2',
        'diskon' => 'decimal:2',
        'harga_akhir' => 'decimal:2',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
