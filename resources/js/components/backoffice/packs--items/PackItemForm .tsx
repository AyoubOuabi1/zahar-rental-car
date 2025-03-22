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
import { PackItem } from '@/types/PackItem ';

interface PackItemFormProps {
    data: PackItem;
    errors: Record<string, string>;
    processing: boolean;
    editingPackItem: PackItem | null;
    packs: Pack[];
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string) => void;
}

export const PackItemForm = ({
                                 data,
                                 errors,
                                 processing,
                                 editingPackItem,
                                 packs,
                                 onSubmit,
                                 onValueChange,
                             }: PackItemFormProps) => {
    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Pack Select Dropdown */}
                <div>
                    <Label htmlFor="pack_id">Pack</Label>
                    <Select
                        value={data.pack_id?.toString()} // Convert to string for Select value
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

                {/* Title Input */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        value={data.title}
                        onChange={(e) => onValueChange('title', e.target.value)}
                    />
                    <InputError message={errors.title} />
                </div>

                {/* Description Input */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        value={data.description}
                        onChange={(e) => onValueChange('description', e.target.value)}
                    />
                    <InputError message={errors.description} />
                </div>
            </div>
            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? <LoaderCircle className="animate-spin" /> : editingPackItem ? 'Update Pack Item' : 'Add Pack Item'}
            </Button>
        </form>
    );
};
