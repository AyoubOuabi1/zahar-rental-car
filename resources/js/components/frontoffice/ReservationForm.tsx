import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Check, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"
import type { Place } from "@/types/Place"

interface ReservationFormProps {
    places: Place[]
}

export default function ReservationForm({ places }: ReservationFormProps) {
    const [isDifferentReturn, setIsDifferentReturn] = useState(false)
    const [pickupLocation, setPickupLocation] = useState("")
    const [returnLocation, setReturnLocation] = useState("")
    const [pickupDate, setPickupDate] = useState("")
    const [pickupTime, setPickupTime] = useState("10:00")
    const [returnDate, setReturnDate] = useState("")
    const [returnTime, setReturnTime] = useState("10:00")

    // Initialize with default form
    const { data, setData, post, processing, errors } = useForm({
        pickup_location: "",
        return_location: "",
        date_from: "",
        date_to: "",
    })

    // Update return location when pickup changes (if same location)
    useEffect(() => {
        if (!isDifferentReturn) {
            setReturnLocation(pickupLocation)
        }
    }, [pickupLocation, isDifferentReturn])

    // Update form data when inputs change
    useEffect(() => {
        // Format date and time for backend
        const formatDateTime = (date: string, time: string) => {
            if (!date) return ""
            return `${date} ${time}`
        }

        setData({
            pickup_location: pickupLocation,
            return_location: isDifferentReturn ? returnLocation : pickupLocation,
            date_from: formatDateTime(pickupDate, pickupTime),
            date_to: formatDateTime(returnDate, returnTime),
        })
    }, [pickupLocation, returnLocation, pickupDate, pickupTime, returnDate, returnTime, isDifferentReturn])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form data
        if (!data.pickup_location || !data.return_location || !data.date_from || !data.date_to) {
            toast.error("Veuillez remplir tous les champs obligatoires")
            return
        }

        // Submit form to backend
        post(route("booking-cars"), {
            onSuccess: () => {
                toast.success("Recherche de véhicules disponibles...")
            },
            onError: (errors) => {
                toast.error("Une erreur est survenue lors de la recherche")
                console.error(errors)
            },
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-2xl border border-gray-200 max-w-2xl mx-auto backdrop-blur-sm"
        >
            {/* Header */}
            <div className="text-center mb-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl font-extrabold text-gray-900 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    🚗 Réservez une Voiture 🚗
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-gray-600"
                >
                    Trouvez le véhicule parfait pour votre voyage
                </motion.p>
                <div className="w-12 h-1 bg-gradient-to-r from-gray-300 to-blue-300 mx-auto mt-4 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pickup Location */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-2"
                >
                    <Label htmlFor="pickup-location" className="flex items-center text-gray-700 font-semibold">
                        <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1 rounded-full mr-3">
                            <MapPin className="w-3.5 h-3.5 text-white" />
                        </div>
                        Lieu de prise en charge
                    </Label>
                    <Select value={pickupLocation} onValueChange={setPickupLocation}>
                        <SelectTrigger className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 hover:border-blue-300 transition-colors duration-300 focus:border-blue-500">
                            <SelectValue placeholder="Sélectionnez un lieu" />
                        </SelectTrigger>
                        <SelectContent>
                            {places.map((place) => (
                                <SelectItem key={place.id} value={String(place.id)}>
                                    {place.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.pickup_location && <p className="text-red-500 text-sm">{errors.pickup_location}</p>}
                </motion.div>

                {/* Checkbox for different return location */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                    <Checkbox
                        id="different-return"
                        checked={isDifferentReturn}
                        onCheckedChange={(checked) => setIsDifferentReturn(!!checked)}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-gray-600 data-[state=checked]:to-blue-600"
                    />
                    <Label htmlFor="different-return" className="text-gray-700 font-medium cursor-pointer">
                        Lieu de retour différent
                    </Label>
                </motion.div>

                {/* Return Location (conditional) */}
                {isDifferentReturn && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                    >
                        <Label htmlFor="return-location" className="flex items-center text-gray-700 font-semibold">
                            <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1 rounded-full mr-3">
                                <MapPin className="w-3.5 h-3.5 text-white" />
                            </div>
                            Lieu de retour
                        </Label>
                        <Select value={returnLocation} onValueChange={setReturnLocation}>
                            <SelectTrigger className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-700 hover:border-blue-300 transition-colors duration-300 focus:border-blue-500">
                                <SelectValue placeholder="Sélectionnez un lieu" />
                            </SelectTrigger>
                            <SelectContent>
                                {places.map((place) => (
                                    <SelectItem key={place.id} value={String(place.id)}>
                                        {place.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.return_location && <p className="text-red-500 text-sm">{errors.return_location}</p>}
                    </motion.div>
                )}

                {/* Date and Time Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pickup Date/Time */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="space-y-3"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="pickup-date" className="flex items-center text-gray-700 font-semibold">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1 rounded-full mr-3">
                                    <Calendar className="w-3.5 h-3.5 text-white" />
                                </div>
                                Date de collecte
                            </Label>
                            <Input
                                id="pickup-date"
                                type="date"
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="p-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-600 to-blue-600 text-white placeholder-gray-200 hover:from-gray-700 hover:to-blue-700 transition-all duration-300 focus:border-blue-500 focus:from-gray-700 focus:to-blue-700 [color-scheme:dark]"
                            />
                            {errors.date_from && <p className="text-red-500 text-sm">{errors.date_from}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pickup-time" className="flex items-center text-gray-700 font-semibold">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1 rounded-full mr-3">
                                    <Clock className="w-3.5 h-3.5 text-white" />
                                </div>
                                Heure de collecte
                            </Label>
                            <Input
                                id="pickup-time"
                                type="time"
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                                className="p-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-600 to-blue-600 text-white placeholder-gray-200 hover:from-gray-700 hover:to-blue-700 transition-all duration-300 focus:border-blue-500 focus:from-gray-700 focus:to-blue-700 [color-scheme:dark]"
                            />
                        </div>
                    </motion.div>

                    {/* Return Date/Time */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="space-y-3"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="return-date" className="flex items-center text-gray-700 font-semibold">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1 rounded-full mr-3">
                                    <Calendar className="w-3.5 h-3.5 text-white" />
                                </div>
                                Date de retour
                            </Label>
                            <Input
                                id="return-date"
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="p-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-600 to-blue-600 text-white placeholder-gray-200 hover:from-gray-700 hover:to-blue-700 transition-all duration-300 focus:border-blue-500 focus:from-gray-700 focus:to-blue-700 [color-scheme:dark]"
                            />
                            {errors.date_to && <p className="text-red-500 text-sm">{errors.date_to}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="return-time" className="flex items-center text-gray-700 font-semibold">
                                <div className="bg-gradient-to-r from-gray-600 to-blue-600 p-1 rounded-full mr-3">
                                    <Clock className="w-3.5 h-3.5 text-white" />
                                </div>
                                Heure de retour
                            </Label>
                            <Input
                                id="return-time"
                                type="time"
                                value={returnTime}
                                onChange={(e) => setReturnTime(e.target.value)}
                                className="p-3 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-600 to-blue-600 text-white placeholder-gray-200 hover:from-gray-700 hover:to-blue-700 transition-all duration-300 focus:border-blue-500 focus:from-gray-700 focus:to-blue-700 [color-scheme:dark]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
            <span className="flex items-center justify-center gap-3">
              {processing ? (
                  <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      RECHERCHE EN COURS...
                  </>
              ) : (
                  <>
                      <Check className="w-5 h-5" />
                      RECHERCHER
                      <ArrowRight className="w-5 h-5" />
                  </>
              )}
            </span>
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    )
}
