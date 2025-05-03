import React from 'react';
import { Head } from '@inertiajs/react';
import { Car } from '@/types/Car';
import { Place } from '@/types/Place';
import FrontOfficeLayout from '@/layouts/FrontOfficeLayout';

interface Props {
    available_cars: Car[];
    date_from: string;
    date_to: string;
    pickup_location: string;
    return_location: string;
    places?: Place[];
}

export default function Booking({ available_cars, date_from, date_to, pickup_location, return_location, places = [] }: Props) {
    // Calculate number of days between the dates
    const startDate = new Date(date_from);
    const endDate = new Date(date_to);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    // Format dates for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0].replace(/-/g, '-');
    };

    // Format time for display
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toTimeString().slice(0, 5);
    };

    // Find place by ID
    const getPlaceName = (placeId: string) => {
        const place = places.find(p => String(p.id) === String(placeId));
        return place ? place.title : 'Location inconnue';
    };

    const getPlacePrice = (placeId: string) => {
        const place = places.find(p => String(p.id) === String(placeId));
        return place ? place.price : '0';
    };
    const selectCar = (carId: number) => {
        window.location.href = `/reservation/options?car_id=${carId}&date_from=${encodeURIComponent(date_from)}&date_to=${encodeURIComponent(date_to)}&pickup_location=${pickup_location}&return_location=${return_location}`;
    };


    return (
        <FrontOfficeLayout>
            <Head title="Sélection du véhicule" />

            {/* Hero section with progress steps */}
            <div className="relative bg-blue-900 text-white py-12">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://cristallinecar.com/assets/img/facts-section.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    {/* Progress steps */}
                    <div className="flex justify-center items-center max-w-3xl mx-auto mb-8">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <span className="text-xs mt-1">Véhicules</span>
                        </div>
                        <div className="h-px bg-gray-400 flex-grow mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <span className="text-xs mt-1">Options</span>
                        </div>
                        <div className="h-px bg-gray-400 flex-grow mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <span className="text-xs mt-1">Terminer</span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center">Étape 1 - Sélection du véhicule</h1>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Sélection du véhicule
                    <div className="h-1 w-16 bg-blue-500 mx-auto mt-2"></div>
                </h2>

                {/* Reservation details */}
                <div className="max-w-5xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <span className="text-gray-600">Prise et retour :</span>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-semibold">{diffDays} Jours</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-600">Départ:</span>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span className="font-semibold">{getPlaceName(pickup_location)} - {getPlacePrice(pickup_location)} MAD</span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {formatDate(date_from)} @ {formatTime(date_from)}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-gray-600">Retour:</span>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span className="font-semibold">{getPlaceName(return_location)} - {getPlacePrice(return_location)} MAD</span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {formatDate(date_to)} @ {formatTime(date_to)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Available cars count */}
                <div className="max-w-5xl mx-auto mb-6">
                    <p className="text-gray-600">{available_cars.length} voitures disponibles pendant la période sélectionnée.</p>
                </div>

                {/* Car listings */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {available_cars.map((car) => (
                        <div key={car.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                            {/* Car Category Badge */}
                            <div className="bg-blue-600 text-white py-1 px-3 inline-block">
                                <span className="font-medium">{car.category}</span>
                                <span className="bg-blue-800 ml-2 py-0.5 px-2 rounded-sm">-{car.discount}%</span>
                            </div>

                            {/* Car Name */}
                            <div className="p-4">
                                <h3 className="text-xl font-bold">{car.brand} {car.model}</h3>
                                <p className="text-gray-500 text-sm">Ou Similaire</p>
                            </div>

                            {/* Car Image */}
                            <div className="px-4">
                                <img
                                    src={car.image || `/api/placeholder/300/150?text=${car.brand}+${car.model}`}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Car Features */}
                            <div className="grid grid-cols-3 gap-2 p-4 border-t border-b border-gray-200">
                                {/* Fuel Type */}
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs mt-1">{car.fuel || 'Essence'}</span>
                                </div>

                                {/* Luggage */}
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                                        </svg>
                                    </div>
                                    <span className="text-xs mt-1">{car.luggage || '2'}</span>
                                </div>

                                {/* Passengers */}
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs mt-1">{car.seats || '5'} Personnes</span>
                                </div>
                            </div>

                            {/* Car Transmission & AC */}
                            <div className="grid grid-cols-2 gap-2 p-4 border-b border-gray-200">
                                <div className="flex items-center">
                                    <div>
                                        <span className="text-xs block text-gray-600">
                                            {car.transmission || 'Automatique'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                        </svg>
                                        <span className="text-xs">A/C</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="px-4 py-4 text-center">
                                <div className="text-xs text-gray-600">PRIX PAR JOUR</div>
                                <div className="font-bold text-blue-600 text-xl">{car.price_per_day || '250'} MAD / jour</div>
                            </div>

                            {/* Select Button */}
                            <div className="p-4">
                                <button
                                    onClick={() => selectCar(car.id)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                                >
                                    SÉLECTIONNEZ
                                </button>
                            </div>
                        </div>
                    ))}

                    {available_cars.length === 0 && (
                        <div className="col-span-3 text-center py-8">
                            <p className="text-gray-500 text-lg">Aucun véhicule disponible pour la période sélectionnée.</p>
                            <button
                                onClick={() => window.history.back()}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                            >
                                Retour à la recherche
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </FrontOfficeLayout>
    );
}
