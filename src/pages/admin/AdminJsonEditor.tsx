import { useState, useEffect } from 'react';
import { SectionHeader, SaveButton, ErrorAlert } from '@/components/admin/EditorComponents';
import { useContent } from '@/contexts/ContentContext';
import { Code, Braces, Terminal } from 'lucide-react';
import { toast } from 'sonner';

const SECTIONS = [
    { id: 'hero', label: 'Hero' },
    { id: 'services', label: 'Services' },
    { id: 'techStack', label: 'Tech Stack' },
    { id: 'whyUs', label: 'Why Us' },
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' },
    { id: 'chatbot', label: 'Chatbot' },
    { id: 'nav', label: 'Navbar' },
    { id: 'seo', label: 'SEO' },
];

export default function AdminJsonEditor() {
    const { content, updateSection, loading } = useContent();
    const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id);
    const [lang, setLang] = useState('en');
    const [jsonText, setJsonText] = useState('');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    // Load current data when section or lang changes
    useEffect(() => {
        const data = (content[lang as 'en' | 'bn'] as any)?.[selectedSection];
        if (data) {
            setJsonText(JSON.stringify(data, null, 4));
        } else {
            setJsonText('{}');
        }
    }, [content, selectedSection, lang]);

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSaved(false);
        const toastId = toast.loading('Parsing and saving JSON...');

        try {
            const parsedData = JSON.parse(jsonText);
            const ok = await updateSection(selectedSection, lang, parsedData);
            if (ok) {
                setSaved(true);
                toast.success('JSON applied and saved!', { id: toastId });
                setTimeout(() => setSaved(false), 2000);
            } else {
                setError('Failed to update section via API.');
                toast.error('Save failed', { id: toastId });
            }
        } catch (err) {
            console.error(err);
            setError('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
            toast.error('Invalid JSON structure', { id: toastId });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading content...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <SectionHeader
                    title="Raw JSON Editor"
                    description="Directly edit or paste JSON data for any section. Be careful - invalid structures can break the site."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card rounded-xl p-6 border border-border">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Select Section</label>
                    <select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground outline-none border border-border"
                    >
                        {SECTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Language</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setLang('en')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${lang === 'en' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setLang('bn')}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${lang === 'bn' ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80'}`}
                        >
                            Bangla
                        </button>
                    </div>
                </div>
            </div>

            <ErrorAlert message={error} />

            <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                        <Braces className="w-5 h-5" />
                        <h3 className="font-semibold">{SECTIONS.find(s => s.id === selectedSection)?.label} JSON ({lang.toUpperCase()})</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Formatted with 4 spaces</span>
                    </div>
                </div>

                <div className="relative group">
                    <textarea
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                        placeholder="Paste your JSON here..."
                        className="w-full h-[500px] bg-[#0d0d0d] text-[#e0e0e0] font-mono text-sm rounded-lg p-5 border border-border focus:border-primary/50 outline-none resize-none leading-relaxed"
                        spellCheck={false}
                    />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => {
                                try {
                                    setJsonText(JSON.stringify(JSON.parse(jsonText), null, 4));
                                    toast.success('JSON Prettified');
                                } catch (e) {
                                    toast.error('Cannot prettify invalid JSON');
                                }
                            }}
                            className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
                            title="Prettify JSON"
                        >
                            <Code className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <SaveButton
                    onClick={handleSave}
                    saving={saving}
                    saved={saved}
                    className="w-full sm:w-auto"
                />
            </div>
        </div>
    );
}
