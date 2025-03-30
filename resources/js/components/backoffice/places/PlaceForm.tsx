import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { Place } from '@/types/Place';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';

interface PlaceFormProps {
    data: Place;
    errors: Record<string, string>;
    processing: boolean;
    editingPlace: Place | null;
    onSubmit: FormEventHandler;
    onValueChange: (field: string, value: string) => void;
}

export const PlaceForm = ({
                              data,
                              errors,
                              processing,
                              editingPlace,
                              onSubmit,
                              onValueChange,
                          }: PlaceFormProps) => {
    const editor = useEditor({
        extensions: [StarterKit, Bold, Italic, Underline],
        content: data.description,
        onUpdate: ({ editor }) => {
            onValueChange('description', editor.getHTML());
        },
    });

    return (
        <form onSubmit={onSubmit} className="grid gap-4 max-h-[500px] overflow-y-auto p-4">
            <div className="grid gap-4">
                <div>
                    <Label htmlFor="title">TITLE</Label>
                    <Input
                        id="title"
                        type="text"
                        value={data.title}
                        onChange={(e) => onValueChange('title', e.target.value)}
                    />
                    <InputError message={errors.title} />
                </div>
                <div>
                    <Label htmlFor="description">DESCRIPTION</Label>
                    {/* Toolbar for Text Formatting */}
                    {editor && (
                        <div className="mb-2 flex gap-2 border p-2 rounded-md bg-gray-100">
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                className={`px-2 py-1 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
                            >
                                B
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                className={`px-2 py-1 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
                            >
                                I
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`px-2 py-1 ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
                            >
                                U
                            </button>
                        </div>
                    )}
                    {/* Editor */}
                    <div className="border p-2 rounded-md min-h-[150px]">
                        <EditorContent editor={editor} />
                    </div>
                    <InputError message={errors.description} />
                </div>
                <div>
                    <Label htmlFor="image_url">IMAGE URL</Label>
                    <Input
                        id="image_url"
                        type="url"
                        value={data.image_url}
                        onChange={(e) => onValueChange('image_url', e.target.value)}
                    />
                    <InputError message={errors.image_url} />
                </div>
            </div>
            <Button type="submit" disabled={processing} className="mt-4">
                {processing ? <LoaderCircle className="animate-spin" /> : editingPlace ? 'Update Place' : 'Add Place'}
            </Button>
        </form>
    );
};
