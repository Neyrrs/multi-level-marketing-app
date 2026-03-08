<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Spatie\Permission\Models\Role;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'name' => $input['name'] ?? explode('@', $input['email'])[0],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        // Assign a default role if roles exist (avoid failing when seeder not run)
        try {
            if (Role::where('name', 'guest')->exists()) {
                $user->assignRole('guest');
            }
        } catch (\Throwable $e) {
            // If Spatie tables are not present or any error occurs, skip role assignment
        }

        return $user;
    }
}
