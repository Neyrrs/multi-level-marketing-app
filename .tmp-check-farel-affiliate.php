<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'farel@gmail.com')->first();
if (!$user) {
    echo json_encode(['user_exists' => false], JSON_PRETTY_PRINT) . PHP_EOL;
    exit;
}

$affiliate = App\Models\Affiliate::where('user_id', $user->id)->first();

echo json_encode([
    'user_exists' => true,
    'user' => [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'roles' => $user->getRoleNames()->values()->all(),
    ],
    'affiliate_exists' => (bool) $affiliate,
    'affiliate' => $affiliate ? [
        'id' => $affiliate->id,
        'username' => $affiliate->username,
        'slug' => $affiliate->slug,
        'is_active' => (bool) $affiliate->is_active,
        'sponsor_id' => $affiliate->sponsor_id,
        'upline_id' => $affiliate->upline_id,
        'activation_code_id' => $affiliate->activation_code_id,
    ] : null,
], JSON_PRETTY_PRINT) . PHP_EOL;
