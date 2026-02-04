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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');

            // fleksibel: bisa product_id atau package_id
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('cascade');
            $table->foreignId('package_id')->nullable()->constrained('packages')->onDelete('cascade');

            $table->integer('quantity')->default(1);
            $table->boolean('gives_activation_code')->default(false);

            // harga saat transaksi (supaya tidak berubah kalau harga produk naik)
            $table->decimal('harga_awal', 12, 2);
            $table->decimal('diskon', 5, 2)->default(0);
            $table->decimal('harga_akhir', 12, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
