import { Head } from "@inertiajs/react"
import type { Car } from "@/types/Car"
import type { Place } from "@/types/Place"
import FrontOfficeLayout from "@/layouts/FrontOfficeLayout"
import { Calendar, MapPin, Users, Briefcase, Zap, Snowflake, ArrowRight, Settings } from "lucide-react"

interface Props {
    available_cars: Car[]
    date_from: string
    date_to: string
    pickup_location: string
    return_location: string
    places?: Place[]
}

export default function Booking({
                                    available_cars,
                                    date_from,
                                    date_to,
                                    pickup_location,
                                    return_location,
                                    places = [],
                                }: Props) {
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

    // Find place by ID
    const getPlaceName = (placeId: string) => {
        const place = places.find((p) => String(p.id) === String(placeId))
        return place ? place.title : "Location inconnue"
    }

    const getPlacePrice = (placeId: string) => {
        const place = places.find((p) => String(p.id) === String(placeId))
        return place ? place.price : "0"
    }

    const selectCar = (carId: number) => {
        window.location.href = `/reservation/options?car_id=${carId}&date_from=${encodeURIComponent(date_from)}&date_to=${encodeURIComponent(date_to)}&pickup_location=${pickup_location}&return_location=${return_location}`;
    };

    // Light backgrounds array for cards
    const lightBackgrounds = [
        "bg-gradient-to-br from-white to-gray-50",
        "bg-gradient-to-br from-white to-blue-50",
        "bg-gradient-to-br from-white to-slate-50",
        "bg-gradient-to-br from-gray-50 to-stone-50",
        "bg-gradient-to-br from-white to-zinc-50",
    ]

    return (
        <FrontOfficeLayout>
            <Head title="Sélection du véhicule" />

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
                            <div className="w-10 h-10 rounded-full bg-gray-600/40 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <span className="text-sm mt-2">Options</span>
                        </div>
                        <div className="h-1 bg-gray-600/40 flex-grow mx-2 rounded-full"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-600/40 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <span className="text-sm mt-2">Terminer</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center">Étape 1 - Sélection du véhicule</h1>
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Sélection du véhicule
                    <div className="h-1 w-24 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto mt-4 rounded-full"></div>
                </h2>

                {/* Reservation details */}
                <div className="max-w-5xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
                            <span className="text-gray-600 block mb-2">Prise et retour :</span>
                            <div className="flex items-center">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-2 rounded-full mr-3">
                                    <Calendar className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-semibold text-lg">{diffDays} Jours</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-gray-200">
                            <span className="text-gray-600 block mb-2">Départ:</span>
                            <div className="flex items-center mb-1">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-2 rounded-full mr-3">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-semibold">{getPlaceName(pickup_location)}</span>
                            </div>
                            <div className="flex items-center justify-between ml-10">
                <span className="text-sm text-gray-500">
                  {formatDate(date_from)} @ {formatTime(date_from)}
                </span>
                                <span className="text-sm font-medium text-blue-600">{getPlacePrice(pickup_location)} MAD</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl shadow-md border border-gray-200">
                            <span className="text-gray-600 block mb-2">Retour:</span>
                            <div className="flex items-center mb-1">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-2 rounded-full mr-3">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                                <span className="font-semibold">{getPlaceName(return_location)}</span>
                            </div>
                            <div className="flex items-center justify-between ml-10">
                <span className="text-sm text-gray-500">
                  {formatDate(date_to)} @ {formatTime(date_to)}
                </span>
                                <span className="text-sm font-medium text-blue-600">{getPlacePrice(return_location)} MAD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available cars count */}
                <div className="max-w-5xl mx-auto mb-8">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600 font-medium">
                            {available_cars.length} voitures disponibles pendant la période sélectionnée.
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <span className="mr-2">Modifier la recherche</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Car listings */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {available_cars.map((car, index) => {
                        // Select background based on index
                        const selectedBackground = lightBackgrounds[index % lightBackgrounds.length]

                        return (
                            <div
                                key={car.id}
                                className={`${selectedBackground} rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
                            >
                                {/* Car Category Badge */}
                                <div className="flex justify-between items-center p-4">
                  <span className="bg-gradient-to-r from-gray-600 to-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                    {car.category}
                  </span>
                                    {car.discount > 0 && (
                                        <span className="bg-gradient-to-r from-gray-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      -{car.discount}%
                    </span>
                                    )}
                                </div>

                                {/* Car Name */}
                                <div className="px-4 pb-4">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                                        {car.brand} {car.model}
                                    </h3>
                                    <p className="text-gray-500 text-sm">Ou Similaire</p>
                                </div>

                                {/* Car Image */}
                                <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-gray-50 group-hover:to-blue-50 transition-all duration-500">
                                    <img
                                        src={car.image || `/api/placeholder/300/150?text=${car.brand}+${car.model}`}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-500"
                                    />
                                    {/* Subtle overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Car Features */}
                                <div className="grid grid-cols-3 gap-2 p-4 border-t border-gray-200">
                                    {/* Fuel Type */}
                                    <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                        <div className="p-1.5 rounded-full bg-gray-100 text-blue-600 mb-1">
                                            <Zap className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs text-gray-700 font-medium">{car.fuel || "Essence"}</span>
                                    </div>

                                    {/* Luggage */}
                                    <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                        <div className="p-1.5 rounded-full bg-gray-100 text-gray-600 mb-1">
                                            <Briefcase className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs text-gray-700 font-medium">{car.luggage || "2"} Bagages</span>
                                    </div>

                                    {/* Passengers */}
                                    <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                        <div className="p-1.5 rounded-full bg-gray-100 text-blue-600 mb-1">
                                            <Users className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs text-gray-700 font-medium">{car.seats || "5"} Places</span>
                                    </div>
                                </div>

                                {/* Car Transmission & AC */}
                                <div className="grid grid-cols-2 gap-2 px-4 py-3 border-t border-gray-200">
                                    <div className="flex items-center">
                                        <div className="p-1.5 rounded-full bg-gray-100 text-gray-600 mr-2">
                                            <Settings className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs text-gray-700 font-medium">{car.transmission || "Automatique"}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="p-1.5 rounded-full bg-gray-100 text-blue-600 mr-2">
                                            <Snowflake className="h-4 w-4" />
                                        </div>
                                        <span className="text-xs text-gray-700 font-medium">A/C</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="px-4 py-4 text-center border-t border-gray-200">
                                    <div className="text-xs text-gray-600 mb-1">PRIX PAR JOUR</div>
                                    <div className="font-bold text-gray-900 text-2xl">{car.price_per_day || "250"} MAD</div>
                                    <div className="text-xs text-gray-500">par jour</div>
                                </div>

                                {/* Select Button */}
                                <div className="p-4 border-t border-gray-200">
                                    <button
                                        onClick={() => selectCar(car.id)}
                                        className="w-full bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                    >
                                        SÉLECTIONNEZ
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                    {available_cars.length === 0 && (
                        <div className="col-span-3 text-center py-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md border border-gray-200 p-8">
                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-4 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                <Calendar className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun véhicule disponible</h3>
                            <p className="text-gray-600 text-lg mb-6">
                                Aucun véhicule n'est disponible pour la période sélectionnée.
                            </p>
                            <button
                                onClick={() => window.history.back()}
                                className="bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Retour à la recherche
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </FrontOfficeLayout>
    )
}
