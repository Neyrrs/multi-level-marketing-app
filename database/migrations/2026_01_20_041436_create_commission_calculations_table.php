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
        Schema::create('commission_calculations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            $table->foreignId('method_id')->constrained('commission_methods')->onDelete('set null');
            $table->foreignId('commission_id')->nullable()->constrained('commissions')->onDelete('set null');
            
            $table->string('rule_applied')->nullable();
            $table->jsonb('calculation_detail')->nullable()->comment('Detail kalkulasi: base_amount, percentage, final_amount');
            
            $table->enum('status', ['pending', 'calculated', 'approved', 'paid', 'cancelled'])->default('pending');
            $table->timestamp('calculated_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            
            $table->timestamps();
            
            $table->index(['affiliate_id', 'status']);
            $table->index(['order_id', 'created_at']);
            $table->index('method_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_calculations');
    }
};
