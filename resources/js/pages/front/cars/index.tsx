import React from 'react';
import { Head } from '@inertiajs/react';
import { Car } from '@/types/Car';
import FrontOfficeLayout from '@/layouts/FrontOfficeLayout';
import CarCard from '@/components/frontoffice/CarCard';

interface Props {
    cars: Car[];
}

export default function index({ cars }: Props) {
    return (
        <FrontOfficeLayout>
            <Head title="Nos Voitures" />

            {/* Hero Banner */}
            <div className="relative bg-blue-900 text-white py-16">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://cristallinecar.com/assets/img/facts-section.jpg"
                        alt="Mountains background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Nos Voitures</h1>

                    <div className="flex items-center justify-center text-sm">
                        <a href="/" className="hover:underline">Accueil</a>
                        <span className="mx-2">/</span>
                        <span>Page</span>
                        <span className="mx-2">/</span>
                        <span className="text-blue-300">Nos Voitures</span>
                    </div>
                </div>
            </div>

            {/* Cars Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <CarCard key={car.id} {...car} />
                    ))}
                </div>
            </div>
        </FrontOfficeLayout>
    );
}
