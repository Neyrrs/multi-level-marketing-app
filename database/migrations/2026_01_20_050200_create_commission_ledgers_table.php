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
        Schema::create('commission_ledgers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            
            // Commission Reference
            $table->foreignId('commission_id')->nullable()->constrained('commissions')->onDelete('set null');
            $table->foreignId('order_id')->nullable()->constrained('orders')->onDelete('set null');
            
            // Type & Amount
            $table->string('type')->comment('credit, debit, adjustment');
            $table->decimal('amount', 15, 2);
            $table->string('description');
            
            // Running Balance
            $table->decimal('balance_before', 15, 2);
            $table->decimal('balance_after', 15, 2);
            
            // Reference
            $table->string('reference')->nullable()->comment('Reference dari sistem atau manual');
            $table->string('reference_type')->nullable()->comment('order, withdrawal, adjustment, etc');
            
            // Status
            $table->string('status')->default('posted')->comment('pending, posted, reversed');
            
            // Metadata
            $table->jsonb('metadata')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index(['affiliate_id', 'created_at']);
            $table->index('type');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_ledgers');
    }
};
