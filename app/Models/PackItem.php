<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'pack_id', 'title'
    ];

    public function pack()
    {
        return $this->belongsTo(Pack::class);
    }
}
