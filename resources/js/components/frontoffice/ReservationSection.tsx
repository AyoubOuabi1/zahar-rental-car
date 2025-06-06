
import { motion } from "framer-motion"
import ReservationForm from "./ReservationForm"
import type { Place } from "@/types/Place"

interface Props {
    places: Place[]
}

export default function ReservationSection({ places }: Props) {
    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-white py-20 min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Enhanced Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://cristallinecar.com/assets/img/facts-section.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-blue-900/80"></div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 z-5">
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Reservation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-2 lg:order-1"
                    >
                        <ReservationForm places={places} />
                    </motion.div>

                    {/* Promotional Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="order-1 lg:order-2 text-center lg:text-left"
                    >
                        <div className="max-w-lg mx-auto lg:mx-0">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Obtenez 15% de réduction
                </span>
                                <br />
                                <span className="text-white">sur votre location !</span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="space-y-4 mb-8"
                            >
                                <p className="text-xl md:text-2xl text-gray-200 font-medium">Choisissez votre modèle aujourd'hui</p>
                                <p className="text-xl md:text-2xl text-blue-200 font-semibold">Louez la voiture de vos rêves.</p>
                            </motion.div>

                            {/* Feature highlights */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
                            >
                                {["🚗 Flotte premium", "💰 Meilleurs prix", "🛡️ Assurance incluse", "📞 Support 24/7"].map(
                                    (feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                                        >
                                            <span className="text-white font-medium">{feature}</span>
                                        </div>
                                    ),
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
