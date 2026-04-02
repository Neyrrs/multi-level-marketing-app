<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$svc = app(App\Services\OrderService::class);
$orders = App\Models\Order::query()->whereIn('id', [53,54,55])->orderBy('id')->get();
foreach ($orders as $o) {
    $before = [$o->payment_status, $o->status];
    $synced = $svc->syncMidtransStatus($o);
    $after = [$synced?->payment_status, $synced?->status];
    echo "ORDER {$o->id} | before=" . implode('/', $before) . " | after=" . implode('/', $after) . PHP_EOL;
}
?>
