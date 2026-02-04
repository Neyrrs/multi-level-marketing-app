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
        Schema::create('commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            $table->foreignId('order_id')->nullable()->constrained('orders')->onDelete('set null');
            $table->foreignId('method_id')->constrained('commission_methods')->onDelete('set null');
            $table->foreignId('rule_id')->nullable()->constrained('commission_rules')->onDelete('set null');
            
            // Commission details
            $table->decimal('amount', 15, 2);
            $table->string('commission_type')->comment('direct, matching, bonus, level');
            $table->integer('depth_level')->nullable()->comment('Level dalam upline untuk level commission');
            $table->jsonb('calculation_detail')->nullable();
            
            // Status tracking
            $table->enum('status', ['pending', 'calculated', 'approved', 'paid', 'cancelled'])->default('pending');
            $table->timestamp('calculated_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            
            $table->timestamps();
            
            // Indexes untuk performa query
            $table->index(['affiliate_id', 'status']);
            $table->index(['order_id', 'status']);
            $table->index(['created_at', 'status']);
            $table->index('method_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commissions');
    }
};
