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
        Schema::create('notification_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Notification Details
            $table->string('notification_type')->comment('whatsapp, email, sms');
            $table->string('template')->comment('Jenis notifikasi: account_created, commission_approved, etc');
            $table->string('destination')->comment('Nomor WA, email, atau nomor telepon');
            
            // Status tracking
            $table->enum('status', ['pending', 'sent', 'failed', 'delivered'])->default('pending');
            $table->timestamp('sent_at')->nullable();
            $table->text('response')->nullable()->comment('Response dari gateway');
            
            // Attempt tracking
            $table->integer('attempt_count')->default(0);
            $table->timestamp('last_attempt_at')->nullable();
            
            // Metadata
            $table->jsonb('data')->nullable()->comment('Data untuk template');
            $table->text('error_message')->nullable();
            
            $table->timestamps();
            
            $table->index(['user_id', 'notification_type']);
            $table->index(['status', 'created_at']);
            $table->index('template');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification_logs');
    }
};
