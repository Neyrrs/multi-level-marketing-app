<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Affiliate;

class MlmTree extends Model
{
    use HasFactory;

    protected $table = 'mlm_trees';

    protected $fillable = [
        'affiliate_id',
        'parent_id',
        'position',
        'depth',
        'left_position',
        'right_position',
        'path',
        'lineage',
    ];

    protected $casts = [
        'depth' => 'integer',
    ];

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MlmTree::class, 'parent_id', 'affiliate_id');
    }
}
