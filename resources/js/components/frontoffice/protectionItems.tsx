import { motion } from "framer-motion"
import { ShieldCheck, MoveRight, Tag, Car, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"

const features = [
    { icon: ShieldCheck, text: "CDW et Protection contre le Vol" },
    { icon: MoveRight, text: "Kilométrage illimité" },
    { icon: Tag, text: "Des prix clairs, sans frais cachés." },
    { icon: Car, text: "Véhicule neuf" },
    { icon: CheckCircle2, text: "Réduit le risque personnel à zéro" },
]

// Light backgrounds array matching the other components
const lightBackgrounds = [
    "bg-gradient-to-br from-white to-gray-50",
    "bg-gradient-to-br from-white to-blue-50",
    "bg-gradient-to-br from-white to-slate-50",
    "bg-gradient-to-br from-gray-50 to-stone-50",
    "bg-gradient-to-br from-white to-zinc-50",
]

export default function PremiumProtection() {
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
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
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
                        🌟 Premium Protection 🌟
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
                    >
                        Une protection complète pour une tranquillité d'esprit absolue
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
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    {features.map((feature, index) => {
                        // Select background based on index
                        const selectedBackground = lightBackgrounds[index % lightBackgrounds.length]

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                    transition: { duration: 0.3 },
                                }}
                                className={`${selectedBackground} rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full group`}
                            >
                                <div className="p-6 flex flex-col items-center text-center h-full relative">
                                    {/* Background decoration */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Icon with enhanced styling */}
                                    <div className="mb-4 relative z-10">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full opacity-20 scale-150 animate-pulse"></div>
                                        <div className="relative bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                            <feature.icon className="text-white w-6 h-6" />
                                        </div>
                                    </div>

                                    {/* Decorative accent line */}
                                    <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full mb-4 relative z-10"></div>

                                    {/* Feature text */}
                                    <p
                                        className="text-gray-700 font-semibold leading-tight relative z-10 group-hover:text-gray-800 transition-colors duration-300 text-sm"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        {feature.text}
                                    </p>

                                    {/* Subtle glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Enhanced Call-to-Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Voyagez en toute sérénité
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Avec notre protection premium, concentrez-vous sur votre voyage pendant que nous nous occupons du reste.
                        </p>
                        <div className="flex justify-center items-center gap-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-gray-700 font-medium">Protection 24/7</span>
                            </div>
                            <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                                <span className="text-sm text-gray-700 font-medium">Assistance complète</span>
                            </div>
                            <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <Car className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-700 font-medium">Véhicules premium</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
