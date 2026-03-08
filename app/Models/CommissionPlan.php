<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommissionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_active',
        'is_default',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_default' => 'boolean',
    ];

    public function rules(): BelongsToMany
    {
        return $this->belongsToMany(CommissionRule::class, 'commission_plan_rule', 'plan_id', 'rule_id')
            ->withTimestamps()
            ->orderBy('method_id')
            ->orderBy('priority');
    }

    public function affiliates(): HasMany
    {
        return $this->hasMany(Affiliate::class, 'commission_plan_id');
    }
}
