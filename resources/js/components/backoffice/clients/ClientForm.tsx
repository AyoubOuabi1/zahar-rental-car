import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { Client } from '@/types/Client';

interface ClientFormProps {
    data: Client;
    errors: Record<string, string>;
    processing: boolean;
    editingClient: Client | null;
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string) => void;
}

export const ClientForm = ({ data, errors, processing, editingClient, onSubmit, onValueChange }: ClientFormProps) => {
    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                {['identity_or_passport_number', 'full_name', 'email', 'mobile_number', 'address', 'permit_license_id'].map((field) => (
                    <div key={field}>
                        <Label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</Label>
                        <Input
                            id={field}
                            type="text"
                            value={data[field]}
                            onChange={(e) => onValueChange(field, e.target.value)}
                        />
                        <InputError message={errors[field]} />
                    </div>
                ))}
            </div>
            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? <LoaderCircle className="animate-spin" /> : editingClient ? 'Update Client' : 'Add Client'}
            </Button>
        </form>
    );
};
