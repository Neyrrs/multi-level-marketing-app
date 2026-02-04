<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_activation_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('activation_code_id')->constrained('activation_codes')->onDelete('cascade');
            
            // Track which activation code came from which order
            $table->integer('sequence')->default(1)->comment('Urutan code dalam order jika multiple');
            $table->timestamps();
            
            $table->unique(['order_id', 'activation_code_id']);
            $table->index('order_id');
            $table->index('activation_code_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_activation_codes');
    }
};
