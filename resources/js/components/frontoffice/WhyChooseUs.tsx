import { motion } from "framer-motion";
import { Car, Headphones, Shield, HandCoins, MapPin, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
    { icon: Car, text: "Flotte Premium", description: "Découvrez notre gamme de véhicules, des compacts aux SUV et voitures de luxe." },
    { icon: Headphones, text: "Support 24/7", description: "Notre équipe est disponible 24x/24 pour répondre à vos questions." },
    { icon: HandCoins, text: "Meilleur Prix", description: "Nous offrons les meilleurs prix du marché, sans frais cachés." },
    { icon: Shield, text: "Assurance Incluse", description: "Tous nos véhicules sont assurés, pour votre tranquillité d’esprit." },
    { icon: MapPin, text: "De Ville en Ville", description: "Nous offrons des transferts entre villes pour voyager confortablement." },
    { icon: CalendarCheck, text: "Réservation Flexible", description: "Modifier votre réservation à tout moment, facilement et sans contrainte." }
];

export default function WhyChooseUs() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-16 bg-blue-50 text-center">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-gray-900 mb-10"
                style={{ fontFamily: "'Poppins', sans-serif" }}
            >
                🚗 Pourquoi Choisir Nous ? 🚗
            </motion.h2>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-xl border border-blue-100 hover:scale-105 transition-transform duration-300"
                    >
                        <feature.icon className="text-blue-600 w-12 h-12 mb-3" />
                        <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {feature.text}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
