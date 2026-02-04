<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MatchingHistory extends Model
{
    use HasFactory;

    protected $table = 'matching_histories';

    protected $fillable = [
        'affiliate_id',
        'left_volume',
        'right_volume',
        'matched_pair',
        'notes',
    ];

    protected $casts = [
        'left_volume' => 'decimal:2',
        'right_volume' => 'decimal:2',
        'matched_pair' => 'integer',
    ];

    public function affiliate(): BelongsTo
    {
        return $this->belongsTo(Affiliate::class);
    }
}
