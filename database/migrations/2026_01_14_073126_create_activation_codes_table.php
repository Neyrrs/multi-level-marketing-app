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
        Schema::create('activation_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->index();
            $table->foreignId('owner_id')->nullable()->constrained('users')->onDelete('set null')->comment('User yang memiliki/membeli package');
            $table->foreignId('used_by')->nullable()->constrained('users')->onDelete('set null')->comment('User yang menggunakan kode');
            
            // Status & Usage
            $table->enum('status', ['available', 'used', 'expired', 'voided'])->default('available')->index();
            $table->timestamp('used_at')->nullable();
            $table->timestamp('expired_at')->nullable()->index();
            
            // Value & Commission
            $table->decimal('value', 15, 2)->nullable()->comment('Nilai poin atau bonus');
            $table->boolean('gives_commission')->default(true)->comment('Apakah code ini memberikan komisi');
            $table->decimal('commission_value', 15, 2)->nullable()->comment('Nilai komisi yang diberikan');
            
            // Product/Package Reference
            $table->decimal('price', 15, 2)->nullable()->comment('Harga saat code dibuat');
            $table->foreignId('product_id')->nullable()->constrained('products')->onDelete('set null');
            $table->foreignId('package_id')->nullable()->constrained('packages')->onDelete('set null');
            
            // Generation metadata
            $table->string('generated_from')->nullable()->comment('Dari order atau manual');
            $table->foreignId('generated_by')->nullable()->constrained('users')->onDelete('set null');
            
            // Additional info
            $table->integer('usage_count')->default(0)->comment('Berapa kali kode bisa digunakan');
            $table->integer('remaining_usage')->nullable();
            
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('owner_id');
            $table->index('used_by');
            $table->index(['status', 'expired_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activation_codes');
    }
};
