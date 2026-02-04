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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            // Basic Info
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Classification
            $table->enum('type', ['single', 'bundle'])->default('single')->comment('single product atau bundle');
            $table->jsonb('image')->nullable()->comment('[{"url": "...", "alt": "..."}]');
            
            // Inventory
            $table->integer('stock')->default(0);
            $table->decimal('weight', 12, 2)->nullable();
            
            // Pricing
            $table->decimal('harga_awal', 12, 2)->comment('Harga normal/original');
            $table->decimal('diskon', 5, 2)->default(0)->comment('Diskon dalam persen');
            $table->decimal('harga_akhir', 12, 2)->comment('Harga setelah diskon');
            
            // Configuration
            $table->boolean('is_active')->default(true);
            $table->boolean('is_affiliate_product')->default(true)->comment('Bisa dijual oleh affiliate');
            $table->boolean('generates_activation_code')->default(false)->comment('Pembelian menghasilkan activation code');
            
            $table->timestamps();
            
            $table->index('name');
            $table->index('slug');
            $table->index(['is_active', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
