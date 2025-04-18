<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddedOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'price_per_day'
    ];

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'reservation_added_option')
            ->withPivot('quantity', 'price_at_reservation')
            ->withTimestamps();
    }
}
