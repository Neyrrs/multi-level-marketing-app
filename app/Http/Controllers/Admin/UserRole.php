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
            'role'     => 'required',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

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
        $user  = User::with('roles')->findOrFail($id);
       $roles = Role::select('id', 'name')->get();

    return Inertia::render('admin/UsersRole/edit', [
        'user'  => $user,
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
        'role' => 'required|exists:roles,name',
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->filled('password')
            ? Hash::make($request->password)
            : $user->password,
    ]);

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
}
