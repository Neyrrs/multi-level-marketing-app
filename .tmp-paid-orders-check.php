<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$orders = App\Models\Order::with('affiliate.user','items.product')
    ->where('payment_status','paid')
    ->latest('id')
    ->take(8)
    ->get();

$out = $orders->map(function($o){
    return [
        'id'=>$o->id,
        'order_number'=>$o->order_number,
        'affiliate_id'=>$o->affiliate_id,
        'affiliate_username'=>$o->affiliate?->username,
        'buyer_user_id'=>$o->user_id,
        'paid_at'=>(string)$o->paid_at,
        'items'=>$o->items->map(fn($i)=>[
            'product'=>$i->product?->name,
            'point_value'=>$i->product?->point_value,
            'qty'=>$i->quantity,
        ])->toArray(),
    ];
});

echo json_encode($out, JSON_PRETTY_PRINT) . PHP_EOL;
