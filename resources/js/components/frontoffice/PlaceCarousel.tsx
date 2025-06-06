"use client"

import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import PlaceCard from "./PlaceCard"

interface Place {
    id: number
    title: string
    shortDescription?: string
    image_url: string
    showInHomePage: boolean
}

interface PlaceCarouselProps {
    places: Place[]
}

export default function PlaceCarousel({ places }: PlaceCarouselProps) {
    // Filter places to show only those with showInHomePage = true
    const filteredPlaces = places?.filter((place) => place.showInHomePage) || []

    if (!filteredPlaces || filteredPlaces.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50 mx-4 md:mx-8 lg:mx-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-extrabold text-gray-900 mb-10"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        🚗 Meilleurs Emplacements Nous Offrons 🚗
                    </motion.h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Une large gamme de lieux pour répondre à vos besoins en location de voiture.
                    </p>
                    {/* Decorative underline */}
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Carousel Section */}
                <div className="relative max-w-7xl mx-auto">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            slidesToScroll: 1,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {filteredPlaces.map((place, index) => (
                                <CarouselItem
                                    key={place.id}
                                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <PlaceCard
                                        id={place.id}
                                        name={place.title}
                                        image={place.image_url}
                                        shortDescription={place.shortDescription}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-600 to-blue-600 text-white border-none hover:from-gray-700 hover:to-blue-700 w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-lg" />
                        <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-600 to-blue-600 text-white border-none hover:from-gray-700 hover:to-blue-700 w-12 h-12 transition-all duration-300 hover:scale-110 hover:shadow-lg" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
