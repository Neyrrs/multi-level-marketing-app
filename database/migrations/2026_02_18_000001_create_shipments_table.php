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
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->string('shipment_number')->unique()->comment('Nomor resi/shipment');
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade')->comment('Order terkait');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->comment('Customer');
            $table->foreignId('affiliate_id')->nullable()->constrained('affiliates')->onDelete('set null')->comment('Affiliate penjual');

            // Shipping Information
            $table->string('courier')->nullable()->comment('JNE, Grab, Pos, etc');
            $table->string('tracking_number')->nullable()->unique()->comment('Nomor resi dari kurir');
            $table->jsonb('shipping_address')->comment('Detail alamat pengiriman');
            $table->string('recipient_name')->comment('Nama penerima');
            $table->string('recipient_phone')->comment('Telepon penerima');

            // Dates
            $table->timestamp('shipped_date')->nullable()->comment('Tanggal barang dikirim');
            $table->timestamp('estimated_delivery')->nullable()->comment('Estimasi pengiriman');
            $table->timestamp('actual_delivery_date')->nullable()->comment('Tanggal barang diterima');

            // Status
            $table->enum('status', [
                'pending',
                'ready_to_ship',
                'shipped',
                'in_transit',
                'delivered',
                'returned',
                'lost'
            ])->default('pending')->comment('Status pengiriman');

            // Delivery Confirmation
            $table->boolean('signature_received')->default(false)->comment('Tanda tangan penerima');
            $table->string('receiver_name')->nullable()->comment('Nama yang menerima');
            $table->timestamp('received_at')->nullable()->comment('Waktu diterima');

            $table->text('notes')->nullable();

            $table->timestamps();

            // Indexes
            $table->index('shipment_number');
            $table->index('tracking_number');
            $table->index(['order_id', 'status']);
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('affiliate_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipments');
    }
};
