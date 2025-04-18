import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { Pack } from '@/types/Pack';

interface PackFormProps {
    data: Pack;
    errors: Record<string, string>;
    processing: boolean;
    editingPack: Pack | null;
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string | number | boolean) => void;
}

export const PackForm = ({ data, errors, processing, editingPack, onSubmit, onValueChange }: PackFormProps) => {

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                {['title', 'description', 'price_per_day'].map((field) => (
                    <div key={field}>
                        <Label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</Label>
                        <Input
                            id={field}
                            type={field === 'price_per_day' ? 'number' : 'text'}
                            value={data[field]}
                            onChange={(e) => onValueChange(field, e.target.value)}
                        />
                        <InputError message={errors[field]} />
                    </div>
                ))}

                {/* Status Select */}
                <div>
                    <Label htmlFor="status">Activation</Label>
                    <Select
                        value={data.status}
                        onValueChange={(value) => onValueChange('status', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Activation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key="true" value="true">Active</SelectItem>
                            <SelectItem key="false" value="false">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>
            </div>
            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? <LoaderCircle className="animate-spin" /> : editingPack ? 'Update Pack' : 'Add Pack'}
            </Button>
        </form>
    );
};
