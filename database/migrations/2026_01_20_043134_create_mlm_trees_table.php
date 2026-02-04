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
        Schema::create('mlm_trees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_id')->constrained('affiliates')->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('affiliates')->onDelete('set null')->comment('Parent dalam tree');
            
            // Tree structure (Nested Set Model)
            $table->integer('left_position')->comment('Nested set left pointer');
            $table->integer('right_position')->comment('Nested set right pointer');
            $table->integer('depth')->default(0)->comment('Kedalaman level');
            
            // Path & Lineage untuk query optimization
            $table->string('path', 1000)->nullable()->comment('Path dari root: "affiliate_id/parent_id/..."');
            $table->string('lineage', 2000)->nullable()->comment('Lineage string untuk display');
            
            // Position indicator
            $table->enum('position', ['left', 'right'])->nullable();
            
            $table->timestamps();
            
            $table->index('affiliate_id');
            $table->index('parent_id');
            $table->index(['left_position', 'right_position']);
            $table->index('depth');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mlm_trees');
    }
};
