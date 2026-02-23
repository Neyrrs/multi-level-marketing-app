<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add indexes to orders table for performance optimization
        Schema::table('orders', function (Blueprint $table) {
            // Check if indexes don't exist before creating
            if (!$this->indexExists('orders', 'orders_payment_status_index')) {
                $table->index('payment_status');
            }
            if (!$this->indexExists('orders', 'orders_status_created_at_index')) {
                $table->index(['status', 'created_at']);
            }
            if (!$this->indexExists('orders', 'orders_user_id_status_index')) {
                $table->index(['user_id', 'status']);
            }
        });

        // Add indexes to shipments table for performance optimization
        Schema::table('shipments', function (Blueprint $table) {
            if (!$this->indexExists('shipments', 'shipments_status_created_at_index')) {
                $table->index(['status', 'created_at']);
            }
            if (!$this->indexExists('shipments', 'shipments_courier_index')) {
                $table->index('courier');
            }
            if (!$this->indexExists('shipments', 'shipments_user_id_status_index')) {
                $table->index(['user_id', 'status']);
            }
            if (!$this->indexExists('shipments', 'shipments_affiliate_id_status_index')) {
                $table->index(['affiliate_id', 'status']);
            }
            if (!$this->indexExists('shipments', 'shipments_actual_delivery_date_shipped_date_index')) {
                $table->index(['actual_delivery_date', 'shipped_date']);
            }
        });

        // Add indexes to shipment_trackings table
        Schema::table('shipment_trackings', function (Blueprint $table) {
            if (!$this->indexExists('shipment_trackings', 'shipment_trackings_shipment_id_created_at_index')) {
                $table->index(['shipment_id', 'created_at']);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if ($this->indexExists('orders', 'orders_payment_status_index')) {
                $table->dropIndex('orders_payment_status_index');
            }
            if ($this->indexExists('orders', 'orders_status_created_at_index')) {
                $table->dropIndex('orders_status_created_at_index');
            }
            if ($this->indexExists('orders', 'orders_user_id_status_index')) {
                $table->dropIndex('orders_user_id_status_index');
            }
        });

        Schema::table('shipments', function (Blueprint $table) {
            if ($this->indexExists('shipments', 'shipments_status_created_at_index')) {
                $table->dropIndex('shipments_status_created_at_index');
            }
            if ($this->indexExists('shipments', 'shipments_courier_index')) {
                $table->dropIndex('shipments_courier_index');
            }
            if ($this->indexExists('shipments', 'shipments_user_id_status_index')) {
                $table->dropIndex('shipments_user_id_status_index');
            }
            if ($this->indexExists('shipments', 'shipments_affiliate_id_status_index')) {
                $table->dropIndex('shipments_affiliate_id_status_index');
            }
            if ($this->indexExists('shipments', 'shipments_actual_delivery_date_shipped_date_index')) {
                $table->dropIndex('shipments_actual_delivery_date_shipped_date_index');
            }
        });

        Schema::table('shipment_trackings', function (Blueprint $table) {
            if ($this->indexExists('shipment_trackings', 'shipment_trackings_shipment_id_created_at_index')) {
                $table->dropIndex('shipment_trackings_shipment_id_created_at_index');
            }
        });
    }

    /**
     * Check if index exists
     */
    private function indexExists($table, $index)
    {
        $indexes = DB::select("SELECT indexname FROM pg_indexes WHERE tablename = '{$table}'");
        foreach ($indexes as $idx) {
            if ($idx->indexname === $index) {
                return true;
            }
        }
        return false;
    }
};

