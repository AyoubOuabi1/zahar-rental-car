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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('flight_number')->nullable();
            $table->date('date_from');
            $table->date('date_to');
            $table->foreignId('pick_up_place_id')->constrained('places')->onDelete('cascade');
            $table->foreignId('drop_off_place_id')->constrained('places')->onDelete('cascade');
            $table->foreignId('car_id')->constrained()->onDelete('cascade');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->string('status')->default('Pending');
            $table->foreignId('pack_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('total_price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
