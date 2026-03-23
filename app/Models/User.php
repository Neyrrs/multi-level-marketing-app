<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'phone',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected $appends = [
        'avatar',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
            'status' => 'string',
            'phone' => 'string',
        ];
    }

    /**
     * Get the user's avatar URL.
     */
    public function getAvatarAttribute(): string
    {
        $photo = $this->profile?->photo_profile;

        if ($photo) {
            return str_starts_with($photo, 'http') ? $photo : route('media.public', ['path' => ltrim(preg_replace('#^storage/#', '', $photo), '/')]);
        }

        $name = trim(collect(explode(' ', $this->name ?? 'User'))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(''));

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=7F9CF5&background=EBF4FF';
    }

    // ===== ONE-TO-ONE RELATIONSHIPS =====
    
    /**
     * User punya satu profile
     */
    public function profile(): HasOne
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * User punya satu affiliate
     */
    public function affiliate(): HasOne
    {
        return $this->hasOne(Affiliate::class);
    }

    // ===== ONE-TO-MANY RELATIONSHIPS =====

    /**
     * Activation codes yang dibeli/dimiliki user
     */
    public function activationCodes(): HasMany
    {
        return $this->hasMany(ActivationCode::class, 'owner_id');
    }

    /**
     * Activation codes yang digunakan user
     */
    public function usedActivationCodes(): HasMany
    {
        return $this->hasMany(ActivationCode::class, 'used_by');
    }

    /**
     * Activation codes yang dibuat/generated user
     */
    public function generatedActivationCodes(): HasMany
    {
        return $this->hasMany(ActivationCode::class, 'generated_by');
    }

    /**
     * Orders/pesanan dari user sebagai customer
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Shopping carts user
     */
    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Notification logs untuk user
     */
    public function notificationLogs(): HasMany
    {
        return $this->hasMany(NotificationLog::class);
    }

    // ===== HELPER METHODS =====

    /**
     * Get user profile atau create jika belum ada
     */
    public function getOrCreateProfile(): UserProfile
    {
        return $this->profile ?? $this->profile()->create();
    }

    /**
     * Get user affiliate
     */
    public function getAffiliate(): ?Affiliate
    {
        return $this->affiliate;
    }
}
