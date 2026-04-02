<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$orders = App\Models\Order::query()
    ->with(['user:id,name,email', 'items.product:id,name,type', 'affiliate:id,user_id,username,slug'])
    ->where('payment_status','paid')
    ->where(function($q){
        $q->whereRaw('LOWER(product_type) = ?', ['bundle'])
          ->orWhereHas('items.product', fn($p)=>$p->whereRaw('LOWER(type) = ?', ['bundle']));
    })
    ->latest('id')
    ->take(12)
    ->get();

echo "=== LAST PAID BUNDLE ORDERS ===\n";
foreach($orders as $o){
    $u = $o->user;
    $aff = $o->affiliate;
    echo "order#{$o->id} {$o->order_number} | user#{$o->user_id} ".($u?->email ?? '-') ." | aff#".($o->affiliate_id ?? 'null')." ".($aff?->username ?? '-') ." | status={$o->payment_status}/{$o->status} | created={$o->created_at}\n";
}

echo "\n=== RECENT INACTIVE AFFILIATE REQUESTS ===\n";
$reqs = App\Models\Affiliate::query()
    ->with(['user:id,name,email','activationCode:id,code,owner_id,generated_from,status,notes'])
    ->where('is_active', false)
    ->whereNotNull('activation_code_id')
    ->latest('id')
    ->take(20)
    ->get();
foreach($reqs as $r){
    echo "aff#{$r->id} user#{$r->user_id} ".($r->user?->email ?? '-') ." sponsor_user#{$r->sponsor_id} activation_code_id={$r->activation_code_id} code=".($r->activationCode?->code ?? '-') ." owner#".($r->activationCode?->owner_id ?? '-') ." gen=".($r->activationCode?->generated_from ?? '-') ."\n";
}
