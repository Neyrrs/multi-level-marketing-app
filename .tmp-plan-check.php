<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$default = App\Models\CommissionPlan::where('is_default', true)->first(['id','name','is_active']);
$result = [
    'default_plan' => $default ? $default->toArray() : null,
    'total_affiliates' => App\Models\Affiliate::count(),
    'matched_default' => App\Models\Affiliate::where('commission_plan_id', $default?->id)->count(),
    'without_plan' => App\Models\Affiliate::whereNull('commission_plan_id')->count(),
    'not_default' => $default ? App\Models\Affiliate::where('commission_plan_id', '!=', $default->id)->whereNotNull('commission_plan_id')->count() : null,
];

echo json_encode($result, JSON_PRETTY_PRINT), PHP_EOL;
