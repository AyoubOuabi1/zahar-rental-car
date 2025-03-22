import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PackForm } from '@/components/backoffice/packs/PackForm';
import { PacksTable } from '@/components/backoffice/packs/PacksTable';
import { Pack } from '@/types/Pack';

const breadcrumbs = [
    { title: 'Packs', href: '/packs' },
];

export default function PacksManagement() {
    const { packs, search } = usePage<{ packs: Pack[]; search?: string }>().props;
    const [editingPack, setEditingPack] = useState<Pack | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<Pack>({
        title: '',
        description: '',
        status: 'true',
        price_per_day: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        editingPack
            ? put(route('packs.update', editingPack.id), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Pack updated successfully.');
                },
            })
            : post(route('packs.store'), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Pack added successfully.');
                },
            });
    };

    const handleEdit = (pack: Pack) => {
        setEditingPack(pack);
        setData(pack);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('packs.destroy', id), {
                onSuccess: () => {
                    toast('Pack deleted successfully.');
                },
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/packs?search=${searchQuery}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Packs Management" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Packs Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search packs by title..."
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
                        setEditingPack(null);
                    }
                    setIsDialogOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="w-4 h-4 mr-2" /> Add Pack
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingPack ? 'Edit Pack' : 'Add Pack'}</DialogTitle>
                            <DialogDescription>
                                {editingPack ? 'Update the pack details.' : 'Add a new pack to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <PackForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            editingPack={editingPack}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Packs Table */}
                <PacksTable packs={packs} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AppLayout>
    );
}
