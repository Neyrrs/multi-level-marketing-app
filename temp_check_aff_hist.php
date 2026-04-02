<?php
require __DIR__.'/vendor/autoload.php';
$app=require __DIR__.'/bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);$kernel->bootstrap();

echo "LATEST AFFILIATES:\n";
$affs=App\Models\Affiliate::with('user:id,email','activationCode:id,code,owner_id,status,used_by,notes')->latest('id')->take(15)->get();
foreach($affs as $a){
 echo "aff#{$a->id} user#{$a->user_id} ".($a->user?->email??'-')." active=".($a->is_active?'1':'0')." sponsor={$a->sponsor_id} upline={$a->upline_id} code_id={$a->activation_code_id} code=".($a->activationCode?->code??'-')."\n";
}

echo "\nLATEST CODES owner 3:\n";
$codes=App\Models\ActivationCode::where('owner_id',3)->latest('id')->take(10)->get(['id','code','status','used_by','remaining_usage','generated_from','notes','created_at']);
foreach($codes as $c){
 echo "code#{$c->id} {$c->code} status={$c->status} used_by=".($c->used_by??'null')." rem=".($c->remaining_usage??'null')." gen={$c->generated_from} notes={$c->notes}\n";
}
