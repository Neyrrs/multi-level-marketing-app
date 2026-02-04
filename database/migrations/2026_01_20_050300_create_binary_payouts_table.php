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
        Schema::create('binary_payouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            
            // Batch tracking
            $table->string('batch_number')->comment('Nomor batch proses');
            $table->date('payout_date');
            $table->string('payout_period')->comment('Format: 2026-01-01 to 2026-01-07');
            
            // Matching details
            $table->integer('left_volume');
            $table->integer('right_volume');
            $table->integer('pairs_matched');
            
            // Commission calculation
            $table->foreignId('method_id')->constrained('commission_methods');
            $table->foreignId('rule_id')->nullable()->constrained('commission_rules')->onDelete('set null');
            
            $table->decimal('payout_amount', 15, 2);
            $table->jsonb('calculation_detail')->nullable()->comment('Detail kalkulasi matching');
            
            // Status
            $table->enum('status', ['calculated', 'approved', 'paid', 'cancelled'])->default('calculated');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            
            // Payment reference
            $table->foreignId('commission_id')->nullable()->constrained('commissions')->onDelete('set null');
            
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['affiliate_id', 'payout_date']);
            $table->index(['batch_number', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('binary_payouts');
    }
};
