"use client"

import { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"
import { motion } from "framer-motion"
import FrontOfficeLayout from "@/layouts/FrontOfficeLayout"
import type { Car } from "@/types/Car"
import type { Place } from "@/types/Place"
import type { AddedOption } from "@/types/AddedOption"
import {
    Calendar,
    MapPin,
    Navigation,
    Baby,
    UserPlus,
    Wifi,
    Settings,
    Plus,
    Minus,
    Check,
    ArrowLeft,
    ArrowRight,
} from "lucide-react"

interface Props {
    car: Car
    date_from: string
    date_to: string
    pickup_location: string
    return_location: string
    places: Place[]
    options?: AddedOption[]
}

export default function Options({
                                    car,
                                    date_from,
                                    date_to,
                                    pickup_location,
                                    return_location,
                                    places = [],
                                    options = [],
                                }: Props) {
    // State for selected options and their quantities
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
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

    const getPlaceName = (placeId: string) => {
        const place = places.find((p) => String(p.id) === String(placeId))
        return place ? place.title : "Location inconnue"
    }

    const getPlacePrice = (placeId: string) => {
        const place = places.find((p) => String(p.id) === String(placeId))
        return place ? Number(place.price) : 0
    }

    // Get appropriate icon for option
    const getOptionIcon = (title: string) => {
        const lowerTitle = title.toLowerCase()
        if (lowerTitle.includes("gps")) return Navigation
        if (lowerTitle.includes("siège")) return Baby
        if (lowerTitle.includes("conducteur")) return UserPlus
        if (lowerTitle.includes("wifi")) return Wifi
        return Settings
    }

    // Toggle option selection
    const toggleOption = (optionId: number) => {
        setSelectedOptions((prev) => {
            const newSelectedOptions = { ...prev }
            if (newSelectedOptions[optionId]) {
                delete newSelectedOptions[optionId]
            } else {
                newSelectedOptions[optionId] = 1
            }
            return newSelectedOptions
        })
    }

    const incrementQuantity = (optionId: number) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionId]: (prev[optionId] || 0) + 1,
        }))
    }

    const decrementQuantity = (optionId: number) => {
        if (selectedOptions[optionId] <= 0) return // Prevent going below 0
        setSelectedOptions((prev) => ({
            ...prev,
            [optionId]: prev[optionId] - 1,
        }))
    }

    useEffect(() => {
        // Base car price
        const basePrice = car.price_per_day * diffDays + getPlacePrice(pickup_location) + getPlacePrice(return_location)

        // Options price
        const optionsPrice = Object.entries(selectedOptions).reduce((acc, [id, quantity]) => {
            const option = options.find((opt) => opt.id === Number(id))
            return acc + (option ? option.price_per_day * quantity * diffDays : 0)
        }, 0)

        setOptionsTotal(optionsPrice)
        setTotal(basePrice + optionsPrice)
    }, [selectedOptions, car, diffDays, options])

    const handleNext = () => {
        const selectedOptionsList = Object.entries(selectedOptions).map(([id, quantity]) => ({
            id: Number(id),
            quantity
        }));

        window.location.href = `/reservation/checkout?car_id=${car.id}&date_from=${encodeURIComponent(date_from)}&date_to=${encodeURIComponent(date_to)}&pickup_location=${pickup_location}&return_location=${return_location}&options=${encodeURIComponent(JSON.stringify(selectedOptionsList))}`;
    };

    const handlePrevious = () => {
        window.history.back()
    }

    // Light backgrounds array for options
    const lightBackgrounds = [
        "bg-gradient-to-br from-white to-gray-50",
        "bg-gradient-to-br from-white to-blue-50",
        "bg-gradient-to-br from-white to-slate-50",
        "bg-gradient-to-br from-gray-50 to-stone-50",
        "bg-gradient-to-br from-white to-zinc-50",
    ]

    return (
        <FrontOfficeLayout>
            <Head title="Options supplémentaires" />

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
                        <div className="h-1 bg-gray-600/40 flex-grow mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-600/40 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <span className="text-sm mt-2">Terminer</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center">Étape 2 - Options</h1>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Options supplémentaires
                    <div className="h-1 w-24 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto mt-4 rounded-full"></div>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Options Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {options.map((option, index) => {
                            const IconComponent = getOptionIcon(option.title)
                            const selectedBackground = lightBackgrounds[index % lightBackgrounds.length]
                            const isSelected = !!selectedOptions[option.id]

                            return (
                                <motion.div
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`${selectedBackground} rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 ${
                                        isSelected ? "ring-2 ring-blue-300" : ""
                                    }`}
                                >
                                    <div className="flex items-start">
                                        <div className="mr-6">
                                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-3 rounded-full shadow-lg">
                                                <IconComponent className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{option.description}</p>
                                        </div>
                                        <div className="ml-6 flex flex-col items-end">
                                            <div className="text-right mb-4">
                                                <div className="text-2xl font-bold text-gray-900">{option.price_per_day}</div>
                                                <div className="text-sm text-gray-600">MAD/jour</div>
                                            </div>
                                            {option.title.toLowerCase().includes("siège") ? (
                                                <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                                                    <button
                                                        onClick={() => decrementQuantity(option.id)}
                                                        className="w-10 h-10 bg-gradient-to-r from-gray-600 to-blue-600 text-white rounded-l-xl flex items-center justify-center hover:from-gray-700 hover:to-blue-700 transition-all duration-300"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="w-12 h-10 text-center border-0 bg-white text-gray-900 font-semibold"
                                                        value={selectedOptions[option.id] || 0}
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => incrementQuantity(option.id)}
                                                        className="w-10 h-10 bg-gradient-to-r from-gray-600 to-blue-600 text-white rounded-r-xl flex items-center justify-center hover:from-gray-700 hover:to-blue-700 transition-all duration-300"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`option-${option.id}`}
                                                        checked={isSelected}
                                                        onChange={() => toggleOption(option.id)}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor={`option-${option.id}`}
                                                        className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                            isSelected
                                                                ? "bg-gradient-to-r from-gray-600 to-blue-600 border-blue-600"
                                                                : "bg-white border-gray-300 hover:border-blue-400"
                                                        }`}
                                                    >
                                                        {isSelected && <Check className="h-6 w-6 text-white" />}
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}

                        {options.length === 0 && (
                            <div className="text-center py-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md border border-gray-200">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                    <Settings className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune option disponible</h3>
                                <p className="text-gray-600">Aucune option supplémentaire n'est disponible pour ce véhicule.</p>
                            </div>
                        )}
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-4"
                        >
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
                            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center text-gray-700 mb-2">
                                    <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1.5 rounded-full mr-3">
                                        <Settings className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="font-semibold">Options supplémentaires :</span>
                                </div>
                                <div className="ml-8">
                                    <p className="font-bold text-gray-900">{optionsTotal} MAD</p>
                                    <p className="text-sm text-gray-600">
                                        {Object.keys(selectedOptions).length} option(s) sélectionnée(s)
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between max-w-7xl mx-auto mt-12">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onClick={handlePrevious}
                        className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Précédent
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onClick={handleNext}
                        className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Suivant
                        <ArrowRight className="h-5 w-5 ml-2" />
                    </motion.button>
                </div>
            </div>
        </FrontOfficeLayout>
    )
}
