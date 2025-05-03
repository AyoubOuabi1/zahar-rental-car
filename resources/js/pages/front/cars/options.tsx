import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import FrontOfficeLayout from '@/layouts/FrontOfficeLayout';
import { Car } from '@/types/Car';
import { Place } from '@/types/Place';
import { AddedOption } from '@/types/AddedOption';

interface Props {
    car: Car;
    date_from: string;
    date_to: string;
    pickup_location: string;
    return_location: string;
    places: Place[];
    options?: AddedOption[];
}

export default function Options({
                                    car,
                                    date_from,
                                    date_to,
                                    pickup_location,
                                    return_location,
                                    places = [],
                                    options = []
                                }: Props) {
    // State for selected options and their quantities
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
    const [total, setTotal] = useState(0);
    const [optionsTotal, setOptionsTotal] = useState(0);

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


    const getPlaceName = (placeId: string) => {
        const place = places.find(p => String(p.id) === String(placeId));
        return place ? place.title : 'Location inconnue';
    };

    const getPlacePrice = (placeId: string) => {
        const place = places.find(p => String(p.id) === String(placeId));
        return place ? Number(place.price) : 0;
    };
    // Toggle option selection
    const toggleOption = (optionId: number) => {
        setSelectedOptions(prev => {
            const newSelectedOptions = { ...prev };
            if (newSelectedOptions[optionId]) {
                delete newSelectedOptions[optionId];
            } else {
                newSelectedOptions[optionId] = 1;
            }
            return newSelectedOptions;
        });
    };

    const incrementQuantity = (optionId: number) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionId]: (prev[optionId] || 0) + 1
        }));
    };

    const decrementQuantity = (optionId: number) => {
        if (selectedOptions[optionId] <= 0) return; // Prevent going below 0
        setSelectedOptions(prev => ({
            ...prev,
            [optionId]: prev[optionId] - 1
        }));
    };

    useEffect(() => {
        // Base car price
        const basePrice = car.price_per_day * diffDays + getPlacePrice(pickup_location) + getPlacePrice(return_location);

        // Options price
        const optionsPrice = Object.entries(selectedOptions).reduce((acc, [id, quantity]) => {
            const option = options.find(opt => opt.id === Number(id));
            return acc + (option ? option.price_per_day * quantity * diffDays : 0);
        }, 0);

        setOptionsTotal(optionsPrice);
        setTotal(basePrice + optionsPrice);
    }, [selectedOptions, car, diffDays, options]);

    const handleNext = () => {
        const selectedOptionsList = Object.entries(selectedOptions).map(([id, quantity]) => ({
            id: Number(id),
            quantity
        }));

        window.location.href = `/reservation/checkout?car_id=${car.id}&date_from=${encodeURIComponent(date_from)}&date_to=${encodeURIComponent(date_to)}&pickup_location=${pickup_location}&return_location=${return_location}&options=${encodeURIComponent(JSON.stringify(selectedOptionsList))}`;
    };

    const handlePrevious = () => {
        window.history.back();
    };

    return (
        <FrontOfficeLayout>
            <Head title="Options supplémentaires" />

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
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
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

                    <h1 className="text-2xl font-bold text-center">Étape 2 - Options</h1>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Options supplémentaires
                    <div className="h-1 w-16 bg-blue-500 mx-auto mt-2"></div>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Options Column */}
                    <div className="lg:col-span-2 space-y-4">
                        {options.map((option) => (
                            <div key={option.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                                <div className="flex items-start">
                                    <div className="mr-4 text-blue-600">
                                        <div className="w-10 h-10 flex items-center justify-center">
                                            {option.title.toLowerCase().includes('gps') && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                            )}
                                            {option.title.toLowerCase().includes('siège') && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 14s-1.5-2-4-2-4 2-4 2M12 5v9" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {option.title.toLowerCase().includes('conducteur') && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            )}
                                            {option.title.toLowerCase().includes('wifi') && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                                                </svg>
                                            )}
                                            {!option.title.toLowerCase().includes('gps') &&
                                                !option.title.toLowerCase().includes('siège') &&
                                                !option.title.toLowerCase().includes('conducteur') &&
                                                !option.title.toLowerCase().includes('wifi') && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                    </svg>
                                                )}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">{option.title}</h3>
                                        <p className="text-sm text-gray-600">{option.description}</p>
                                    </div>
                                    <div className="ml-4 flex flex-col items-end">
                                        <div className="text-blue-600 font-bold">
                                            {option.price_per_day} <span className="text-sm">MAD/jour</span>
                                        </div>
                                        {option.title.toLowerCase().includes('siège') ? (
                                            <div className="flex items-center mt-2">
                                                <button
                                                    onClick={() => decrementQuantity(option.id)}
                                                    className="w-8 h-8 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300"
                                                >
                                                    <span className="text-lg">−</span>
                                                </button>
                                                <input
                                                    type="text"
                                                    className="w-10 h-8 text-center border-t border-b border-gray-200"
                                                    value={selectedOptions[option.id] || 0}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => incrementQuantity(option.id)}
                                                    className="w-8 h-8 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300"
                                                >
                                                    <span className="text-lg">+</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mt-2">
                                                <input
                                                    type="checkbox"
                                                    id={`option-${option.id}`}
                                                    checked={!!selectedOptions[option.id]}
                                                    onChange={() => toggleOption(option.id)}
                                                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                                                />
                                                <label htmlFor={`option-${option.id}`} className="ml-2 text-sm text-gray-600">
                                                    Sélectionnez
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 rounded-lg shadow-sm p-4 sticky top-4">
                            <h3 className="text-xl font-bold mb-4">Récapitulatif des coûts</h3>

                            <div className="mb-6">
                                <div className="flex justify-between text-lg font-bold text-blue-600">
                                    <span>TOTAL:</span>
                                    <span>{total} MAD</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <img
                                    src={car.image || `/api/placeholder/400/200?text=${car.brand}+${car.model}`}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-auto rounded"
                                />
                            </div>

                            {/* Pickup Info */}
                            <div className="mb-4">
                                <div className="flex items-center text-blue-600 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-semibold">Prise :</span>
                                </div>
                                <div className="pl-6">
                                    <p>{getPlaceName(pickup_location)}</p>
                                    <p className="text-sm text-gray-500">{formatDate(date_from)} @ {formatTime(date_from)}</p>
                                </div>
                            </div>

                            {/* Return Info */}
                            <div className="mb-4">
                                <div className="flex items-center text-blue-600 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="font-semibold">Retour :</span>
                                </div>
                                <div className="pl-6">
                                    <p>{getPlaceName(return_location)}</p>
                                    <p className="text-sm text-gray-500">{formatDate(date_to)} @ {formatTime(date_to)}</p>
                                </div>
                            </div>



                            {/* Options Info */}
                            <div className="mb-4">
                                <div className="flex items-center text-blue-600 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <span className="font-semibold">Options supplémentaires :</span>
                                </div>
                                <div className="pl-6">
                                    <p className="text-sm text-gray-500">TOTAL: {optionsTotal} MAD</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between max-w-6xl mx-auto mt-8">
                    <button
                        onClick={handlePrevious}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Précédent
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded flex items-center"
                    >
                        Suivant
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </FrontOfficeLayout>
    );
}
