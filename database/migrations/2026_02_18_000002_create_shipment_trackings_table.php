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
        Schema::create('shipment_trackings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shipment_id')->constrained('shipments')->onDelete('cascade');

            $table->enum('status', [
                'processing',
                'picked_up',
                'in_transit',
                'out_for_delivery',
                'delivered',
                'failed_attempt'
            ])->comment('Status pengiriman');

            $table->string('location')->nullable()->comment('Lokasi current');
            $table->text('description')->comment('Deskripsi status');

            $table->timestamp('tracked_at')->comment('Waktu update status');

            $table->timestamps();

            $table->index(['shipment_id', 'tracked_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipment_trackings');
    }
};
