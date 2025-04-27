import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Reservation, Car, Client, Pack, Place, AddedOption } from '@/types/Reservation';
import { ReservationsTable } from '@/components/backoffice/reservation/ReservationsTable';
import { ReservationForm } from '@/components/backoffice/reservation/ReservationForm';

const breadcrumbs = [
    { title: 'Reservations', href: '/reservations' },
];

export default function index() {
    const { reservations, cars, clients, packs, places, options, search } = usePage<{
        reservations: Reservation[];
        cars: Car[];
        clients: Client[];
        packs: Pack[];
        places: Place[];
        options: AddedOption[];
        search?: string;
    }>().props;

    const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm<Reservation>({
        flight_number: '',
        date_from: '',
        date_to: '',
        pickup_place_id: '',
        dropoff_place_id: '',
        car_id: '',
        client_id: '',
        pack_id: '',
        added_options: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('reservations.store'), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Reservation added successfully.');
                },
            });
    };



    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('reservations.destroy', id), {
                onSuccess: () => {
                    toast('Reservation deleted successfully.');
                },
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/reservations?search=${searchQuery}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reservations Management" />
            <div className="container mx-auto p-4">
                <h1 className="mb-4 text-2xl font-bold">Reservations Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search reservations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                </form>

                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                        if (!open) {
                            reset();
                            setEditingReservation(null);
                        }
                        setIsDialogOpen(open);
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="mr-2 h-4 w-4" /> Add Reservation
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingReservation ? 'Edit Reservation' : 'Add Reservation'}</DialogTitle>
                            <DialogDescription>
                                {editingReservation ? 'Update the reservation details.' : 'Add a new reservation to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <ReservationForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                            cars={cars}
                            clients={clients}
                            packs={packs}
                            places={places}
                            options={options}
                        />
                    </DialogContent>
                </Dialog>

                {/* Reservations Table */}
                <ReservationsTable reservations={reservations} cars={cars} clients={clients} places={places} onDelete={handleDelete} options={options} />
            </div>
        </AppLayout>
    );
}
