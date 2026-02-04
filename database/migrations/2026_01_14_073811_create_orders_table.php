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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->comment('Customer');
            $table->foreignId('affiliate_id')->nullable()->constrained('affiliates')->onDelete('set null')->comment('Affiliate yang melakukan penjualan');
            
            // Payment Method
            $table->string('payment_method')->comment('Bank transfer, credit card, dll');
            $table->string('midtrans_order_id')->unique();
            $table->jsonb('midtrans_data')->nullable()->comment('Response data dari Midtrans');
            
            // Shipping Information
            $table->jsonb('shipping_data')->nullable()->comment('Alamat pengiriman & informasi');
            
            // Product/Package Information
            $table->string('product_type')->comment('single, package, activation_code');
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('set null');
            $table->string('product_name');
            $table->integer('quantity')->default(1);
            
            // Pricing
            $table->decimal('price', 15, 2)->comment('Harga unit');
            $table->decimal('total_amount', 15, 2)->comment('Total harga (quantity x price)');
            $table->decimal('shipping_cost', 15, 2)->default(0);
            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('grand_total', 15, 2)->comment('Total pembayaran');

            // Payment Status
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'expired'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->string('payment_reference')->nullable()->comment('Referensi dari bank/payment gateway');
            
            // Order Status
            $table->enum('status', ['pending', 'processing', 'shipped', 'completed', 'cancelled'])->default('pending');
            
            // Activation Code Generation
            $table->integer('activation_codes_count')->default(0)->comment('Jumlah activation code yang dihasilkan');
            $table->boolean('generates_activation_code')->default(false);
            
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index('order_number');
            $table->index(['user_id', 'status']);
            $table->index(['payment_status', 'created_at']);
            $table->index('affiliate_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
