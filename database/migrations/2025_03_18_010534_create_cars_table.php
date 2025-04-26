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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('matriculation');
            $table->string('model');
            $table->string('category');
            $table->string('fuel');
            $table->string('transmission');
            $table->integer('luggage');
            $table->integer('seats');
            $table->boolean('ac');
            $table->integer('doors');
            $table->string('image');
            $table->integer('discount')->default(0);
            $table->decimal('price_per_day', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
