<?php
require __DIR__.'/vendor/autoload.php';
$app=require __DIR__.'/bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);$kernel->bootstrap();

$order=App\Models\Order::query()->latest('id')->first();
if(!$order){echo "no order\n"; exit;}
echo "before: id={$order->id} num={$order->order_number} pay={$order->payment_status} status={$order->status} mid={$order->midtrans_order_id}\n";

try{
  app(App\Services\OrderService::class)->syncMidtransStatus($order);
}catch(Throwable $e){
  echo "sync error: {$e->getMessage()}\n";
}

$order->refresh();
echo "after:  id={$order->id} num={$order->order_number} pay={$order->payment_status} status={$order->status} mid={$order->midtrans_order_id}\n";
