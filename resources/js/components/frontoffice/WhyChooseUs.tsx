import { motion } from "framer-motion"
import { Car, Headphones, Shield, HandCoins, MapPin, CalendarCheck } from "lucide-react"
import { useEffect, useState } from "react"

const features = [
    {
        icon: Car,
        text: "Flotte Premium",
        description: "Découvrez notre gamme de véhicules, des compacts aux SUV et voitures de luxe.",
    },
    {
        icon: Headphones,
        text: "Support 24/7",
        description: "Notre équipe est disponible 24x/24 pour répondre à vos questions.",
    },
    {
        icon: HandCoins,
        text: "Meilleur Prix",
        description: "Nous offrons les meilleurs prix du marché, sans frais cachés.",
    },
    {
        icon: Shield,
        text: "Assurance Incluse",
        description: "Tous nos véhicules sont assurés, pour votre tranquillité d'esprit.",
    },
    {
        icon: MapPin,
        text: "De Ville en Ville",
        description: "Nous offrons des transferts entre villes pour voyager confortablement.",
    },
    {
        icon: CalendarCheck,
        text: "Réservation Flexible",
        description: "Modifier votre réservation à tout moment, facilement et sans contrainte.",
    },
]

// Light backgrounds array matching the PlaceCard component
const lightBackgrounds = [
    "bg-gradient-to-br from-white to-gray-50",
    "bg-gradient-to-br from-white to-blue-50",
    "bg-gradient-to-br from-white to-slate-50",
    "bg-gradient-to-br from-gray-50 to-stone-50",
    "bg-gradient-to-br from-white to-zinc-50",
    "bg-gradient-to-br from-blue-50 to-gray-50",
]

export default function WhyChooseUs() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    // Item animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

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
                        🚗 Pourquoi Choisir Nous ? 🚗
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
                    >
                        Des services exceptionnels pour une expérience de location sans souci
                    </motion.p>
                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto rounded-full"
                    ></motion.div>
                </div>

                {/* Features Grid with Enhanced Styling */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={mounted ? "show" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    {features.map((feature, index) => {
                        // Select background based on index
                        const selectedBackground = lightBackgrounds[index % lightBackgrounds.length]

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={`${selectedBackground} rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full`}
                            >
                                <div className="p-8 flex flex-col items-center text-center h-full">
                                    {/* Icon with enhanced styling */}
                                    <div className="mb-6 relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full opacity-20 scale-150 animate-pulse"></div>
                                        <div className="relative bg-gradient-to-r from-gray-600 to-blue-600 p-4 rounded-full shadow-lg">
                                            <feature.icon className="text-white w-8 h-8" />
                                        </div>
                                    </div>

                                    {/* Feature title with enhanced styling */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        {feature.text}
                                    </h3>

                                    {/* Decorative accent line */}
                                    <div className="w-12 h-1 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full mb-4"></div>

                                    {/* Feature description */}
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
