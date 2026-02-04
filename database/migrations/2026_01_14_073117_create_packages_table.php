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
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            
            // Package Info
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Pricing
            $table->decimal('price', 15, 2);
            $table->decimal('discount', 5, 2)->default(0)->comment('Diskon dalam persen');
            $table->decimal('final_price', 15, 2);
            
            // Package Configuration
            $table->boolean('is_active')->default(true);
            $table->boolean('is_affiliate_package')->default(true)->comment('Bisa dijual oleh affiliate');
            $table->integer('activation_codes_count')->default(1)->comment('Jumlah activation code per pembelian');
            
            // Metadata
            $table->jsonb('image')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index('name');
            $table->index('slug');
            $table->index(['is_active', 'is_affiliate_package']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
