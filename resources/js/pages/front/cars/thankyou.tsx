import FrontOfficeLayout from '@/layouts/FrontOfficeLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { Car } from '@/types/Car';

interface ReservationDetails {
    id: number;
    date_from: string;
    date_to: string;
    car: Car;
    total_price: number;
}

export default function Thankyou() {
    const { props } = usePage<{ reservation: ReservationDetails }>();
    const reservation = props.reservation;

    return (
        <FrontOfficeLayout>
            <Head title="Merci pour votre réservation" />

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <svg
                                className="h-12 w-12 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Confirmation de réservation #{reservation.id}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Vehicle Details */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Détails du véhicule</h2>
                            <div className="mb-4">
                                <img
                                    src={reservation.car.image}
                                    alt={`${reservation.car.brand} ${reservation.car.model}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                            <dl className="grid grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm text-gray-500">Marque</dt>
                                    <dd className="font-medium">{reservation.car.brand}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Modèle</dt>
                                    <dd className="font-medium">{reservation.car.model}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Transmission</dt>
                                    <dd className="font-medium">{reservation.car.transmission}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Carburant</dt>
                                    <dd className="font-medium">{reservation.car.fuel}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Sièges</dt>
                                    <dd className="font-medium">{reservation.car.seats}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm text-gray-500">Climatisation</dt>
                                    <dd className="font-medium">{reservation.car.ac ? 'Oui' : 'Non'}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Reservation Summary */}
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Période de location</h2>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm text-gray-500">Prise en charge</dt>
                                        <dd className="font-medium">{reservation.date_from}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm text-gray-500">Retour</dt>
                                        <dd className="font-medium">{reservation.date_to}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Détails financiers</h2>
                                <dl className="space-y-3">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Prix journalier</dt>
                                        <dd className="font-medium">{reservation.car.price_per_day} MAD</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Jours de location</dt>
                                        <dd className="font-medium">
                                            {Math.ceil(
                                                (new Date(reservation.date_to).getTime() -
                                                    new Date(reservation.date_from).getTime()
                                                ) / (1000 * 3600 * 24))} jours
                                        </dd>
                                    </div>
                                    <div className="border-t pt-3 mt-3">
                                        <div className="flex justify-between font-semibold">
                                            <dt>Total</dt>
                                            <dd className="text-green-600">{reservation.total_price} MAD</dd>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 mb-6">
                            Un email de confirmation avec tous les détails a été envoyé à votre adresse email.
                        </p>

                        <a
                            href="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg
                                className="h-5 w-5 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Retour à l'accueil
                        </a>
                    </div>
                </div>
            </div>
        </FrontOfficeLayout>
    );
}
