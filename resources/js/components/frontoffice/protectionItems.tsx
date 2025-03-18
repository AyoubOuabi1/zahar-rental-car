import { motion } from "framer-motion";
import { ShieldCheck, MoveRight, Tag, Car, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
    { icon: ShieldCheck, text: "CDW et Protection contre le Vol" },
    { icon: MoveRight, text: "Kilométrage illimité" },
    { icon: Tag, text: "Des prix clairs, sans frais cachés." },
    { icon: Car, text: "Véhicule neuf" },
    { icon: CheckCircle2, text: "Réduit le risque personnel à zéro" }
];

export default function PremiumProtection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-16  bg-blue-50 text-center">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-extrabold text-gray-900 mb-10"
                style={{ fontFamily: "'Poppins', sans-serif" }}
            >
                🌟 Premium Protection 🌟
            </motion.h2>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-xl border border-blue-100 hover:scale-105 transition-transform duration-300"
                    >
                        <feature.icon className="text-blue-600 w-12 h-12 mb-3" />
                        <p className="text-gray-800 text-lg font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            {feature.text}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
