<?php
require 'vendor/autoload.php';
$app=require 'bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$order = App\Models\Order::find(2);
echo "ORDER\n";
var_export($order?->only(['id','order_number','affiliate_id','payment_status','status','product_id','product_type','generates_activation_code','activation_codes_count','created_at','paid_at']));
echo "\n\nORDER_ITEMS\n";
var_export($order?->items()->get(['id','order_id','product_id','quantity','gives_activation_code','harga_akhir'])->toArray());
echo "\n\nORDER_ACTIVATION_CODES\n";
var_export(Illuminate\Support\Facades\DB::table('order_activation_codes')->where('order_id',2)->get()->toArray());
echo "\n\nACTIVATION_CODES_BY_ORDER_NOTE\n";
var_export(App\Models\ActivationCode::where('notes','like','%'.$order?->order_number.'%')->get(['id','code','owner_id','status','product_id','package_id','created_at'])->toArray());
echo "\n\nLEDGER_ORDER2\n";
var_export(App\Models\CommissionLedger::where('order_id',2)->get(['id','order_id','affiliate_id','amount','type','description','created_at'])->toArray());
