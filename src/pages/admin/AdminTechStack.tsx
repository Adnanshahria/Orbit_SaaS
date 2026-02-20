import { useState, useEffect } from 'react';
import { SectionHeader, LangToggle, SaveButton, TextField, ErrorAlert, useSectionEditor, ItemListEditor } from '@/components/admin/EditorComponents';

export default function AdminTechStack() {
    const { lang, setLang, saving, saved, error, getData, save } = useSectionEditor('techStack');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [categories, setCategories] = useState<{ name: string; color: string; items: string[] }[]>([]);

    useEffect(() => {
        const d = getData();
        if (d) {
            setTitle(d.title || '');
            setSubtitle(d.subtitle || '');
            setCategories(d.categories || []);
        }
    }, [getData]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <SectionHeader title="Tech Stack Section" description="Edit the tech stack header and marquee items" />
                <LangToggle lang={lang} setLang={setLang} />
            </div>
            <ErrorAlert message={error} />
            <div className="space-y-6">
                <div className="space-y-4 bg-card rounded-xl p-6 border border-border">
                    <TextField label="Section Title" value={title} onChange={setTitle} lang={lang} />
                    <TextField label="Section Subtitle" value={subtitle} onChange={setSubtitle} multiline lang={lang} />
                </div>

                <div className="space-y-4 bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-semibold mb-4">Tech Categories (Marquee Rows)</h3>
                    <ItemListEditor
                        items={categories}
                        setItems={setCategories}
                        newItem={{ name: '', color: '#6366f1', items: [] }}
                        addLabel="Add Category"
                        getItemLabel={(item) => item.name || 'New Category'}
                        renderItem={(item, _, update) => (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <TextField label="Category Name" value={item.name} onChange={(v) => update({ ...item, name: v })} lang={lang} />
                                    <TextField label="Hex Color (e.g. #6366f1)" value={item.color} onChange={(v) => update({ ...item, color: v })} />
                                </div>
                                <TextField
                                    label="Skills (comma separated)"
                                    value={item.items.join(', ')}
                                    onChange={(v) => update({ ...item, items: v.split(',').map(s => s.trim()).filter(Boolean) })}
                                    multiline
                                />
                            </div>
                        )}
                    />
                </div>
            </div>
            <SaveButton onClick={() => save({ title, subtitle, categories })} saving={saving} saved={saved} />
        </div>
    );
}
