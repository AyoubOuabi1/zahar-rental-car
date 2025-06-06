import type React from "react"

import { useState, useEffect } from "react"
import { Head, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import FrontOfficeLayout from "@/layouts/FrontOfficeLayout"
import type { Car } from "@/types/Car"
import type { Place } from "@/types/Place"
import {
    Calendar,
    MapPin,
    Settings,
    ArrowLeft,
    CheckCircle,
    CreditCard,
    User,
    Mail,
    Phone,
    Plane,
    FileText,
    Home,
} from "lucide-react"

interface Props {
    car: Car
    date_from: string
    date_to: string
    pickup_location: string
    return_location: string
    places: Place[]
    options?: { id: number; quantity: number; price_per_day?: number }[]
}

export default function Checkout({
                                     car,
                                     date_from,
                                     date_to,
                                     pickup_location,
                                     return_location,
                                     places = [],
                                     options = [],
                                 }: Props) {
    // Form state
    const { data, setData, post, processing } = useForm({
        full_name: "",
        email: "",
        mobile_number: "",
        identity_or_passport_number: "",
        permit_license_id: "",
        address: "",
        flight_number: "",
        termsAccepted: false,
        car_id: car.id,
        pickup_place_id: pickup_location,
        dropoff_place_id: return_location,
        date_from: date_from,
        date_to: date_to,
        options: options,
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [total, setTotal] = useState(0)
    const [optionsTotal, setOptionsTotal] = useState(0)

    // Calculate number of days between the dates
    const startDate = new Date(date_from)
    const endDate = new Date(date_to)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1

    // Format dates for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toISOString().split("T")[0].replace(/-/g, "-")
    }

    // Format time for display
    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toTimeString().slice(0, 5)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setData(name as any, type === "checkbox" ? checked : value)
    }

    const getPlaceName = (placeId: string) => {
        const place = places.find((p) => String(p.id) === String(placeId))
        return place ? place.title : "Location inconnue"
    }

    const getPlacePrice = (placeId: string) => {
        const place = places.find((p) => String(p.id) === String(placeId))
        return place ? Number(place.price) : 0
    }

    useEffect(() => {
        // Base car price
        const basePrice = car.price_per_day * diffDays + getPlacePrice(pickup_location) + getPlacePrice(return_location)

        // Calculate options price
        const optPrice = options.reduce((acc, option) => {
            const optionItem = option as any
            return acc + (optionItem.price_per_day ? optionItem.price_per_day * optionItem.quantity * diffDays : 0)
        }, 0)
        setOptionsTotal(optPrice)
        setTotal(basePrice + optPrice)
    }, [car, diffDays, options])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!data.full_name) newErrors.full_name = "Le nom complet est requis"
        if (!data.email) newErrors.email = "L'email est requis"
        if (!data.mobile_number) newErrors.mobile_number = "Le numéro de téléphone est requis"
        if (!data.identity_or_passport_number)
            newErrors.identity_or_passport_number = "Le numéro d'identité ou de passeport est requis"
        if (!data.permit_license_id) newErrors.permit_license_id = "Le numéro de permis est requis"
        if (!data.termsAccepted) newErrors.termsAccepted = "Vous devez accepter les termes et conditions"
        return newErrors
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length) return setErrors(newErrors);

        post(route('reservation.store'), {
            onSuccess: () => {
                window.location.href = route('reservation.thankyou');
            },
            onError: (errors) => {
                setErrors(errors);
            },
            // Add this to handle JSON responses
            preserveScroll: true,
            preserveState: true,
        });
    };


    const handlePrevious = () => {
        window.history.back()
    }

    // Input field styling helper
    const getInputClass = (fieldName: string) => {
        return `w-full p-4 border-2 ${
            errors[fieldName]
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-500 hover:border-gray-300"
        } rounded-xl bg-white text-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200`
    }

    return (
        <FrontOfficeLayout>
            <Head title="Finaliser la réservation" />

            {/* Hero section with progress steps */}
            <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-white py-16">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="https://cristallinecar.com/assets/img/facts-section.jpg"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/70 to-blue-900/80"></div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 z-5">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Progress steps */}
                    <div className="flex justify-center items-center max-w-3xl mx-auto mb-10">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-blue-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <span className="text-sm mt-2 font-medium">Véhicules</span>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-gray-600 to-blue-600 flex-grow mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-blue-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <span className="text-sm mt-2 font-medium">Options</span>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-gray-600 to-blue-600 flex-grow mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-blue-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <span className="text-sm mt-2 font-medium">Terminer</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center">Étape 3 - Terminer</h1>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto py-12 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-8"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Inscription rapide en ligne
                    <div className="h-1 w-24 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto mt-4 rounded-full"></div>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center text-gray-700 font-semibold">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={data.full_name}
                                            onChange={handleInputChange}
                                            placeholder="Entrez votre nom complet"
                                            className={getInputClass("full_name")}
                                        />
                                        {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center text-gray-700 font-semibold">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                                <Mail className="w-4 h-4 text-white" />
                                            </div>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleInputChange}
                                            placeholder="Entrez votre email"
                                            className={getInputClass("email")}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center text-gray-700 font-semibold">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                                <Phone className="w-4 h-4 text-white" />
                                            </div>
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile_number"
                                            value={data.mobile_number}
                                            onChange={handleInputChange}
                                            placeholder="Entrez votre numéro de téléphone"
                                            className={getInputClass("mobile_number")}
                                        />
                                        {errors.mobile_number && <p className="text-red-500 text-sm mt-1">{errors.mobile_number}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center text-gray-700 font-semibold">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                                <Plane className="w-4 h-4 text-white" />
                                            </div>
                                            Numéro de vol (optionnel)
                                        </label>
                                        <input
                                            type="text"
                                            name="flight_number"
                                            value={data.flight_number}
                                            onChange={handleInputChange}
                                            placeholder="Entrez votre numéro de vol"
                                            className={getInputClass("")}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center text-gray-700 font-semibold">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                                <FileText className="w-4 h-4 text-white" />
                                            </div>
                                            Numéro de permis
                                        </label>
                                        <input
                                            type="text"
                                            name="permit_license_id"
                                            value={data.permit_license_id}
                                            onChange={handleInputChange}
                                            placeholder="Entrez votre numéro de permis"
                                            className={getInputClass("permit_license_id")}
                                        />
                                        {errors.permit_license_id && (
                                            <p className="text-red-500 text-sm mt-1">{errors.permit_license_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center text-gray-700 font-semibold">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                                <FileText className="w-4 h-4 text-white" />
                                            </div>
                                            Carte d'identité / Passeport
                                        </label>
                                        <input
                                            type="text"
                                            name="identity_or_passport_number"
                                            value={data.identity_or_passport_number}
                                            onChange={handleInputChange}
                                            placeholder="Entrez votre numéro d'identité ou de passeport"
                                            className={getInputClass("identity_or_passport_number")}
                                        />
                                        {errors.identity_or_passport_number && (
                                            <p className="text-red-500 text-sm mt-1">{errors.identity_or_passport_number}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="flex items-center text-gray-700 font-semibold">
                                        <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                            <Home className="w-4 h-4 text-white" />
                                        </div>
                                        Adresse
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        onChange={handleInputChange}
                                        placeholder="Entrez votre adresse"
                                        className={getInputClass("address")}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-6 mt-0.5">
                                            <input
                                                id="terms"
                                                type="checkbox"
                                                name="termsAccepted"
                                                checked={data.termsAccepted}
                                                onChange={handleInputChange}
                                                className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                                                    errors.termsAccepted ? "border-red-500" : ""
                                                }`}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <label htmlFor="terms" className="text-gray-700 font-medium">
                                                J'accepte les{" "}
                                                <a href="#" className="text-blue-600 underline hover:text-blue-800">
                                                    Termes et conditions
                                                </a>
                                            </label>
                                            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={handlePrevious}
                                        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <ArrowLeft className="h-5 w-5 mr-2" />
                                        Précédent
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Traitement...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                Confirmer
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Summary Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Récapitulatif des coûts
                            </h3>

                            <div className="mb-6 p-4 bg-gradient-to-r from-gray-600 to-blue-600 rounded-xl text-white">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">TOTAL:</span>
                                    <span className="text-2xl font-bold">{total} MAD</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <img
                                    src={car.image || `/api/placeholder/400/200?text=${car.brand}+${car.model}`}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-auto rounded-xl shadow-md"
                                />
                                <div className="mt-3 text-center">
                                    <h4 className="font-bold text-gray-900">
                                        {car.brand} {car.model}
                                    </h4>
                                    <p className="text-sm text-gray-600">{diffDays} jours de location</p>
                                </div>
                            </div>

                            {/* Pickup Info */}
                            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center text-gray-700 mb-2">
                                    <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                        <Calendar className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-semibold">Prise :</span>
                                </div>
                                <div className="ml-8">
                                    <p className="font-medium text-gray-900">{getPlaceName(pickup_location)}</p>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(date_from)} @ {formatTime(date_from)}
                                    </p>
                                </div>
                            </div>

                            {/* Return Info */}
                            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center text-gray-700 mb-2">
                                    <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                        <MapPin className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-semibold">Retour :</span>
                                </div>
                                <div className="ml-8">
                                    <p className="font-medium text-gray-900">{getPlaceName(return_location)}</p>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(date_to)} @ {formatTime(date_to)}
                                    </p>
                                </div>
                            </div>

                            {/* Options Info */}
                            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center text-gray-700 mb-2">
                                    <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                        <Settings className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-semibold">Options supplémentaires :</span>
                                </div>
                                <div className="ml-8">
                                    <p className="font-bold text-gray-900">{optionsTotal} MAD</p>
                                    <p className="text-sm text-gray-600">{options.length} option(s) sélectionnée(s)</p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center text-blue-700 mb-2">
                                    <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                        <CreditCard className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-semibold">Paiement à l'arrivée</span>
                                </div>
                                <p className="text-sm text-gray-600 ml-8">Le paiement sera effectué lors de la prise du véhicule.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </FrontOfficeLayout>
    )
}
