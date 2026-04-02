<?php
require __DIR__.'/vendor/autoload.php';
$app=require __DIR__.'/bootstrap/app.php';
$kernel=$app->make(Illuminate\Contracts\Console\Kernel::class);$kernel->bootstrap();

$u=App\Models\User::where('email','lagi@gmail.com')->first();
if(!$u){echo "user none\n";exit;}
$req=App\Models\Affiliate::where('user_id',$u->id)->where('is_active',false)->latest('id')->first();
if(!$req){echo "request none\n";exit;}
$code=App\Models\ActivationCode::find($req->activation_code_id);
echo "request aff#{$req->id} user#{$req->user_id} sponsor#{$req->sponsor_id} code=".($code?->code??'-')."\n";
