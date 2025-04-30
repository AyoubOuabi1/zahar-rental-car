import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CarCard from '@/components/frontoffice/CarCard';
import { Car } from '@/types/Car';
interface CarCarouselProps {
    cars: Car[];
}

export default function CarRentalCarousel({ cars }: CarCarouselProps) {
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
