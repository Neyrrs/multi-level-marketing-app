<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $roles = [
            'admin',
            'manager',
            'logistik',
            'affiliate',
            'finance',
            'guest',
        ];

        foreach ($roles as $role) {
            Role::findOrCreate($role, 'web');
        }
    }
}
