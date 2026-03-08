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
        Schema::create('commission_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        Schema::create('commission_plan_rule', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_id')->constrained('commission_plans')->cascadeOnDelete();
            $table->foreignId('rule_id')->constrained('commission_rules')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['plan_id', 'rule_id']);
            $table->index(['plan_id']);
            $table->index(['rule_id']);
        });

        Schema::table('affiliates', function (Blueprint $table) {
            $table->foreignId('commission_plan_id')
                ->nullable()
                ->after('commission_method_id')
                ->constrained('commission_plans')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('affiliates', function (Blueprint $table) {
            $table->dropConstrainedForeignId('commission_plan_id');
        });

        Schema::dropIfExists('commission_plan_rule');
        Schema::dropIfExists('commission_plans');
    }
};
