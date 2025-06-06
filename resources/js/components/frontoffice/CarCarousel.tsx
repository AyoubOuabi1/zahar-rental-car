import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CarCard from "./CarCard"
import type { Car } from "@/types/Car"

interface CarCarouselProps {
    cars: Car[]
}

export default function CarRentalCarousel({ cars }: CarCarouselProps) {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-10 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="relative z-10">
                {/* Enhanced Title Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        🚗 Voitures Disponibles 🚗
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
                    >
                        Découvrez notre flotte de véhicules premium pour tous vos besoins de déplacement
                    </motion.p>
                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto rounded-full"
                    ></motion.div>
                </div>

                {/* Enhanced Carousel */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                            skipSnaps: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {cars.map((car, index) => (
                                <CarouselItem key={car.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.1,
                                            ease: "easeOut",
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <CarCard {...car} />
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Enhanced Navigation Buttons */}
                        <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white border-none hover:from-blue-700 hover:to-blue-800 w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
                        <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white border-none hover:from-blue-700 hover:to-blue-800 w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
