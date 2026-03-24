<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$rey = App\Models\Affiliate::where('username','rey')->first();
$order = App\Models\Order::latest('id')->with('items.product')->first();

$data = [
  'rey' => $rey ? [
    'id' => $rey->id,
    'left_volume' => $rey->left_volume,
    'right_volume' => $rey->right_volume,
    'total_volume' => $rey->total_volume,
    'left_count' => $rey->left_count,
    'right_count' => $rey->right_count,
  ] : null,
  'latest_order' => $order ? [
    'id' => $order->id,
    'order_number' => $order->order_number,
    'affiliate_id' => $order->affiliate_id,
    'user_id' => $order->user_id,
    'payment_status' => $order->payment_status,
    'status' => $order->status,
    'items' => $order->items->map(fn($i)=>[
      'product_id'=>$i->product_id,
      'qty'=>$i->quantity,
      'product_name'=>$i->product?->name,
      'point_value'=>$i->product?->point_value,
    ])->toArray(),
  ] : null,
];

echo json_encode($data, JSON_PRETTY_PRINT) . PHP_EOL;
