<?php
require __DIR__.'/vendor/autoload.php';
$app=require __DIR__.'/bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);$kernel->bootstrap();

$u=App\Models\User::where('email','contoh@gmail.com')->first();
if(!$u){echo "user not found\n"; exit;}
$roles=$u->roles()->pluck('name')->all();
$aff=App\Models\Affiliate::where('user_id',$u->id)->latest('id')->first();

echo "USER: id={$u->id} email={$u->email} roles=".json_encode($roles)."\n";
if($aff){
 echo "AFF: id={$aff->id} sponsor_id={$aff->sponsor_id} upline_id={$aff->upline_id} is_active=".($aff->is_active?'1':'0')." activation_code_id={$aff->activation_code_id} level={$aff->level} position={$aff->position}\n";
} else { echo "AFF: none\n"; }

$code = App\Models\ActivationCode::find($aff?->activation_code_id);
if($code){ echo "CODE: id={$code->id} code={$code->code} status={$code->status} used_by={$code->used_by} notes={$code->notes}\n"; }

$mh=Illuminate\Support\Facades\DB::table('model_has_roles')->where('model_type',App\Models\User::class)->where('model_id',$u->id)->get();
echo "model_has_roles rows=".$mh->count()."\n";
foreach($mh as $r){ echo "role_id={$r->role_id}\n"; }
