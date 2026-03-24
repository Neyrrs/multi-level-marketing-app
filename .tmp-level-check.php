<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$o = App\Models\Order::latest('id')->first();
if (!$o) {
    echo "no-order\n";
    exit;
}
$aff = App\Models\Affiliate::find($o->affiliate_id);
$parent = null;
if ($aff && $aff->upline_id) {
    $parent = App\Models\Affiliate::where('user_id', $aff->upline_id)->first();
}

echo json_encode([
    'order_id' => $o->id,
    'order_number' => $o->order_number,
    'order_affiliate_id' => $o->affiliate_id,
    'buyer_user_id' => $o->user_id,
    'payment_status' => $o->payment_status,
    'status' => $o->status,
    'affiliate_user_id' => $aff?->user_id,
    'affiliate_upline_user_id' => $aff?->upline_id,
    'parent_affiliate_id' => $parent?->id,
    'parent_affiliate_user_id' => $parent?->user_id,
], JSON_PRETTY_PRINT) . PHP_EOL;
