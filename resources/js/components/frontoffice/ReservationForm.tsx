import { useState, useEffect } from 'react';
import { MapPin, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Place } from '@/types/Place';

interface ReservationFormProps {
    places: Place[];
}

export default function ReservationForm({ places }: ReservationFormProps) {
    const [isDifferentReturn, setIsDifferentReturn] = useState(false);
    const [pickupLocation, setPickupLocation] = useState('');
    const [returnLocation, setReturnLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('10:00');
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('10:00');

    // Initialize with default form
    const { data, setData, post, processing, errors } = useForm({
        pickup_location: '',
        return_location: '',
        date_from: '',
        date_to: ''
    });

    // Update return location when pickup changes (if same location)
    useEffect(() => {
        if (!isDifferentReturn) {
            setReturnLocation(pickupLocation);
        }
    }, [pickupLocation, isDifferentReturn]);

    // Update form data when inputs change
    useEffect(() => {
        // Format date and time for backend
        const formatDateTime = (date, time) => {
            if (!date) return '';
            return `${date} ${time}`;
        };

        setData({
            pickup_location: pickupLocation,
            return_location: isDifferentReturn ? returnLocation : pickupLocation,
            date_from: formatDateTime(pickupDate, pickupTime),
            date_to: formatDateTime(returnDate, returnTime)
        });
    }, [pickupLocation, returnLocation, pickupDate, pickupTime, returnDate, returnTime, isDifferentReturn]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data
        if (!data.pickup_location || !data.return_location || !data.date_from || !data.date_to) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        // Submit form to backend
        post(route('booking-cars'), {
            onSuccess: () => {
                toast.success('Recherche de véhicules disponibles...');
            },
            onError: (errors) => {
                toast.error('Une erreur est survenue lors de la recherche');
                console.error(errors);
            }
        });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Réservez une Voiture</h2>

            <form onSubmit={handleSubmit}>
                {/* Pickup Location */}
                <div className="mb-4">
                    <Label htmlFor="pickup-location" className="flex items-center mb-2 text-gray-700">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        Lieu de prise en charge
                    </Label>
                    <Select value={pickupLocation} onValueChange={setPickupLocation}>
                        <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700">
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
                    {errors.pickup_location && (
                        <p className="text-red-500 text-sm mt-1">{errors.pickup_location}</p>
                    )}
                </div>

                {/* Checkbox for different return location */}
                <div className="mb-4 flex items-center gap-2">
                    <Checkbox
                        id="different-return"
                        checked={isDifferentReturn}
                        onCheckedChange={(checked) => setIsDifferentReturn(!!checked)}
                    />
                    <Label htmlFor="different-return" className="text-gray-700">Lieu de retour différent</Label>
                </div>

                {/* Return Location (optional) */}
                {isDifferentReturn && (
                    <div className="mb-4">
                        <Label htmlFor="return-location" className="flex items-center mb-2 text-gray-700">
                            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                            Lieu de retour
                        </Label>
                        <Select value={returnLocation} onValueChange={setReturnLocation}>
                            <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700">
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
                        {errors.return_location && (
                            <p className="text-red-500 text-sm mt-1">{errors.return_location}</p>
                        )}
                    </div>
                )}

                {/* Pickup and Return Date/Time */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label htmlFor="pickup-date" className="flex items-center mb-2 text-gray-700">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            Date de collecte
                        </Label>
                        <Input
                            id="pickup-date"
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="bg-white p-3 border border-gray-300 rounded-md w-full"
                        />
                        {errors.date_from && (
                            <p className="text-red-500 text-sm mt-1">{errors.date_from}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="pickup-time" className="flex items-center mb-2 text-gray-700">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            Heure de collecte
                        </Label>
                        <Input
                            id="pickup-time"
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="bg-white p-3 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <Label htmlFor="return-date" className="flex items-center mb-2 text-gray-700">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            Date de retour
                        </Label>
                        <Input
                            id="return-date"
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="bg-white p-3 border border-gray-300 rounded-md w-full"
                        />
                        {errors.date_to && (
                            <p className="text-red-500 text-sm mt-1">{errors.date_to}</p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="return-time" className="flex items-center mb-2 text-gray-700">
                            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                            Heure de retour
                        </Label>
                        <Input
                            id="return-time"
                            type="time"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            className="bg-white p-3 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center rounded-md text-lg"
                >
                    <Check className="w-5 h-5 mr-2" />
                    RECHERCHER
                </Button>
            </form>
        </div>
    );
}
