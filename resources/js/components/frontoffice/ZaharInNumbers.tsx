import { motion } from "framer-motion"
import { Smile, Car, MapPin, Calendar } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
    { icon: Smile, number: "82+", title: "Clients Satisfaits" },
    { icon: Car, number: "56+", title: "Nombre de Voitures" },
    { icon: MapPin, number: "4+", title: "Centres Auto" },
    { icon: Calendar, number: "12+", title: "Années d'Expérience" },
]

// Light backgrounds array matching the other components
const lightBackgrounds = [
    "bg-gradient-to-br from-white to-gray-50",
    "bg-gradient-to-br from-white to-blue-50",
    "bg-gradient-to-br from-white to-slate-50",
    "bg-gradient-to-br from-gray-50 to-stone-50",
]

export default function ZaharInNumbers() {
    const [mounted, setMounted] = useState(false)
    const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0))

    useEffect(() => {
        setMounted(true)
    }, [])

    // Animate numbers when component mounts
    useEffect(() => {
        if (mounted) {
            stats.forEach((stat, index) => {
                const targetNumber = Number.parseInt(stat.number.replace("+", ""))
                let current = 0
                const increment = targetNumber / 50
                const timer = setInterval(() => {
                    current += increment
                    if (current >= targetNumber) {
                        current = targetNumber
                        clearInterval(timer)
                    }
                    setAnimatedNumbers((prev) => {
                        const newNumbers = [...prev]
                        newNumbers[index] = Math.floor(current)
                        return newNumbers
                    })
                }, 30)
            })
        }
    }, [mounted])

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    }

    // Item animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.8 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
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
                        🚗 Zahar Luxury Car en Chiffres 🚗
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto mb-6"
                    >
                        Des chiffres qui témoignent de notre excellence et de votre confiance
                    </motion.p>
                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto rounded-full"
                    ></motion.div>
                </div>

                {/* Stats Grid with Enhanced Styling */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={mounted ? "show" : "hidden"}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                >
                    {stats.map((stat, index) => {
                        // Select background based on index
                        const selectedBackground = lightBackgrounds[index % lightBackgrounds.length]

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -12,
                                    scale: 1.05,
                                    transition: { duration: 0.3 },
                                }}
                                className={`${selectedBackground} rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full group`}
                            >
                                <div className="p-8 flex flex-col items-center text-center h-full relative">
                                    {/* Background decoration */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Icon with enhanced styling */}
                                    <div className="mb-6 relative z-10">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full opacity-20 scale-150 animate-pulse"></div>
                                        <div className="relative bg-gradient-to-r from-gray-600 to-blue-600 p-4 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                            <stat.icon className="text-white w-8 h-8" />
                                        </div>
                                    </div>

                                    {/* Animated number with enhanced styling */}
                                    <motion.h3
                                        className="text-5xl font-bold text-gray-900 mb-3 relative z-10"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                    <span className="bg-gradient-to-r from-gray-700 to-blue-700 bg-clip-text text-transparent">
                      {animatedNumbers[index]}+
                    </span>
                                    </motion.h3>

                                    {/* Decorative accent line */}
                                    <div className="w-16 h-1 bg-gradient-to-r from-gray-300 to-blue-300 rounded-full mb-4 relative z-10"></div>

                                    {/* Stat title */}
                                    <p
                                        className="text-gray-700 text-lg font-semibold leading-tight relative z-10 group-hover:text-gray-800 transition-colors duration-300"
                                        style={{ fontFamily: "'Poppins', sans-serif" }}
                                    >
                                        {stat.title}
                                    </p>

                                    {/* Subtle glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-400/10 to-blue-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Additional decorative element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex justify-center mt-16"
                >
                    <div className="flex items-center gap-2 bg-gradient-to-r from-gray-100 to-blue-100 px-6 py-3 rounded-full shadow-md">
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-600 font-medium text-sm">Et ce n'est que le début...</span>
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-pulse"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
