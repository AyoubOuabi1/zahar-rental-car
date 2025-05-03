import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { Reservation, Car, Client, Place, AddedOption } from '@/types/Reservation';

interface ReservationFormProps {
    data: Reservation;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: FormEventHandler;
    onValueChange: (field: keyof Reservation, value: any) => void;
    cars: Car[];
    clients: Client[];
    places: Place[];
    options: AddedOption[];
}

export const ReservationForm = ({
    data,
    errors,
    processing,
    onSubmit,
    onValueChange,
    cars,
    clients,
    places,
    options,
}: ReservationFormProps) => {
    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="flight_number">Flight Number</Label>
                    <Input
                        id="flight_number"
                        type="text"
                        value={data.flight_number || ''}
                        onChange={(e) => onValueChange('flight_number', e.target.value)}
                    />
                    <InputError message={errors.flight_number} />
                </div>

                <div>
                    <Label htmlFor="date_from">Date From</Label>
                    <Input
                        id="date_from"
                        type="date"
                        value={data.date_from || ''}
                        onChange={(e) => onValueChange('date_from', e.target.value)}
                    />
                    <InputError message={errors.date_from} />
                </div>

                <div>
                    <Label htmlFor="time_from">Time From</Label>
                    <Input
                        id="time_from"
                        type="time"
                        value={data.time_from || ''}
                        onChange={(e) => onValueChange('time_from', e.target.value)}
                    />
                    <InputError message={errors.time_from} />
                </div>

                <div>
                    <Label htmlFor="date_to">Date To</Label>
                    <Input
                        id="date_to"
                        type="date"
                        value={data.date_to || ''}
                        onChange={(e) => onValueChange('date_to', e.target.value)}
                    />
                    <InputError message={errors.date_to} />
                </div>

                <div>
                    <Label htmlFor="time_to">Time To</Label>
                    <Input
                        id="time_to"
                        type="time"
                        value={data.time_to || ''}
                        onChange={(e) => onValueChange('time_to', e.target.value)}
                    />
                    <InputError message={errors.time_to} />
                </div>

                <div>
                    <Label htmlFor="pickup_place_id">Pick-Up Place</Label>
                    <Select
                        value={data.pickup_place_id?.toString() || ''}
                        onValueChange={(value) => onValueChange('pickup_place_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a pick-up place" />
                        </SelectTrigger>
                        <SelectContent>
                            {places.map((place) => (
                                <SelectItem key={place.id} value={place.id.toString()}>
                                    {place.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.pickup_place_id} />
                </div>

                <div>
                    <Label htmlFor="dropoff_place_id">Drop-Off Place</Label>
                    <Select
                        value={data.dropoff_place_id?.toString() || ''}
                        onValueChange={(value) => onValueChange('dropoff_place_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a drop-off place" />
                        </SelectTrigger>
                        <SelectContent>
                            {places.map((place) => (
                                <SelectItem key={place.id} value={place.id.toString()}>
                                    {place.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.dropoff_place_id} />
                </div>

                <div>
                    <Label htmlFor="car_id">Car</Label>
                    <Select
                        value={data.car_id?.toString() || ''}
                        onValueChange={(value) => onValueChange('car_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a car" />
                        </SelectTrigger>
                        <SelectContent>
                            {cars.map((car) => (
                                <SelectItem key={car.id} value={car.id.toString()}>
                                    {car.model}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.car_id} />
                </div>

                <div>
                    <Label htmlFor="client_id">Client</Label>
                    <Select
                        value={data.client_id?.toString() || ''}
                        onValueChange={(value) => onValueChange('client_id', Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a client" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id.toString()}>
                                    {client.full_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.client_id} />
                </div>
                <div>
                    <Label htmlFor="added_options">Additional Options</Label>
                    <MultiSelect
                        selectedValues={data.added_options?.map(opt => opt.id.toString()) || []}
                        onValueChange={(values) => {
                            const selectedOptions = options
                                .filter(opt => values.includes(opt.id.toString()))
                                .map(opt => {
                                    const existing = data.added_options?.find(o => o.id === opt.id);
                                    return {
                                        id: opt.id,
                                        quantity: existing?.quantity || 1,
                                        price_per_day: opt.price_per_day,
                                    };
                                });

                            onValueChange('added_options', selectedOptions);
                        }}
                        options={options.map(opt => ({
                            value: opt.id.toString(),
                            label: `${opt.title} ($${opt.price_per_day}/day)`
                        }))}
                    />
                    <InputError message={errors.added_options} />
                </div>
            </div>

            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? <LoaderCircle className="animate-spin" /> :  'Add Reservation'}
            </Button>
        </form>
    );
};
