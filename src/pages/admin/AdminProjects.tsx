import { useState, useEffect, useRef } from 'react';
import { SectionHeader, LangToggle, SaveButton, TextField, ErrorAlert, ItemListEditor, useSectionEditor } from '@/components/admin/EditorComponents';
import { X, Plus, Upload, Trash2 } from 'lucide-react';

function compressImage(file: File, maxWidth = 800, quality = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let w = img.width;
                let h = img.height;
                if (w > maxWidth) {
                    h = (h * maxWidth) / w;
                    w = maxWidth;
                }
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d')!;
                ctx.drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL('image/webp', quality));
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function ImageUpload({ image, onChange, title }: { image: string; onChange: (v: string) => void; title: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setUploading(true);
        try {
            const dataUri = await compressImage(file);
            onChange(dataUri);
        } catch {
            console.error('Failed to process image');
        }
        setUploading(false);
    };

    return (
        <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Project Image</label>
            {image ? (
                <div className="relative max-w-xs rounded-lg overflow-hidden border border-border group">
                    <img src={image} alt={title || 'Preview'} className="w-full h-auto object-cover" />
                    <button
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="w-full max-w-xs h-32 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">{uploading ? 'Processing...' : 'Click to upload image'}</span>
                    <span className="text-xs">PNG, JPG, WebP</span>
                </button>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = '';
                }}
            />
        </div>
    );
}

function TagsInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
    const [input, setInput] = useState('');
    const addTag = () => {
        if (input.trim() && !tags.includes(input.trim())) {
            onChange([...tags, input.trim()]);
            setInput('');
        }
    };
    return (
        <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Tags</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {tag}
                        <button onClick={() => onChange(tags.filter((_, j) => j !== i))} className="hover:text-red-500 cursor-pointer">
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground outline-none border border-border"
                />
                <button onClick={addTag} className="px-3 py-2 rounded-lg bg-secondary text-foreground hover:bg-primary/10 text-sm cursor-pointer">
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default function AdminProjects() {
    const { lang, setLang, saving, saved, error, getData, save } = useSectionEditor('projects');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [items, setItems] = useState<{ title: string; desc: string; tags: string[]; link: string; image: string }[]>([]);

    useEffect(() => {
        const d = getData();
        if (d) {
            setTitle(d.title || '');
            setSubtitle(d.subtitle || '');
            setItems(d.items || []);
        }
    }, [getData]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <SectionHeader title="Projects Section" description="Manage your project showcases" />
                <LangToggle lang={lang} setLang={setLang} />
            </div>
            <ErrorAlert message={error} />
            <div className="space-y-4 bg-card rounded-xl p-6 border border-border">
                <TextField label="Section Title" value={title} onChange={setTitle} />
                <TextField label="Section Subtitle" value={subtitle} onChange={setSubtitle} multiline />
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Projects</h3>
                <ItemListEditor
                    items={items}
                    setItems={setItems}
                    newItem={{ title: '', desc: '', tags: [], link: '', image: '' }}
                    addLabel="Add Project"
                    renderItem={(item, _i, update) => (
                        <>
                            <TextField label="Title" value={item.title} onChange={v => update({ ...item, title: v })} />
                            <TextField label="Description" value={item.desc} onChange={v => update({ ...item, desc: v })} multiline />
                            <TextField label="Live Link" value={item.link || ''} onChange={v => update({ ...item, link: v })} />
                            <ImageUpload image={item.image || ''} onChange={v => update({ ...item, image: v })} title={item.title} />
                            <TagsInput tags={item.tags || []} onChange={t => update({ ...item, tags: t })} />
                        </>
                    )}
                />
            </div>
            <SaveButton onClick={() => save({ title, subtitle, items })} saving={saving} saved={saved} />
        </div>
    );
}

