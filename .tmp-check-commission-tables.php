<?php
require 'vendor/autoload.php';
$app=require 'bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "COMMISSIONS_COUNT=".App\Models\Commission::count()."\n";
var_export(App\Models\Commission::orderByDesc('id')->take(20)->get(['id','order_id','affiliate_id','method_id','rule_id','amount','commission_type','status','created_at'])->toArray());
echo "\n\nLEDGER_COUNT=".App\Models\CommissionLedger::count()."\n";
var_export(App\Models\CommissionLedger::orderByDesc('id')->take(20)->get(['id','order_id','affiliate_id','commission_id','amount','type','description','reference','created_at'])->toArray());
