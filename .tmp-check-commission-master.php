<?php
require 'vendor/autoload.php';
$app=require 'bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "METHODS\n";
var_export(App\Models\CommissionMethod::orderBy('id')->get(['id','name','calculation_type','is_active'])->toArray());
echo "\n\nRULES\n";
var_export(App\Models\CommissionRule::orderBy('id')->get(['id','method_id','rule_name','priority','value','is_active','condition'])->toArray());
echo "\n\nPLANS\n";
var_export(App\Models\CommissionPlan::orderBy('id')->get(['id','name','is_default','is_active'])->toArray());
echo "\n\nPLAN_RULE_PIVOT\n";
var_export(Illuminate\Support\Facades\DB::table('commission_plan_rule')->orderBy('plan_id')->orderBy('rule_id')->get()->toArray());
