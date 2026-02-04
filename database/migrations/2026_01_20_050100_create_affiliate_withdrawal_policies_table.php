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
        Schema::create('affiliate_withdrawal_policies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            $table->foreignId('policy_id')->constrained('withdrawal_policies')->onDelete('cascade');
            
            // Tracking
            $table->timestamp('applied_at')->nullable()->comment('Kapan policy ini diterapkan');
            $table->timestamp('valid_from')->default(now());
            $table->timestamp('valid_until')->nullable();
            
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['affiliate_id', 'is_active']);
            $table->index('policy_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliate_withdrawal_policies');
    }
};
