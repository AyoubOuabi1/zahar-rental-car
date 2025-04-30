import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PackItem, Pack } from '@/types/PackItem ';
import { PackItemForm } from '@/components/backoffice/packs--items/PackItemForm';
import { PackItemsTable } from '@/components/backoffice/packs--items/PackItemsTable';

const breadcrumbs = [
    { title: 'Pack Items', href: 'dashboard/packitems' },
];

export default function Index() {
    const { packItems, packs, search } = usePage<{ packItems: PackItem[]; packs: Pack[]; search?: string }>().props;
    const [editingPackItem, setEditingPackItem] = useState<PackItem | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<PackItem>({
        pack_id: '',
        title: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        editingPackItem
            ? put(route('dashboard.packitems.update', editingPackItem.id), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Pack item updated successfully.');
                },
            })
            : post(route('dashboard.packitems.store'), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Pack item added successfully.');
                },
            });
    };

    const handleEdit = (packItem: PackItem) => {
        setEditingPackItem(packItem);
        setData(packItem);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('dashboard.packitems.destroy', id), {
                onSuccess: () => {
                    toast('Pack item deleted successfully.');
                },
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/packitems?search=${searchQuery}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pack Items Management" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Pack Items Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search pack items by title..."
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
                        setEditingPackItem(null);
                    }
                    setIsDialogOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="w-4 h-4 mr-2" /> Add Pack Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingPackItem ? 'Edit Pack Item' : 'Add Pack Item'}</DialogTitle>
                            <DialogDescription>
                                {editingPackItem ? 'Update the pack item details.' : 'Add a new pack item to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <PackItemForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            editingPackItem={editingPackItem}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                            packs={packs} // Pass packs to the form
                        />
                    </DialogContent>
                </Dialog>

                {/* Pack Items Table */}
                <PackItemsTable packItems={packItems} packs={packs} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AppLayout>
    );
}
