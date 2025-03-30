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
import {Pack, PackItem } from '@/types/PackItem ';

interface PackItemFormProps {
    data: PackItem;
    errors: Record<string, string>;
    processing: boolean;
    editingPackItem: PackItem | null;
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string | number) => void;
    packs: Pack[];
}

export const PackItemForm = ({
                                 data,
                                 errors,
                                 processing,
                                 editingPackItem,
                                 onSubmit,
                                 onValueChange,
                                 packs, // Receive packs from the parent
                             }: PackItemFormProps) => {
    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Pack ID Select */}z
                <div>
                    <Label htmlFor="pack_id">Pack</Label>
                    <Select
                        value={data.pack_id}
                        onValueChange={(value) => onValueChange('pack_id', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a pack" />
                        </SelectTrigger>
                        <SelectContent>
                            {packs.map((pack) => (
                                <SelectItem key={pack.id} value={pack.id.toString()}>
                                    {pack.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.pack_id} />
                </div>

                {/* Title and Description Inputs */}
                {['title'].map((field) => (
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
                {processing ? <LoaderCircle className="animate-spin" /> : editingPackItem ? 'Update Pack Item' : 'Add Pack Item'}
            </Button>
        </form>
    );
};
