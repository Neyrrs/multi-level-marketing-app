<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserRole extends Controller
{
    public function index()
    {
        $users = User::with('roles')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('admin/UsersRole/index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::select('id', 'name')->get();

    return Inertia::render('admin/UsersRole/create', [
        'roles' => $roles   
    ]);
    }   

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
            'phone'    => 'nullable|string|max:30',
            'address'  => 'nullable|string|max:500',
            'role'     => 'required',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'phone'    => $request->phone,
        ]);

        $addressText = trim((string) $request->address);
        if ($addressText !== '') {
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                ['address' => ['full_address' => $addressText]]
            );
        }

        $user->assignRole($request->role);

        return redirect()->route('admin.UsersRole.index')
            ->with('success', 'User berhasil ditambahkan');
    }

    public function show($id)
    {
        $user = User::with('roles')->findOrFail($id);

        return Inertia::render('admin/UsersRole/show', [
            'user' => $user
        ]);
    }

    public function edit($id)
    {
        $user  = User::with(['roles', 'profile'])->findOrFail($id);
       $roles = Role::select('id', 'name')->get();

    return Inertia::render('admin/UsersRole/edit', [
        'user'  => [
            ...$user->toArray(),
            'phone' => $user->phone,
            'address' => $this->resolveAddressText($user),
        ],
        'roles' => $roles
    ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

    $request->validate([
        'name'  => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'password' => 'nullable|min:6',
        'phone' => 'nullable|string|max:30',
        'address' => 'nullable|string|max:500',
        'role' => 'required|exists:roles,name',
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'password' => $request->filled('password')
            ? Hash::make($request->password)
            : $user->password,
    ]);

    $addressText = trim((string) $request->address);
    if ($addressText !== '') {
        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            ['address' => ['full_address' => $addressText]]
        );
    }

    $user->syncRoles([$request->role]);

    return redirect()->route('admin.UsersRole.index')
        ->with('success', 'User berhasil diupdate');
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();

        return redirect()->route('admin.UsersRole.index')
            ->with('success', 'User berhasil dihapus');
    }

    private function resolveAddressText(User $user): ?string
    {
        $address = $user->profile?->address;
        if (is_string($address) && $address !== '') {
            return $address;
        }

        if (!is_array($address)) {
            return null;
        }

        if (!empty($address['full_address'])) {
            return (string) $address['full_address'];
        }

        $parts = array_filter([
            $address['street'] ?? null,
            $address['subdistrict'] ?? null,
            $address['district'] ?? null,
            $address['city'] ?? null,
            $address['province'] ?? null,
            $address['postal_code'] ?? null,
        ]);

        return !empty($parts) ? implode(', ', $parts) : null;
    }
}
