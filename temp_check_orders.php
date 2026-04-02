<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$orders = App\Models\Order::query()->whereIn('id', [53,54,55])->orderBy('id')->get();
foreach ($orders as $o) {
    echo 'ORDER ' . $o->id . PHP_EOL;
    echo json_encode([
        'order_number' => $o->order_number,
        'midtrans_order_id' => $o->midtrans_order_id,
        'payment_method' => $o->payment_method,
        'payment_status' => $o->payment_status,
        'status' => $o->status,
        'grand_total' => $o->grand_total,
        'paid_at' => $o->paid_at,
        'created_at' => (string) $o->created_at,
        'updated_at' => (string) $o->updated_at,
        'midtrans_data' => $o->midtrans_data,
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . PHP_EOL . PHP_EOL;
}
?>
