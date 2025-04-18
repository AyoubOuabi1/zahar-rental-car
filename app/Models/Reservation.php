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
        'pack_id',
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

    // Define status constants for easier reference
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

    public function pack()
    {
        return $this->belongsTo(Pack::class);
    }

    public function addedOptions()
    {
        return $this->belongsToMany(AddedOption::class, 'reservation_added_option')
            ->withPivot('quantity', 'price_at_reservation')
            ->withTimestamps();
    }

    // Method to calculate total days
    public function getTotalDaysAttribute()
    {
        return $this->date_from->diffInDays($this->date_to) + 1; // +1 because rental includes both start and end day
    }

    // Method to calculate reservation total
    public function calculateTotal()
    {
        $carPrice = $this->car->price * $this->total_days;
        $packPrice = $this->pack ? $this->pack->price : 0;

        $optionsTotal = 0;
        foreach ($this->addedOptions as $option) {
            $optionsTotal += $option->pivot->price_at_reservation * $option->pivot->quantity;
        }

        return $carPrice + $packPrice + $optionsTotal;
    }

    // Helper method to check if a car is available for booking
    public static function isCarAvailable($carId, $dateFrom, $dateTo, $excludeReservationId = null)
    {
        $query = self::where('car_id', $carId)
            ->where('status', '!=', self::STATUS_CANCELLED)
            ->where(function ($query) use ($dateFrom, $dateTo) {
                // Check if there's any overlap with existing reservations
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

        // Exclude current reservation when checking for updates
        if ($excludeReservationId) {
            $query->where('id', '!=', $excludeReservationId);
        }

        return $query->count() === 0;
    }

    // Scope to filter reservations by status
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    // Scope to get current active reservations
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // Scope to get upcoming reservations
    public function scopeUpcoming($query)
    {
        $today = now()->startOfDay();
        return $query->where('date_from', '>=', $today)
            ->where('status', '!=', self::STATUS_CANCELLED);
    }
}
