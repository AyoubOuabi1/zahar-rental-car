<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ReservationAddedOption extends Pivot
{
    protected $casts = [
        'price_per_day' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
