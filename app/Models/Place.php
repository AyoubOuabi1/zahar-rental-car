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
    protected $casts = [
        'description' => 'string', // Or create a custom cast for HTML
    ];
}
