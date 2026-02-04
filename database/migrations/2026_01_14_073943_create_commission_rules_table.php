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
        Schema::create('commission_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('method_id')->constrained('commission_methods')->onDelete('cascade');
            $table->string('rule_name');
            $table->jsonb('condition')->nullable()->comment('{"min_sales": 100000, "max_depth": 5, "min_legs": 1}');
            $table->decimal('value', 12, 2)->comment('Percentage atau fixed amount');
            $table->integer('priority')->default(0)->comment('Higher priority = evaluated first');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['method_id', 'is_active']);
            $table->index('priority');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_rules');
    }
};
