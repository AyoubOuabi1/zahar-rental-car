import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { AddedOption } from '@/types/AddedOption';

interface AddedOptionFormProps {
    data: AddedOption;
    errors: Record<string, string>;
    processing: boolean;
    editingAddedOption: AddedOption | null;
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string | number) => void;
}

export const AddedOptionForm = ({
                                    data,
                                    errors,
                                    processing,
                                    editingAddedOption,
                                    onSubmit,
                                    onValueChange,
                                }: AddedOptionFormProps) => {
    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4">
                {['title', 'description', 'price_per_day'].map((field) => (
                    <div key={field}>
                        <Label htmlFor={field}>
                            {field.split('_').map(word =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                        </Label>
                        <Input
                            id={field}
                            type={field === 'price_per_day' ? 'number' : 'text'}
                            step={field === 'price_per_day' ? '0.01' : undefined}
                            value={data[field]}
                            onChange={(e) => onValueChange(
                                field,
                                field === 'price_per_day' ? parseFloat(e.target.value) : e.target.value
                            )}
                        />
                        <InputError message={errors[field]} />
                    </div>
                ))}
            </div>
            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? (
                    <LoaderCircle className="animate-spin" />
                ) : editingAddedOption ? (
                    'Update Added Option'
                ) : (
                    'Add Added Option'
                )}
            </Button>
        </form>
    );
};
