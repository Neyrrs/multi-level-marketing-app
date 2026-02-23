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
        Schema::table('commission_rules', function (Blueprint $table) {
            // Add flexible columns for template-based system
            $table->after('value', function (Blueprint $table) {
                // For level-based (depth) commission - stores JSON array of percentages
                $table->json('depth_percentages')->nullable()->comment('{"1": 5, "2": 4, "3": 3, "4": 2, "5": 1}');
                
                // Maximum depth for this rule
                $table->integer('max_depth')->default(5)->comment('Max depth level for commission calculation');
                
                // Configuration for template system
                $table->json('template_config')->nullable()->comment('Flexible config for admin customization');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('commission_rules', function (Blueprint $table) {
            $table->dropColumn(['depth_percentages', 'max_depth', 'template_config']);
        });
    }
};
