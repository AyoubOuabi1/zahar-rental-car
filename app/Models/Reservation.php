<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_number',
        'date_from',
        'date_to',
        'pick_up_place_id',
        'drop_off_place_id',
        'car_id',
        'client_id',
        'status',
        'pack_id',
        'total_price'
    ];

    protected $casts = [
        'date_from' => 'datetime',
        'date_to' => 'datetime',
        'total_price' => 'decimal:2',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function pack(): BelongsTo
    {
        return $this->belongsTo(Pack::class)->withDefault([
            'title' => 'No Pack',
            'price_per_day' => 0
        ]);
    }

    public function pickUpPlace(): BelongsTo
    {
        return $this->belongsTo(Place::class, 'pick_up_place_id');
    }

    public function dropOffPlace(): BelongsTo
    {
        return $this->belongsTo(Place::class, 'drop_off_place_id');
    }

    public function addedOptions(): BelongsToMany
    {
        return $this->belongsToMany(AddedOption::class)
            ->withPivot([
                'quantity',
                'price_per_day',
                'created_at',
                'updated_at'
            ])
            ->using(ReservationAddedOption::class);
    }

    public function calculateDuration(): int
    {
        return $this->date_from->diffInDays($this->date_to);
    }

    public function calculateTotalPrice(): void
    {
        $days = $this->calculateDuration();

        $basePrice = $this->car->price_per_day * $days;
        $packPrice = $this->pack ? $this->pack->price_per_day * $days : 0;

        $optionsPrice = $this->addedOptions->sum(
            fn($option) => $option->pivot->price_per_day * $option->pivot->quantity * $days
        );

        $this->total_price = $basePrice + $packPrice + $optionsPrice;
        $this->save();
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['pending', 'confirmed']);
    }

    public function scopeBetweenDates($query, $from, $to)
    {
        return $query->where(function($q) use ($from, $to) {
            $q->whereBetween('date_from', [$from, $to])
                ->orWhereBetween('date_to', [$from, $to])
                ->orWhere(function($q) use ($from, $to) {
                    $q->where('date_from', '<', $from)
                        ->where('date_to', '>', $to);
                });
        });
    }
}
