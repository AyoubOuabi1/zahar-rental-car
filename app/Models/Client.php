<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'identity_or_passport_number', 'full_name', 'email',
        'mobile_number', 'address', 'permit_license_id'
    ];
    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
