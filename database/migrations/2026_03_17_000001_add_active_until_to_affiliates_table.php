<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('affiliates', function (Blueprint $table) {
            if (!Schema::hasColumn('affiliates', 'active_until')) {
                $table->timestamp('active_until')->nullable()->after('activated_at');
                $table->index('active_until');
            }
        });
    }

    public function down(): void
    {
        Schema::table('affiliates', function (Blueprint $table) {
            if (Schema::hasColumn('affiliates', 'active_until')) {
                $table->dropIndex(['active_until']);
                $table->dropColumn('active_until');
            }
        });
    }
};

