import { motion } from "framer-motion";
import { Smile, Car, MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
    { icon: Smile, number: "82+", title: "Clients Satisfaits" },
    { icon: Car, number: "56+", title: "Nombre de Voitures" },
    { icon: MapPin, number: "4+", title: "Centres Auto" },
    { icon: Calendar, number: "12+", title: "Années d’Expérience" }
];

export default function ZaharInNumbers() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white text-center">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-gray-900 mb-10"
                style={{ fontFamily: "'Poppins', sans-serif" }}
            >
                🚗 Zahar Luxury Car en Chiffres 🚗
            </motion.h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-xl border border-blue-100 hover:scale-105 transition-transform duration-300"
                    >
                        <stat.icon className="text-blue-600 w-12 h-12 mb-3" />
                        <h3 className="text-4xl font-bold text-blue-600 mb-2">
                            {stat.number}
                        </h3>
                        <p className="text-gray-800 text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {stat.title}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
