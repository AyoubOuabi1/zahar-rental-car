import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { DoorOpen, Luggage, Snowflake, Fuel, Users, Settings } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface CarCardProps {
    id: number;
    brand: string;
    model: string;
    category: string;
    fuel: string;
    transmission: string;
    luggage: number;
    seats: number;
    ac: boolean;
    doors: number;
    image: string;
    discount: number;
    price_per_day: number;
}

export default function CarCard({
                                    id,
                                    brand,
                                    model,
                                    category,
                                    fuel,
                                    transmission,
                                    luggage,
                                    seats,
                                    ac,
                                    doors,
                                    image,
                                    discount,
                                    price_per_day,
                                }: CarCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Card  className="bg-white overflow-hidden border-2 border-blue-100 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col">
                {/* Header with Category and Brand */}
                <div className="p-4 pb-2">
                    <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full uppercase">
                        {category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 text-gray-800">
                        {brand} {model}
                    </h3>
                    <p className="text-sm text-gray-500">Ou Similaire</p>
                </div>

                {/* Car Image */}
                <div className="relative w-full h-32 overflow-hidden bg-white flex items-center justify-center">
                    <motion.img
                        src={image}
                        alt={`${brand} ${model}`}
                        className="w-full h-full object-contain"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                    />
                </div>

                {/* Car Features */}
                <CardContent className="p-4 flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: Fuel, label: fuel },
                            { icon: Luggage, label: `${luggage} bags` },
                            { icon: Users, label: `${seats} seats` },
                            { icon: DoorOpen, label: `${doors} doors` },
                            { icon: Settings, label: transmission },
                            { icon: Snowflake, label: ac ? 'A/C' : 'No A/C' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700">
                                <item.icon className="w-5 h-5 text-blue-600" />
                                <span className="text-xs">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>

                {/* Price Per Day */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">
                        {price_per_day} DHs / jour
                        {discount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                    </p>
                </div>

                {/* Reserve Button */}
                <CardFooter className="p-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 text-sm rounded-lg transition-all duration-300">
                        RÉSERVEZ
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
