import { useState } from 'react';
import { MapPin, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function ReservationForm() {
    const [isDifferentReturn, setIsDifferentReturn] = useState(false);

    return (
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Réservez une Voiture</h2>

            <div className="mb-4">
                <Label htmlFor="pickup-location" className="flex items-center mb-2 text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Lieu de prise en charge
                </Label>
                <Input id="pickup-location" type="text" placeholder="Aéroport de Casablanca (CMN)" className="p-3 border border-gray-300 rounded-md" />
            </div>

            <div className="mb-4 flex items-center gap-2">
                <Checkbox id="different-return" checked={isDifferentReturn} onCheckedChange={(checked) => setIsDifferentReturn(!!checked)} />
                <Label htmlFor="different-return" className="text-gray-700">Lieu de retour différent</Label>
            </div>

            {isDifferentReturn && (
                <div className="mb-4">
                    <Label htmlFor="return-location" className="flex items-center mb-2 text-gray-700">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        Lieu de retour
                    </Label>
                    <Input id="return-location" type="text" placeholder="Aéroport de Marrakech (RAK)" className="p-3 border border-gray-300 rounded-md" />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <Label htmlFor="pickup-date" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Date de collecte
                    </Label>
                    <Input id="pickup-date" type="date" className="p-3 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <Label htmlFor="pickup-time" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Heure de collecte
                    </Label>
                    <Input id="pickup-time" type="time" className="p-3 border border-gray-300 rounded-md w-full" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <Label htmlFor="return-date" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Date de retour
                    </Label>
                    <Input id="return-date" type="date" className="p-3 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <Label htmlFor="return-time" className="flex items-center mb-2 text-gray-700">
                        <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                        Heure de retour
                    </Label>
                    <Input id="return-time" type="time" className="p-3 border border-gray-300 rounded-md w-full" />
                </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center rounded-md text-lg">
                <Check className="w-5 h-5 mr-2" />
                RÉSERVEZ
            </Button>
        </div>
    );
}
