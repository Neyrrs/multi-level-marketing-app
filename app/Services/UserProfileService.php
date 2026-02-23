<?php

namespace App\Services;

use App\Models\UserProfile;

class UserProfileService
{
    public function createProfile(int $userId, string $role): UserProfile
    {
        return UserProfile::create([
            'user_id' => $userId,
            'personal_info' => ['role' => $role],
        ]);
    }

    public function updateProfile(int $userId, array $data): ?UserProfile
    {
        $profile = UserProfile::where('user_id', $userId)->first();
        if (!$profile) return null;
        $profile->update($data);
        return $profile;
    }

    public function getProfile(int $userId): ?UserProfile
    {
        return UserProfile::where('user_id', $userId)->first();
    }
}
