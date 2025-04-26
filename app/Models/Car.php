<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand', 'matriculation','model', 'category', 'fuel', 'transmission',
        'luggage', 'seats', 'ac', 'doors', 'image', 'discount', 'price_per_day'
    ];
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    // Add casts for boolean fields
    protected $casts = [
        'aca' => 'boolean',
        'price_per_day' => 'decimal:2',
        'discount' => 'decimal:2'
    ];
}
