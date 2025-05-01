<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Place;
use Inertia\Inertia;

class HomeController
{
    public function index()
    {

        $cars = Car::all();
        $places = Place::all();
        return Inertia::render('welcome', [
            'cars' => $cars,
            'places' => $places,
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
