<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$u = App\Models\User::query()->latest('id')->first(['id','name','email','created_at']);
echo "LATEST_USER: ".json_encode($u?->toArray(), JSON_UNESCAPED_SLASHES)."\n\n";

$orders = App\Models\Order::query()
  ->with(['user:id,name,email','affiliate:id,user_id,username,slug'])
  ->latest('id')
  ->take(8)
  ->get(['id','order_number','user_id','affiliate_id','product_type','payment_status','status','midtrans_order_id','created_at']);

echo "LATEST_ORDERS:\n";
foreach($orders as $o){
  echo "#{$o->id} {$o->order_number} | user={$o->user_id} ".($o->user?->email??'-')." | aff=".($o->affiliate?->username??'-')." | type={$o->product_type} | pay={$o->payment_status} | status={$o->status} | mid={$o->midtrans_order_id} | {$o->created_at}\n";
}

$reqs = App\Models\Affiliate::query()
  ->with(['user:id,name,email','activationCode:id,code,owner_id,generated_from,status,notes'])
  ->where('is_active', false)
  ->whereNotNull('activation_code_id')
  ->latest('id')
  ->take(10)
  ->get(['id','user_id','sponsor_id','activation_code_id','is_active','created_at']);

echo "\nLATEST_PENDING_REQUESTS:\n";
foreach($reqs as $r){
  echo "aff#{$r->id} user#{$r->user_id} ".($r->user?->email??'-')." sponsor_user#{$r->sponsor_id} code=".($r->activationCode?->code??'-')." owner#".($r->activationCode?->owner_id??'-')." gen=".($r->activationCode?->generated_from??'-')." status=".($r->activationCode?->status??'-')." | {$r->created_at}\n";
}
