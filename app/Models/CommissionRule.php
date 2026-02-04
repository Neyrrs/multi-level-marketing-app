<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommissionRule extends Model
{
    use HasFactory;

    protected $table = 'commission_rules';

    protected $fillable = [
        'method_id',
        'rule_name',
        'condition',
        'value',
        'priority',
        'is_active',
    ];

    protected $casts = [
        'condition' => 'array',
        'value' => 'decimal:2',
        'priority' => 'integer',
        'is_active' => 'boolean',
    ];

    // ===== BELONGS TO =====

    public function method(): BelongsTo
    {
        return $this->belongsTo(CommissionMethod::class, 'method_id');
    }

    // ===== HAS MANY =====

    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class, 'rule_id');
    }

    public function binaryPayouts(): HasMany
    {
        return $this->hasMany(BinaryPayout::class, 'rule_id');
    }
}
