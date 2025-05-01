import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AddedOption } from '@/types/AddedOption';
import { AddedOptionsTable } from '@/components/backoffice/added-options/AddedOptionsTable';
import { AddedOptionForm } from '@/components/backoffice/added-options/AddedOptionForm';

const breadcrumbs = [
    { title: 'Added Options', href: 'dashboard/added-options' },
];

export default function AddedOptionsIndex() {
    const { addedOptions, search } = usePage<{
        addedOptions: AddedOption[];
        search?: string
    }>().props;

    const [editingAddedOption, setEditingAddedOption] = useState<AddedOption | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<AddedOption>({
        title: '',
        description: '',
        price_per_day: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        editingAddedOption
            ? put(route('dashboard.added-options.update', editingAddedOption.id), {
                ...data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast.success('Added option updated successfully.');
                },
                onError: () => {
                    toast.error('Failed to update added option.');
                }
            })
            : post(route('dashboard.added-options.store'), {
                ...data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast.success('Added option created successfully.');
                },
                onError: () => {
                    toast.error('Failed to create added option.');
                }
            });
    };

    const handleEdit = (addedOption: AddedOption) => {
        setEditingAddedOption(addedOption);
        setData({
            title: addedOption.title,
            description: addedOption.description,
            price_per_day: addedOption.price_per_day,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('dashboard.added-options.destroy', id), {
                onSuccess: () => {
                    toast.success('Added option deleted successfully.');
                },
                onError: () => {
                    toast.error('Failed to delete added option.');
                }
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/dashboard/added-options?search=${searchQuery}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Added Options Management" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Added Options Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search added options by title..."
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
                        setEditingAddedOption(null);
                    }
                    setIsDialogOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="w-4 h-4 mr-2" /> Add Option
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingAddedOption ? 'Edit Added Option' : 'Add Added Option'}</DialogTitle>
                            <DialogDescription>
                                {editingAddedOption ? 'Update the added option details.' : 'Add a new option to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <AddedOptionForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            editingAddedOption={editingAddedOption}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Added Options Table */}
                <AddedOptionsTable
                    addedOptions={addedOptions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </AppLayout>
    );
}
