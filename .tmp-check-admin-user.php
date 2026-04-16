<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$u = App\Models\User::where('email', 'admin@example.com')->first();

if (!$u) {
    echo json_encode(['exists' => false], JSON_PRETTY_PRINT) . PHP_EOL;
    exit;
}

echo json_encode([
    'exists' => true,
    'id' => $u->id,
    'name' => $u->name,
    'email' => $u->email,
    'roles' => $u->getRoleNames()->values()->all(),
], JSON_PRETTY_PRINT) . PHP_EOL;
