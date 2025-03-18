<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pack extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'status', 'price_per_day'
    ];

    public function items()
    {
        return $this->hasMany(PackItem::class);
    }
}
