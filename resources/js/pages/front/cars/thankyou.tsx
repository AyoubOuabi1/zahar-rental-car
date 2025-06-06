import FrontOfficeLayout from "@/layouts/FrontOfficeLayout"
import { Head, usePage } from "@inertiajs/react"
import { motion } from "framer-motion"
import type { Car } from "@/types/Car"
import {
    CheckCircle,
    CarIcon,
    Calendar,
    CreditCard,
    Mail,
    Home,
    Settings,
    Fuel,
    Users,
    Snowflake,
    Clock,
} from "lucide-react"

interface ReservationDetails {
    id: number
    date_from: string
    date_to: string
    car: Car
    total_price: number
}

export default function Thankyou() {
    const { props } = usePage<{ reservation: ReservationDetails }>()
    const reservation = props.reservation

    // Calculate rental days
    const startDate = new Date(reservation.date_from)
    const endDate = new Date(reservation.date_to)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const rentalDays = Math.ceil(diffTime / (1000 * 3600 * 24))

    // Format dates for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <FrontOfficeLayout>
            <Head title="Merci pour votre réservation" />

            {/* Background with decorative elements */}
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-6xl w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                    >
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-gray-600 to-blue-600 text-white p-8 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mx-auto h-24 w-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="h-14 w-14 text-white" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-4xl font-bold mb-4"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Réservation Confirmée !
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-xl text-white/90"
                            >
                                Numéro de réservation: <span className="font-bold">#{reservation.id}</span>
                            </motion.p>
                        </div>

                        {/* Content Section */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Vehicle Details */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200"
                                >
                                    <div className="flex items-center mb-6">
                                        <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full mr-4">
                                            <CarIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                            Votre Véhicule
                                        </h2>
                                    </div>

                                    <div className="mb-6">
                                        <img
                                            src={
                                                reservation.car.image ||
                                                `/api/placeholder/400/200?text=${reservation.car.brand}+${reservation.car.model}`
                                            }
                                            alt={`${reservation.car.brand} ${reservation.car.model}`}
                                            className="w-full h-48 object-contain bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md"
                                        />
                                    </div>

                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {reservation.car.brand} {reservation.car.model}
                                        </h3>
                                        <p className="text-gray-600">Ou véhicule similaire</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: Settings, label: "Transmission", value: reservation.car.transmission },
                                            { icon: Fuel, label: "Carburant", value: reservation.car.fuel },
                                            { icon: Users, label: "Sièges", value: `${reservation.car.seats} places` },
                                            { icon: Snowflake, label: "Climatisation", value: reservation.car.ac ? "Oui" : "Non" },
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
                                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-2 rounded-full mr-3">
                                                    <item.icon className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">{item.label}</p>
                                                    <p className="font-semibold text-gray-900">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Reservation Summary */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 1 }}
                                    className="space-y-6"
                                >
                                    {/* Rental Period */}
                                    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full mr-4">
                                                <Calendar className="h-6 w-6 text-white" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                Période de Location
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-white rounded-xl border border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">Prise en charge</p>
                                                <p className="font-bold text-gray-900">{formatDate(reservation.date_from)}</p>
                                                <p className="text-sm text-gray-600">{formatTime(reservation.date_from)}</p>
                                            </div>
                                            <div className="p-4 bg-white rounded-xl border border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">Retour</p>
                                                <p className="font-bold text-gray-900">{formatDate(reservation.date_to)}</p>
                                                <p className="text-sm text-gray-600">{formatTime(reservation.date_to)}</p>
                                            </div>
                                            <div className="flex items-center justify-center p-3 bg-blue-100 rounded-xl">
                                                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                                                <span className="font-semibold text-blue-800">{rentalDays} jours de location</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Financial Details */}
                                    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full mr-4">
                                                <CreditCard className="h-6 w-6 text-white" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                Détails Financiers
                                            </h2>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                                <span className="text-gray-600">Prix journalier</span>
                                                <span className="font-semibold text-gray-900">{reservation.car.price_per_day} MAD</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                                <span className="text-gray-600">Nombre de jours</span>
                                                <span className="font-semibold text-gray-900">{rentalDays} jours</span>
                                            </div>
                                            <div className="border-t-2 border-gray-200 pt-3">
                                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-600 to-blue-600 rounded-xl text-white">
                                                    <span className="text-lg font-semibold">Total</span>
                                                    <span className="text-2xl font-bold">{reservation.total_price} MAD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Email Confirmation Notice */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full mr-4">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        Confirmation par Email
                                    </h3>
                                </div>
                                <p className="text-gray-700 text-center leading-relaxed">
                                    Un email de confirmation avec tous les détails de votre réservation a été envoyé à votre adresse
                                    email. Veuillez vérifier votre boîte de réception et vos spams.
                                </p>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className="text-center space-y-4"
                            >
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Home className="h-5 w-5 mr-3" />
                                    Retour à l'accueil
                                </motion.a>

                                <p className="text-gray-600 text-sm">
                                    Besoin d'aide ? Contactez notre service client au{" "}
                                    <span className="font-semibold text-blue-600">+212 123 456 789</span>
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </FrontOfficeLayout>
    )
}
