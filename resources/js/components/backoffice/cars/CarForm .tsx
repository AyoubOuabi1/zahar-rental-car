import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { Car } from '@/types/Car';

interface CarFormProps {
    data: Car;
    errors: Record<string, string>;
    processing: boolean;
    editingCar: Car | null;
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string | boolean | number) => void;
}

export const CarForm = ({ data, errors, processing, editingCar, onSubmit, onValueChange }: CarFormProps) => {
    const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
    const transmissions = ['Manual', 'Automatic'];

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                {['brand', 'model', 'matriculation','category', 'image', 'discount', 'price_per_day'].map((field) => (
                    <div key={field}>
                        <Label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</Label>
                        <Input
                            id={field}
                            type={field === 'price_per_day' || field === 'discount' ? 'number' : 'text'}
                            value={data[field]}
                            onChange={(e) => onValueChange(field, e.target.value)}
                        />
                        <InputError message={errors[field]} />
                    </div>
                ))}


                <div>
                    <Label htmlFor="fuel">Fuel Type</Label>
                    <Select value={data.fuel} onValueChange={(value) => onValueChange('fuel', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Fuel Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {fuelTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.fuel} />
                </div>


                <div>
                    <Label htmlFor="transmission">Transmission</Label>
                    <Select value={data.transmission} onValueChange={(value) => onValueChange('transmission', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Transmission" />
                        </SelectTrigger>
                        <SelectContent>
                            {transmissions.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.transmission} />
                </div>


                <div>
                    <Label htmlFor="seats">Seats</Label>
                    <Input
                        id="seats"
                        type="number"
                        value={data.seats}
                        onChange={(e) => onValueChange('seats', parseInt(e.target.value))}
                        min={1}
                    />
                    <InputError message={errors.seats} />
                </div>


                <div>
                    <Label htmlFor="doors">Doors</Label>
                    <Input
                        id="doors"
                        type="number"
                        value={data.doors}
                        onChange={(e) => onValueChange('doors', parseInt(e.target.value))}
                        min={1}
                    />
                    <InputError message={errors.doors} />
                </div>


                <div>
                    <Label htmlFor="luggage">Luggage</Label>
                    <Input
                        id="luggage"
                        type="number"
                        value={data.luggage}
                        onChange={(e) => onValueChange('luggage', parseInt(e.target.value))}
                        min={0}
                    />
                    <InputError message={errors.luggage} />
                </div>


                <div className="flex items-center space-x-2">
                    <Switch
                        id="ac"
                        checked={data.ac}
                        onCheckedChange={(checked) => onValueChange('ac', checked)}
                    />
                    <Label htmlFor="ac">Air Conditioning</Label>
                </div>
            </div>

            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? <LoaderCircle className="animate-spin" /> : editingCar ? 'Update Car' : 'Add Car'}
            </Button>
        </form>
    );
};
