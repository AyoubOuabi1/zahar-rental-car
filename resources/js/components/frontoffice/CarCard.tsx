import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DoorOpen, Luggage, Snowflake, Fuel, Users, Settings, Star, Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CarCardProps {
    id: number
    brand: string
    model: string
    category: string
    fuel: string
    transmission: string
    luggage: number
    seats: number
    ac: boolean
    doors: number
    image: string
    discount: number
    price_per_day: number
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
    const originalPrice = discount > 0 ? Math.round(price_per_day / (1 - discount / 100)) : null

    const lightBackgrounds = [
        "bg-gradient-to-br from-white to-gray-50",
        "bg-gradient-to-br from-white to-blue-50",
        "bg-gradient-to-br from-white to-slate-50",
        "bg-gradient-to-br from-gray-50 to-stone-50",
        "bg-gradient-to-br from-white to-zinc-50",
        "bg-gradient-to-br from-blue-50 to-gray-50",
    ]

    const selectedBackground = lightBackgrounds[id % lightBackgrounds.length]

    return (
        <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="h-full">
            <Card
                className={`${selectedBackground} overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative`}
            >
                {/* Discount Badge - Only show if discount > 0 */}
                {discount > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-gradient-to-r from-gray-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                        >
                            -{discount}%
                        </motion.div>
                    </div>
                )}

                {/* Favorite Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
                >
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors duration-300" />
                </motion.button>

                {/* Header with Category and Brand */}
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
            <span className="bg-gradient-to-r from-gray-600 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
              {category}
            </span>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 font-medium">4.8</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                        {brand} {model}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">Ou Similaire</p>
                </div>

                {/* Car Image with Enhanced Styling */}
                <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-gray-50 group-hover:to-blue-50 transition-all duration-500">
                    <motion.img
                        src={image || "/placeholder.svg?height=160&width=280"}
                        alt={`${brand} ${model}`}
                        className="w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-500"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Car Features with Enhanced Layout */}
                <CardContent className="p-6 flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: Users, label: `${seats} places`, color: "text-gray-600" },
                            { icon: DoorOpen, label: `${doors} portes`, color: "text-blue-600" },
                            { icon: Settings, label: transmission, color: "text-gray-600" },
                            { icon: Fuel, label: fuel, color: "text-blue-600" },
                            { icon: Luggage, label: `${luggage} bagages`, color: "text-gray-600" },
                            {
                                icon: Snowflake,
                                label: ac ? "Climatisation" : "Sans clim",
                                color: ac ? "text-blue-600" : "text-gray-400",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                            >
                                <div className={`p-1.5 rounded-full bg-gray-100 ${item.color}`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>

                {/* Enhanced Price Section */}
                <div className="p-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">{price_per_day} DH</span>
                                {discount > 0 && (
                                    <span className="text-sm text-gray-500 line-through">
                    {Math.round(price_per_day / (1 - discount / 100))} DH
                  </span>
                                )}
                            </div>
                            <span className="text-sm text-gray-600 font-medium">par jour</span>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500">À partir de</div>
                            <div className="text-lg font-semibold text-blue-600">{Math.round(price_per_day * 0.8)} DH</div>
                            <div className="text-xs text-gray-500">pour 7+ jours</div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Reserve Button */}
                <CardFooter className="p-6 pt-0">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold py-3 text-sm rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <span className="flex items-center justify-center gap-2">
                RÉSERVER MAINTENANT
                <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.span>
              </span>
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
