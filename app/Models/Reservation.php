<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_number','date_from', 'date_to', 'pick_up_place_id', 'drop_off_place_id',
        'car_id', 'client_id', 'status', 'pack_id', 'added_option_ids', 'total_price'
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function pack()
    {
        return $this->belongsTo(Pack::class);
    }

    public function pickUpPlace()
    {
        return $this->belongsTo(Place::class, 'pick_up_place_id');
    }

    public function dropOffPlace()
    {
        return $this->belongsTo(Place::class, 'drop_off_place_id');
    }
}
