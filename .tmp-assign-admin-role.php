<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'admin@example.com')->first();
if (!$user) {
    echo json_encode(['ok' => false, 'message' => 'USER_NOT_FOUND'], JSON_PRETTY_PRINT) . PHP_EOL;
    exit(1);
}

Spatie\Permission\Models\Role::findOrCreate('admin', 'web');
$user->syncRoles(['admin']);

$user->refresh();
echo json_encode([
    'ok' => true,
    'id' => $user->id,
    'email' => $user->email,
    'roles' => $user->getRoleNames()->values()->all(),
], JSON_PRETTY_PRINT) . PHP_EOL;
