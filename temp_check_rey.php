<?php
require __DIR__.'/vendor/autoload.php';
$app=require __DIR__.'/bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);$kernel->bootstrap();

$u=App\Models\User::where('email','rey@bwa.com')->orWhere('name','Rey')->first();
if(!$u){echo "REY user not found\n";exit;}
$roles=$u->roles()->pluck('name')->all();
$aff=App\Models\Affiliate::where('user_id',$u->id)->first();

echo "user_id={$u->id} email={$u->email} roles=".json_encode($roles)."\n";
if($aff){
 echo "affiliate_id={$aff->id} is_active=".($aff->is_active?'1':'0')." active_until=".($aff->active_until ?? 'null')." sponsor_id=".($aff->sponsor_id ?? 'null')."\n";
} else {
 echo "affiliate_row=NONE\n";
}
