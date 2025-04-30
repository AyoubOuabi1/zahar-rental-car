<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Inertia\Inertia;

class HomeController
{
    public function index()
    {

        $cars = Car::all();
        return Inertia::render('welcome', [
            'cars' => $cars,
        ]);
    }

    public function cars()
    {

        $cars = Car::all();
        return Inertia::render('front/cars/index', [
            'cars' => $cars,
        ]);
    }
}
