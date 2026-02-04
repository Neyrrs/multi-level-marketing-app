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
        Schema::create('affiliates', function (Blueprint $table) {
            $table->id();

            $table->string('username')->unique();  // app.com/abdu (username)
            $table->string('slug')->unique();      // URL slug

            // User Reference
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Sponsor & Upline (Binary Tree)
            $table->foreignId('sponsor_id')->nullable()->constrained('users')->onDelete('set null')->comment('Sponsor (yang merekomendasikan)');
            $table->foreignId('upline_id')->nullable()->constrained('users')->onDelete('set null')->comment('Parent dalam binary tree');
            $table->foreignId('activation_code_id')->nullable()->constrained('activation_codes')->onDelete('set null');

            // Position in Binary Tree
            $table->enum('position', ['left', 'right', 'none'])->default('none')->comment('Posisi dalam binary tree');
            $table->integer('level')->default(1)->comment('Level dalam struktur');
            
            // Downline Count
            $table->integer('direct_downline')->default(0)->comment('Jumlah downline langsung');
            $table->integer('total_downline')->default(0)->comment('Total semua downline');
            
            // Binary Tree Volumes
            $table->integer('left_count')->default(0)->comment('Jumlah downline di kiri');
            $table->integer('right_count')->default(0)->comment('Jumlah downline di kanan');
            $table->integer('pair_count')->default(0)->comment('Jumlah pasangan (matching pairs)');
            
            // Volume Tracking for Commission
            $table->decimal('left_volume', 15, 2)->default(0)->comment('Total volume kiri');
            $table->decimal('right_volume', 15, 2)->default(0)->comment('Total volume kanan');
            $table->decimal('total_personal_volume', 15, 2)->default(0)->comment('Volume personal pembelian');
            $table->decimal('total_volume', 15, 2)->default(0)->comment('Total volume termasuk downline');
            
            // Status & Activation
            $table->boolean('is_active')->default(true);
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('last_activity_at')->nullable();
            
            $table->timestamps();

            // Indexes untuk performa
            $table->unique('user_id');
            $table->index('sponsor_id');
            $table->index('upline_id');
            $table->index(['upline_id', 'position']);
            $table->index('level');
            $table->index('activation_code_id');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliates');
    }
};
