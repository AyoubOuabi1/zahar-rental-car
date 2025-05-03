<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'car_id',
        'pickup_place_id',
        'dropoff_place_id',
        'flight_number',
        'date_from',
        'date_to',
        'total_price',
        'status',
    ];

    protected $casts = [
        'date_from' => 'datetime',
        'date_to' => 'datetime',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_ACTIVE = 'active';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function pickupPlace()
    {
        return $this->belongsTo(Place::class, 'pickup_place_id');
    }

    public function dropoffPlace()
    {
        return $this->belongsTo(Place::class, 'dropoff_place_id');
    }

    public function addedOptions()
    {
        return $this->belongsToMany(AddedOption::class, 'reservation_added_option')
            ->withPivot('quantity', 'price_at_reservation')
            ->withTimestamps();
    }

    public function getTotalDaysAttribute()
    {
        return $this->date_from->diffInDays($this->date_to) + 1;
    }

    public function calculateTotal()
    {
        $days = $this->total_days;

        $carPrice = $this->car->price_per_day * $days;
        $pickupPlace = $this->pickupPlace ? $this->pickupPlace->price : 0;
        $dropOffPlace = $this->dropoffPlace ? $this->dropoffPlace->price : 0;


        $optionsTotal = 0;
        foreach ($this->addedOptions as $option) {
            $optionsTotal += $option->pivot->price_at_reservation * $option->pivot->quantity * $days;
        }

        return $carPrice  + $optionsTotal+ $pickupPlace + $dropOffPlace;
    }

    public static function isCarAvailable($carId, $dateFrom, $dateTo, $excludeReservationId = null)
    {
        $query = self::where('car_id', $carId)
            ->where('status', '!=', self::STATUS_CANCELLED)
            ->where(function ($query) use ($dateFrom, $dateTo) {
                $query->where(function ($q) use ($dateFrom, $dateTo) {
                    $q->where('date_from', '<=', $dateFrom)
                        ->where('date_to', '>=', $dateFrom);
                })->orWhere(function ($q) use ($dateFrom, $dateTo) {
                    $q->where('date_from', '<=', $dateTo)
                        ->where('date_to', '>=', $dateTo);
                })->orWhere(function ($q) use ($dateFrom, $dateTo) {
                    $q->where('date_from', '>=', $dateFrom)
                        ->where('date_to', '<=', $dateTo);
                });
            });

        if ($excludeReservationId) {
            $query->where('id', '!=', $excludeReservationId);
        }

        return $query->count() === 0;
    }

    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopeUpcoming($query)
    {
        $today = now()->startOfDay();
        return $query->where('date_from', '>=', $today)
            ->where('status', '!=', self::STATUS_CANCELLED);
    }
}
