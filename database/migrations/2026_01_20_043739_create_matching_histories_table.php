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
        Schema::create('matching_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            
            // Volume tracking
            $table->integer('left_volume');
            $table->integer('right_volume');
            $table->integer('pairs_matched');
            $table->integer('unmatched_volume')->default(0);
            
            // Period tracking
            $table->date('period_date')->comment('Tanggal periode matching');
            $table->string('period_type')->default('daily')->comment('daily, weekly, monthly');
            
            // Commission generated
            $table->boolean('commission_generated')->default(false);
            $table->decimal('commission_amount', 15, 2)->nullable();
            
            $table->timestamps();
            
            $table->index(['affiliate_id', 'period_date']);
            $table->index(['period_type', 'period_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matching_histories');
    }
};
