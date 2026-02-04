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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // $table->jsonb('name'); // Name Depan, Belakang, Full Name
            // $table->jsonb('address'); // provinsi, kota/kabupaten, kecamatan, postalcode
            
            $table->json('personal_info')->nullable()->comment('{
                "first_name": "John",
                "last_name": "Doe",
                "birth_date": "1990-01-01",
                "gender": "male"
            }');
            
            $table->json('address')->nullable()->comment('{
                "province": "Jawa Barat",
                "city": "Bandung",
                "district": "Coblong",
                "subdistrict": "Lebak Siliwangi",
                "street": "Jl. Ganesha No. 10",
                "postal_code": "40132",
                "coordinates": {"lat": -6.891, "lng": 107.610}
            }');
            
            $table->string('photo_profile')->nullable();
            
            $table->timestamps();
            
            $table->unique('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
