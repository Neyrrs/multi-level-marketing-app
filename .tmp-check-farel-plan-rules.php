<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$affiliate = App\Models\Affiliate::where('slug', 'farel')->orWhere('username', 'farel')->first();
$plan = $affiliate?->commissionPlan;

$rule = App\Models\CommissionRule::query()->first();
echo "RULE_SAMPLE_COLUMNS\n";
var_export($rule ? array_keys($rule->getAttributes()) : null);
echo "\n\n";

if ($plan) {
  $rules = $plan->rules()->with('method:id,name,calculation_type')->get();
  echo "PLAN_RULES\n";
  $out = $rules->map(fn($r) => [
    'id' => $r->id,
    'method_id' => $r->method_id,
    'method' => $r->method?->name,
    'value' => $r->value,
    'priority' => $r->priority,
    'condition' => $r->condition,
    'is_active' => $r->is_active,
  ])->toArray();
  var_export($out);
  echo "\n\n";
}

$order = App\Models\Order::where('affiliate_id', $affiliate?->id)->latest('id')->first();
if ($order) {
  echo "ORDER_COMMISSION_CALC\n";
  $calcs = App\Models\CommissionCalculation::where('order_id',$order->id)->get()->toArray();
  var_export($calcs);
  echo "\n\n";

  echo "ORDER_LEDGER\n";
  $ledgers = App\Models\CommissionLedger::where('order_id',$order->id)->get(['id','order_id','affiliate_id','commission_id','amount','type','description','reference','created_at'])->toArray();
  var_export($ledgers);
  echo "\n";
}
