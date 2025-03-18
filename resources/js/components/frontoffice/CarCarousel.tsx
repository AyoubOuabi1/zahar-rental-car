import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CarCard from '@/components/frontoffice/CarCard';

export default function CarRentalCarousel() {
    const cars = [
        {
            id: 1,
            brand: 'HYUNDAI 1',
            model: '110',
            category: 'ÉCONOMIE',
            fuel: 'Diesel',
            transmission: 'Manuel',
            luggage: 3,
            seats: 5,
            ac: true,
            doors: 5,
            image: 'https://cristallinecar.com/storage//cars/9fwMmOOMDfW0mKPjcTRb8jTM00MoI8QYfSlEzeHw.jpg',
            discount: 15,
            pricePerDay: 50, // Add price per day
        },
        {
            id: 2,
            brand: 'DACIA 2',
            model: 'LOGAN ',
            category: 'ÉCONOMIE',
            fuel: 'Diesel',
            transmission: 'Manuel',
            luggage: 3,
            seats: 5,
            ac: true,
            doors: 5,
            image: 'https://cristallinecar.com/storage//cars/9fwMmOOMDfW0mKPjcTRb8jTM00MoI8QYfSlEzeHw.jpg',
            discount: 15,
            pricePerDay: 45, // Add price per day
        },
        {
            id: 3,
            brand: 'KIA 3',
            model: 'PICANTO',
            category: 'ÉCONOMIE',
            fuel: 'Petrol',
            transmission: 'Automatic',
            luggage: 2,
            seats: 4,
            ac: true,
            doors: 3,
            image: 'https://cristallinecar.com/storage//cars/9fwMmOOMDfW0mKPjcTRb8jTM00MoI8QYfSlEzeHw.jpg',
            discount: 10,
            pricePerDay: 40, // Add price per day
        },
        {
            id: 4,
            brand: 'KIA 4',
            model: 'PICANTO',
            category: 'ÉCONOMIE',
            fuel: 'Petrol',
            transmission: 'Automatic',
            luggage: 2,
            seats: 4,
            ac: true,
            doors: 3,
            image: 'https://cristallinecar.com/storage//cars/9fwMmOOMDfW0mKPjcTRb8jTM00MoI8QYfSlEzeHw.jpg',
            discount: 10,
            pricePerDay: 40, // Add price per day
        },
        {
            id: 5,
            brand: 'KIA 5',
            model: 'PICANTO',
            category: 'ÉCONOMIE',
            fuel: 'Petrol',
            transmission: 'Automatic',
            luggage: 2,
            seats: 4,
            ac: true,
            doors: 3,
            image: 'https://cristallinecar.com/storage//cars/9fwMmOOMDfW0mKPjcTRb8jTM00MoI8QYfSlEzeHw.jpg',
            discount: 10,
            pricePerDay: 40, // Add price per day
        },
        {
            id: 6,
            brand: 'KIA 6',
            model: 'PICANTO',
            category: 'ÉCONOMIE',
            fuel: 'Petrol',
            transmission: 'Automatic',
            luggage: 2,
            seats: 4,
            ac: true,
            doors: 3,
            image: 'https://cristallinecar.com/storage//cars/9fwMmOOMDfW0mKPjcTRb8jTM00MoI8QYfSlEzeHw.jpg',
            discount: 10,
            pricePerDay: 40, // Add price per day
        },
    ];
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-10 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                🚗 Voitures Disponibles 🚗
            </h2>

            {/* Carousel */}
            <div className="max-w-6xl mx-auto px-6"> {/* Added max-width and padding */}
                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-2">
                        {cars.map((car) => (
                            <CarouselItem key={car.id} className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3">
                                <CarCard {...car} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white border-none hover:bg-blue-700" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white border-none hover:bg-blue-700" />
                </Carousel>
            </div>
        </section>
    );
}
