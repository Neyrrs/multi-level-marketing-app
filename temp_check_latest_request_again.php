<?php
require __DIR__.'/vendor/autoload.php';
$app=require __DIR__.'/bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);$kernel->bootstrap();

$latestUser = App\Models\User::query()->latest('id')->first(['id','name','email','created_at']);
echo "LATEST_USER\n";
echo json_encode($latestUser?->toArray(), JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES)."\n\n";

echo "LAST_12_ORDERS\n";
$orders = App\Models\Order::query()
    ->with(['user:id,name,email','affiliate:id,user_id,username'])
    ->latest('id')->take(12)->get(['id','order_number','user_id','affiliate_id','product_type','payment_status','status','midtrans_order_id','created_at']);
foreach($orders as $o){
    echo "#{$o->id} {$o->order_number} | user#{$o->user_id} ".($o->user?->email ?? '-') ." | aff=".($o->affiliate?->username ?? '-') ." | type={$o->product_type} | pay={$o->payment_status} | status={$o->status} | {$o->created_at}\n";
}

echo "\nPENDING_AFFILIATE_REQUESTS(last 20)\n";
$reqs = App\Models\Affiliate::query()
    ->with(['user:id,name,email','activationCode:id,code,owner_id,generated_from,status,notes'])
    ->where('is_active', false)
    ->whereNotNull('activation_code_id')
    ->latest('id')->take(20)->get(['id','user_id','sponsor_id','upline_id','activation_code_id','is_active','created_at']);
foreach($reqs as $r){
    echo "aff#{$r->id} user#{$r->user_id} ".($r->user?->email ?? '-') ." sponsor_user#{$r->sponsor_id} code=".($r->activationCode?->code ?? '-') ." owner#".($r->activationCode?->owner_id ?? '-') ." gen=".($r->activationCode?->generated_from ?? '-') ." code_status=".($r->activationCode?->status ?? '-') ." | {$r->created_at}\n";
}

$latestPaidBundle = App\Models\Order::query()
    ->where('payment_status','paid')
    ->where(function($q){
        $q->whereRaw('LOWER(product_type)=?', ['bundle'])
          ->orWhereHas('items.product', fn($p)=>$p->whereRaw('LOWER(type)=?', ['bundle']));
    })
    ->latest('id')->first();

echo "\nLATEST_PAID_BUNDLE_ORDER\n";
if($latestPaidBundle){
    echo "order#{$latestPaidBundle->id} {$latestPaidBundle->order_number} user#{$latestPaidBundle->user_id} aff#{$latestPaidBundle->affiliate_id} created={$latestPaidBundle->created_at}\n";
    $pendingForUser = App\Models\Affiliate::query()->where('user_id',$latestPaidBundle->user_id)->where('is_active',false)->latest('id')->first();
    if($pendingForUser){
        echo "pending_request_found: aff#{$pendingForUser->id} activation_code_id={$pendingForUser->activation_code_id} sponsor_user#{$pendingForUser->sponsor_id}\n";
    } else {
        echo "pending_request_found: none\n";
    }
} else {
    echo "none\n";
}
