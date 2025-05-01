import { useState } from 'react';
import { MapPin, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Place } from '@/types/Place';

interface ReservationFormProps {
    places: Place[];
}

export default function ReservationForm({ places }: ReservationFormProps) {
    const [isDifferentReturn, setIsDifferentReturn] = useState(false);

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Réservez une Voiture</h2>

            {/* Pickup Location */}
            <div className="mb-4">
                <Label htmlFor="pickup-location" className="flex items-center mb-2 text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Lieu de prise en charge
                </Label>
                <Select>
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
            </div>

            {/* Checkbox for different return location */}
            <div className="mb-4 flex items-center gap-2">
                <Checkbox id="different-return" checked={isDifferentReturn} onCheckedChange={(checked) => setIsDifferentReturn(!!checked)} />
                <Label htmlFor="different-return" className="text-gray-700">Lieu de retour différent</Label>
            </div>

            {/* Return Location (optional) */}
            {isDifferentReturn && (
                <div className="mb-4">
                    <Label htmlFor="return-location" className="flex items-center mb-2 text-gray-700">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        Lieu de retour
                    </Label>
                    <Select>
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
                </div>
            )}

            {/* Pickup and Return Date/Time */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <Label htmlFor="pickup-date" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Date de collecte
                    </Label>
                    <Input id="pickup-date" type="date" className="bg-white p-3 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <Label htmlFor="pickup-time" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Heure de collecte
                    </Label>
                    <Input id="pickup-time" type="time" className="bg-white p-3 border border-gray-300 rounded-md w-full" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <Label htmlFor="return-date" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Date de retour
                    </Label>
                    <Input id="return-date" type="date" className="bg-white p-3 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <Label htmlFor="return-time" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Heure de retour
                    </Label>
                    <Input id="return-time" type="time" className="bg-white p-3 border border-gray-300 rounded-md w-full" />
                </div>
            </div>

            {/* Submit button */}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center rounded-md text-lg">
                <Check className="w-5 h-5 mr-2" />
                RÉSERVEZ
            </Button>
        </div>
    );
}
