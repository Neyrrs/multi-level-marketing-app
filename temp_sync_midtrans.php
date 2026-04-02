<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$ids = [53,54,55];
$svc = app(App\Services\OrderService::class);
foreach ($ids as $id) {
    $order = App\Models\Order::find($id);
    if (!$order) { echo "order {$id} not found\n"; continue; }
    $svc->syncMidtransStatus($order);
    $order->refresh();
    echo "{$order->id} {$order->order_number} => {$order->payment_status} / {$order->status}\n";
}
