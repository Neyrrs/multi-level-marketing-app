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
        Schema::create('package_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained('packages')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            
            // Quantity dalam package
            $table->integer('quantity')->default(1);
            
            // Optional: override harga dalam paket
            $table->decimal('harga_awal', 12, 2)->nullable()->comment('Override harga jika berbeda');
            $table->decimal('diskon', 5, 2)->default(0)->nullable();
            $table->decimal('harga_akhir', 12, 2)->nullable();
            
            $table->timestamps();
            
            $table->index('package_id');
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_items');
    }
};
