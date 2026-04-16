<?php
require 'vendor/autoload.php';
$app=require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$a=App\Models\Affiliate::find(4);
var_export($a?->only(['id','user_id','username','slug','commission_plan_id']));
