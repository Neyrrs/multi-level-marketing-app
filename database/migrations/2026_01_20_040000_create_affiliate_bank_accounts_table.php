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
        Schema::create('affiliate_bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            
            // Bank Information
            $table->string('bank_name')->comment('Nama bank: BRI, BCA, Mandiri, dll');
            $table->string('bank_code')->comment('Kode bank untuk Midtrans');
            $table->string('account_number')->unique();
            $table->string('account_holder')->comment('Nama pemilik rekening');
            
            // Account Status
            $table->boolean('is_primary')->default(false)->comment('Akun primary untuk penarikan');
            $table->boolean('is_verified')->default(false)->comment('Sudah diverifikasi');
            $table->timestamp('verified_at')->nullable();
            
            // Withdrawal Configuration
            $table->decimal('minimum_withdrawal', 15, 2)->nullable()->comment('Min penarikan dari akun ini');
            $table->decimal('maximum_withdrawal', 15, 2)->nullable()->comment('Max penarikan dari akun ini');
            
            // Midtrans VA (Optional: untuk Direct Debit)
            $table->string('midtrans_token')->nullable()->comment('Token untuk recurring payment');
            $table->jsonb('midtrans_data')->nullable()->comment('Data Midtrans detail');
            
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['affiliate_id', 'is_primary']);
            $table->index('is_verified');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliate_bank_accounts');
    }
};
