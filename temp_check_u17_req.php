<?php
require __DIR__.'/vendor/autoload.php';
$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$u = App\Models\User::find(17);
if(!$u){echo "user not found\n"; exit;}
$reqs = App\Models\Affiliate::query()
  ->with(['activationCode:id,code,owner_id,generated_from,status','user:id,name,email'])
  ->where('user_id',$u->id)
  ->latest('id')->get();

echo "affiliate rows for user#17:\n";
foreach($reqs as $r){
  echo "aff#{$r->id} active=".($r->is_active?'1':'0')." sponsor_user#{$r->sponsor_id} upline_user#{$r->upline_id} code_id={$r->activation_code_id} code=".($r->activationCode?->code??'-')." gen=".($r->activationCode?->generated_from??'-')."\n";
}
