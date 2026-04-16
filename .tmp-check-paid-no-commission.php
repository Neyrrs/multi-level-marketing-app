<?php
require 'vendor/autoload.php';
$app=require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$rows = App\Models\Order::query()
  ->where('payment_status','paid')
  ->whereNotNull('affiliate_id')
  ->whereDoesntHave('commissions')
  ->latest('id')
  ->take(10)
  ->get(['id','order_number','affiliate_id','grand_total','paid_at'])
  ->toArray();

var_export($rows);
