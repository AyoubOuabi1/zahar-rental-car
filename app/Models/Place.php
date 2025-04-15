<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image_url'
    ];
    public function pickupReservations()
    {
        return $this->hasMany(Reservation::class, 'pick_up_place_id');
    }

    public function dropoffReservations()
    {
        return $this->hasMany(Reservation::class, 'drop_off_place_id');
    }
    protected $casts = [
        'description' => 'string',
    ];
}
