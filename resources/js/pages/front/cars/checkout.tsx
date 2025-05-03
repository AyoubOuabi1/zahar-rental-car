import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import FrontOfficeLayout from '@/layouts/FrontOfficeLayout';
import { Car } from '@/types/Car';
import { Place } from '@/types/Place';

interface Props {
    car: Car;
    date_from: string;
    date_to: string;
    pickup_location: string;
    return_location: string;
    places: Place[];
    options?: { id: number; quantity: number }[];
}

export default function Checkout({
                                     car,
                                     date_from,
                                     date_to,
                                     pickup_location,
                                     return_location,
                                     places = [],
                                     options = []
                                 }: Props) {
    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        mobile_number: '',
        identity_or_passport_number: '',
        permit_license_id: '',
        address: '',
        flight_number: '',
        termsAccepted: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Le nom complet est requis';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.mobile_number.trim()) {
            newErrors.mobile_number = 'Le numéro de téléphone est requis';
        }

        if (!formData.identity_or_passport_number.trim()) {
            newErrors.identity_or_passport_number = 'Le numéro d\'identité ou de passeport est requis';
        }

        if (!formData.permit_license_id.trim()) {
            newErrors.permit_license_id = 'Le numéro de permis est requis';
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'Vous devez accepter les termes et conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        // Base car price
        const basePrice = car.price_per_day * diffDays;

        // Calculate options price
        const optPrice = options.reduce((acc, option) => {
            const optionItem = option as any; // Using any for simplicity here
            return acc + (optionItem.price_per_day ? optionItem.price_per_day * optionItem.quantity * diffDays : 0);
        }, 0);

        setOptionsTotal(optPrice);
        setTotal(basePrice + optPrice);
    }, [car, diffDays, options]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Prepare data for submission
            const reservationData = {
                car_id: car.id,
                pickup_place_id: pickup_location,
                dropoff_place_id: return_location,
                date_from: date_from,
                date_to: date_to,
                options: options,
                client: {
                    full_name: formData.full_name,
                    email: formData.email,
                    mobile_number: formData.mobile_number,
                    identity_or_passport_number: formData.identity_or_passport_number,
                    permit_license_id: formData.permit_license_id,
                    address: formData.address
                },
                flight_number: formData.flight_number
            };

            // Submit form using Inertia or fetch
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/reservation/store';

            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            const addInput = (name: string, value: string) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
            };

            // Add CSRF token
            addInput('_token', csrfToken);

            // Add reservation data
            addInput('car_id', car.id.toString());
            addInput('pickup_place_id', pickup_location);
            addInput('dropoff_place_id', return_location);
            addInput('date_from', date_from.split(' ')[0]);
            addInput('time_from', formatTime(date_from));
            addInput('date_to', date_to.split(' ')[0]);
            addInput('time_to', formatTime(date_to));
            addInput('flight_number', formData.flight_number);

            // Add client data
            addInput('full_name', formData.full_name);
            addInput('email', formData.email);
            addInput('mobile_number', formData.mobile_number);
            addInput('identity_or_passport_number', formData.identity_or_passport_number);
            addInput('permit_license_id', formData.permit_license_id);
            addInput('address', formData.address);

            // Add options
            if (options.length > 0) {
                addInput('added_options', JSON.stringify(options));
            }

            document.body.appendChild(form);
            form.submit();
        }
    };

    const handlePrevious = () => {
        window.history.back();
    };

    return (
        <FrontOfficeLayout>
            <Head title="Finaliser la réservation" />

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
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <span className="text-xs mt-1">Terminer</span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center">Étape 3 - Terminer</h1>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Inscription rapide en ligne
                    <div className="h-1 w-16 bg-blue-500 mx-auto mt-2"></div>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Form Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        placeholder="Nom complet"
                                        className={`w-full p-3 border ${errors.full_name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        type="tel"
                                        name="mobile_number"
                                        value={formData.mobile_number}
                                        onChange={handleInputChange}
                                        placeholder="Téléphone"
                                        className={`w-full p-3 border ${errors.mobile_number ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    {errors.mobile_number && <p className="text-red-500 text-xs mt-1">{errors.mobile_number}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Numéro de vol"
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <input
                                        type="text"
                                        name="permit_license_id"
                                        value={formData.permit_license_id}
                                        onChange={handleInputChange}
                                        placeholder="Numéro de permis"
                                        className={`w-full p-3 border ${errors.permit_license_id ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    {errors.permit_license_id && <p className="text-red-500 text-xs mt-1">{errors.permit_license_id}</p>}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="identity_or_passport_number"
                                        value={formData.identity_or_passport_number}
                                        onChange={handleInputChange}
                                        placeholder="Carte d'identité / Passeport"
                                        className={`w-full p-3 border ${errors.identity_or_passport_number ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    />
                                    {errors.identity_or_passport_number && <p className="text-red-500 text-xs mt-1">{errors.identity_or_passport_number}</p>}
                                </div>
                            </div>

                            <div className="mb-6 flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-700">J'accepte les <a href="#" className="text-blue-600 underline">Termes et conditions</a></label>
                                    {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Précédent
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded uppercase"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 rounded-lg shadow-sm p-4 sticky top-4">
                            <h3 className="text-xl font-bold mb-4">Récapitulatif des coûts</h3>

                            <div className="mb-4">
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
            </div>
        </FrontOfficeLayout>
    );
}
