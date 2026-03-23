<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (!Schema::hasColumn('products', 'harga_modal')) {
                $table->decimal('harga_modal', 12, 2)->default(0)->after('harga_awal');
            }
        });

        DB::statement('UPDATE products SET harga_modal = harga_awal WHERE harga_modal = 0');
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (Schema::hasColumn('products', 'harga_modal')) {
                $table->dropColumn('harga_modal');
            }
        });
    }
};

