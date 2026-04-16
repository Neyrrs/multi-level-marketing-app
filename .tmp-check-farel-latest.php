<?php
require 'vendor/autoload.php';
$app=require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$affiliate = App\Models\Affiliate::where('slug','farel')->orWhere('username','farel')->first();
if (!$affiliate) {
  echo "AFFILIATE_NOT_FOUND\n";
  exit(0);
}

$order = App\Models\Order::where('affiliate_id',$affiliate->id)->latest('id')->first();
if (!$order) {
  echo "NO_ORDER_FOR_FAREL\n";
  exit(0);
}

echo "LATEST_ORDER\n";
var_export($order->only(['id','order_number','affiliate_id','payment_status','status','grand_total','created_at','paid_at']));
echo "\n\nCOMMISSION_FOR_ORDER\n";
var_export(App\Models\Commission::where('order_id',$order->id)->get(['id','order_id','affiliate_id','method_id','rule_id','amount','commission_type','status','created_at'])->toArray());
echo "\n\nLEDGER_FOR_ORDER\n";
var_export(App\Models\CommissionLedger::where('order_id',$order->id)->get(['id','order_id','affiliate_id','commission_id','amount','type','description','reference','created_at'])->toArray());
