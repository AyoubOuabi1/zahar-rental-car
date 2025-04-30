import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlaceForm } from '@/components/backoffice/places/PlaceForm';
import { PlacesTable } from '@/components/backoffice/places/PlacesTable';
import { Place } from '@/types/Place';

const breadcrumbs = [
    { title: 'Places', href: 'dashboard/places' },
];

export default function PlacesManagement() {
    const { places } = usePage<{ places: Place[] }>().props;
    const [editingPlace, setEditingPlace] = useState<Place | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<Place>({
        title: '',
        description: '',
        image_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        editingPlace
            ? put(route('dashboard.places.update', { place: editingPlace.id }), {
                title: data.title,
                description: data.description,
                image_url: data.image_url,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast.success('Place updated successfully.');
                },
                onError: (errors) => {
                    toast.error('Update failed: ' + JSON.stringify(errors));
                }
            })
            : post(route('dashboard.places.store'), {
                title: data.title,
                description: data.description,
                image_url: data.image_url,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast.success('Place created successfully.');
                }
            });
    };

    const handleEdit = (place: Place) => {
        setEditingPlace(place);
        setData({
            title: place.title,
            description: place.description,
            image_url: place.image_url,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('dashboard.places.destroy', { place: id }), {
                onSuccess: () => {
                    toast.success('Place deleted successfully.');
                },
                onError: () => {
                    toast.error('Delete failed');
                }
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search logic here or filter client-side
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Places Management" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Places Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search places by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit">
                        <Search className="w-4 h-4 mr-2" /> Search
                    </Button>
                </form>

                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    if (!open) {
                        reset();
                        setEditingPlace(null);
                    }
                    setIsDialogOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="w-4 h-4 mr-2" /> Add Place
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingPlace ? 'Edit Place' : 'Add Place'}</DialogTitle>
                            <DialogDescription>
                                {editingPlace ? 'Update the place details.' : 'Add a new place to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <PlaceForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            editingPlace={editingPlace}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Places Table */}
                <PlacesTable places={places} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AppLayout>
    );
}
