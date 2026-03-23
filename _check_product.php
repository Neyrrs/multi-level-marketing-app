<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make('Illuminate\\Contracts\\Console\\Kernel')->bootstrap();
$p = App\Models\Product::where('name', 'Nara perfum')->latest('id')->first(['id','name','harga_modal','harga_awal','diskon','harga_akhir']);
print_r($p?->toArray());
