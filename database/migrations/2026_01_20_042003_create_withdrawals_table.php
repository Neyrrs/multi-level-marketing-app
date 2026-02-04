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
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->string('withdrawal_number')->unique()->comment('Nomor referensi penarikan');
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            
            // Bank & VA Information
            $table->foreignId('bank_account_id')->nullable()->constrained('affiliate_bank_accounts')->onDelete('set null');
            $table->string('destination_account')->nullable()->comment('Nomor rekening tujuan');
            $table->string('destination_bank')->nullable()->comment('Nama bank tujuan');
            $table->string('destination_name')->nullable()->comment('Nama penerima');
            
            // Withdrawal Details
            $table->decimal('amount', 15, 2);
            $table->decimal('fee', 15, 2)->default(0)->comment('Biaya admin penarikan');
            $table->decimal('net_amount', 15, 2)->comment('Amount - Fee');
            
            // Status & Timeline
            $table->enum('status', ['pending', 'approved', 'processing', 'completed', 'rejected', 'failed'])->default('pending');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            
            // Midtrans VA Integration
            $table->string('midtrans_reference')->nullable()->comment('Reference dari Midtrans');
            $table->jsonb('midtrans_response')->nullable();
            
            // Audit
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            $table->index(['affiliate_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('withdrawal_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};
