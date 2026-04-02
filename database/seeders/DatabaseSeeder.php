<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Test admin',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
        $user->assignRole('admin');

        $this->call(RoleSeeder::class);
        $this->call(CommissionMethodSeeder::class);
    }
}
