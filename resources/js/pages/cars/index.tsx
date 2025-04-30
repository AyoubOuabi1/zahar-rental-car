import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Car } from '@/types/Car';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CarForm } from '@/components/backoffice/cars/CarForm ';
import { CarsTable } from '@/components/backoffice/cars/CarsTable ';

const breadcrumbs = [
    { title: 'Cars', href: 'dashboard/cars' },
];

export default function CarsManagement() {
    const { cars, search } = usePage<{ cars: Car[]; search?: string }>().props;
    const [editingCar, setEditingCar] = useState<Car | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<Car>({
        brand: '',
        matriculation: '',
        model: '',
        category: '',
        fuel: '',
        transmission: '',
        luggage: 0,
        seats: 0,
        ac: false,
        doors: 0,
        image: '',
        discount: 0,
        price_per_day: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        editingCar
            ? put(route('dashboard.cars.update', editingCar.id), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast.success('Car updated successfully.');
                },
                onError: () => {
                    toast.error('Failed to update car.');
                },
            })
            : post(route('dashboard.cars.store'), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast.success('Car added successfully.');
                },
                onError: () => {
                    toast.error('Failed to add car.');
                },
            });
    };

    const handleEdit = (car: Car) => {
        setEditingCar(car);
        setData(car);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('dashboard.cars.destroy', id), {
                onSuccess: () => {
                    toast.success('Car deleted successfully.');
                },
                onError: () => {
                    toast.error('Failed to delete car.');
                },
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        window.location.href = `/cars?search=${encodeURIComponent(searchQuery)}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cars Management" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Cars Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search cars by brand or model..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit">
                        <Search className="w-4 h-4 mr-2" /> Search
                    </Button>
                </form>

                {/* Add Car Button */}
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    if (!open) {
                        reset();
                        setEditingCar(null);
                    }
                    setIsDialogOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="w-4 h-4 mr-2" /> Add Car
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingCar ? 'Edit Car' : 'Add Car'}</DialogTitle>
                            <DialogDescription>
                                {editingCar ? 'Update the car details.' : 'Add a new car to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <CarForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            editingCar={editingCar}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Cars Table */}
                <CarsTable cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AppLayout>
    );
}
