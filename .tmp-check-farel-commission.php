<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$affiliate = App\Models\Affiliate::where('slug', 'farel')->orWhere('username', 'farel')->first();

echo "AFFILIATE\n";
var_export($affiliate ? $affiliate->only(['id','user_id','username','slug','commission_plan_id','is_active','level','sponsor_id','upline_id']) : null);
echo "\n\n";

if ($affiliate) {
    $orders = App\Models\Order::where('affiliate_id', $affiliate->id)
        ->latest('id')
        ->take(10)
        ->get(['id','order_number','affiliate_id','user_id','grand_total','payment_status','status','paid_at','created_at'])
        ->toArray();

    echo "ORDERS\n";
    var_export($orders);
    echo "\n\n";

    $orderIds = array_column($orders, 'id');

    $commissions = empty($orderIds)
        ? []
        : App\Models\Commission::whereIn('order_id', $orderIds)
            ->orderByDesc('id')
            ->get(['id','order_id','affiliate_id','method_id','rule_id','amount','commission_type','status','created_at'])
            ->toArray();

    echo "COMMISSIONS_BY_ORDER\n";
    var_export($commissions);
    echo "\n\n";

    $plan = $affiliate->commissionPlan;
    echo "PLAN\n";
    var_export($plan ? $plan->only(['id','name','is_default','is_active']) : null);
    echo "\n\n";

    $planRules = $plan
        ? $plan->rules()->with('method:id,name,calculation_type')->get(['commission_rules.id','commission_rules.method_id','commission_rules.name','commission_rules.value','commission_rules.priority','commission_rules.is_active'])->map(function($r){
            return [
                'id' => $r->id,
                'method_id' => $r->method_id,
                'method' => $r->method?->name,
                'name' => $r->name,
                'value' => $r->value,
                'priority' => $r->priority,
                'is_active' => $r->is_active,
            ];
        })->values()->toArray()
        : [];

    echo "PLAN_RULES\n";
    var_export($planRules);
    echo "\n\n";
}

$latestSales = App\Models\CommissionLedger::where('type','sale')->latest('id')->take(10)->get(['id','order_id','affiliate_id','amount','type','description','reference','created_at'])->toArray();
echo "LATEST_LEDGER_SALE\n";
var_export($latestSales);
echo "\n";
