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
        Schema::create('withdrawal_policies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('Nama kebijakan: Default, Premium, dll');
            $table->text('description')->nullable();
            
            // Minimum & Maximum Limits
            $table->decimal('minimum_amount', 15, 2)->comment('Minimum penarikan');
            $table->decimal('maximum_amount', 15, 2)->nullable()->comment('Maximum per transaksi (null = unlimited)');
            $table->integer('maximum_frequency_per_month')->comment('Maksimal penarikan per bulan');
            
            // Processing
            $table->string('processing_day')->default('monday')->comment('Hari processing: monday, tuesday, dll atau daily');
            $table->time('processing_time')->default('09:00:00')->comment('Jam processing');
            $table->integer('processing_duration_hours')->default(24)->comment('Durasi proses (jam)');
            
            // Fees
            $table->enum('fee_type', ['fixed', 'percentage'])->default('fixed');
            $table->decimal('fee_amount', 15, 2)->default(0)->comment('Biaya: fixed amount atau percentage');
            $table->decimal('fee_minimum', 15, 2)->nullable()->comment('Minimum fee jika percentage');
            $table->decimal('fee_maximum', 15, 2)->nullable()->comment('Maximum fee jika percentage');
            
            // Requirement
            $table->decimal('minimum_balance_requirement', 15, 2)->nullable()->comment('Balance min yang harus tersisa');
            $table->integer('minimum_active_days')->default(0)->comment('Minimal hari aktif sebelum bisa tarik');
            
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawal_policies');
    }
};
