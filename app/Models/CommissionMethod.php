<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CommissionMethod extends Model
{
    use HasFactory;

    protected $table = 'commission_methods';

    protected $fillable = [
        'name',
        'description',
        'calculation_type',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ===== HAS MANY =====

    public function rules(): HasMany
    {
        return $this->hasMany(CommissionRule::class, 'method_id')->orderBy('priority');
    }

    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class, 'method_id');
    }

    public function commissionCalculations(): HasMany
    {
        return $this->hasMany(CommissionCalculation::class, 'method_id');
    }

    public function binaryPayouts(): HasMany
    {
        return $this->hasMany(BinaryPayout::class, 'method_id');
    }
}
