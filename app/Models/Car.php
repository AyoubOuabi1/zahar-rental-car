<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand', 'model', 'category', 'fuel', 'transmission',
        'luggage', 'seats', 'ac', 'doors', 'image', 'discount', 'price_per_da   y'
    ];
}
