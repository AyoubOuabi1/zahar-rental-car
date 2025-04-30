import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Client } from '@/types/Client';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClientForm } from '@/components/backoffice/clients/ClientForm';
import { ClientsTable } from '@/components/backoffice/clients/ClientsTable';

const breadcrumbs = [
    { title: 'Clients', href: 'dashboard/clients' },
];

export default function ClientsManagement() {
    const { clients, search } = usePage<{ clients: Client[]; search?: string }>().props;
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm<Client>({
        identity_or_passport_number: '',
        full_name: '',
        email: '',
        mobile_number: '',
        address: '',
        permit_license_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        editingClient
            ? put(route('dashboard.clients.update', editingClient.id), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Client updated successfully.');
                },
            })
            : post(route('dashboard.clients.store'), {
                data,
                onSuccess: () => {
                    reset();
                    setIsDialogOpen(false);
                    toast('Client added successfully.');
                },
            });
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setData(client);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number | undefined) => {
        if (id) {
            destroy(route('dashboard.clients.destroy', id), {
                onSuccess: () => {
                    toast('Client deleted successfully.');
                },
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = `/clients?search=${searchQuery}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients Management" />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Clients Management</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Search clients by name or email..."
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
                        setEditingClient(null);
                    }
                    setIsDialogOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button className="mb-4">
                            <Plus className="w-4 h-4 mr-2" /> Add Client
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingClient ? 'Edit Client' : 'Add Client'}</DialogTitle>
                            <DialogDescription>
                                {editingClient ? 'Update the client details.' : 'Add a new client to the list.'}
                            </DialogDescription>
                        </DialogHeader>
                        <ClientForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            editingClient={editingClient}
                            onSubmit={submit}
                            onValueChange={(field, value) => setData(field, value)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Clients Table */}
                <ClientsTable clients={clients} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </AppLayout>
    );
}
