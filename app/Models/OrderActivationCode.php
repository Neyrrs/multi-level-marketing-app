<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderActivationCode extends Model
{
    use HasFactory;

    protected $table = 'order_activation_codes';

    protected $fillable = [
        'order_id',
        'activation_code_id',
    ];

    public $timestamps = false;

    // ===== BELONGS TO =====

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function activationCode(): BelongsTo
    {
        return $this->belongsTo(ActivationCode::class);
    }
}
