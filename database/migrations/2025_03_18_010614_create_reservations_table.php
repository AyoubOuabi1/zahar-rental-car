<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // In the create_reservations_table migration file
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients');
            $table->foreignId('car_id')->constrained('cars');
            $table->foreignId('pickup_place_id')->constrained('places');
            $table->foreignId('dropoff_place_id')->constrained('places');
            $table->foreignId('pack_id')->nullable()->constrained('packs');
            $table->string('flight_number')->nullable();
            $table->dateTime('date_from');
            $table->dateTime('date_to');
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'active', 'completed', 'cancelled'])->default('pending');
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
