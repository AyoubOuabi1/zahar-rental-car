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
            <div className="container mx-auto px-6 py-16 max-w-6xl">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    🚗 Voitures Disponibles 🚗
                </h2>
                <div className="flex flex-wrap -ml-2">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 mb-4"
                        >
                            <CarCard {...car} />
                        </div>
                    ))}
                </div>
            </div>
        </FrontOfficeLayout>
    );
}
