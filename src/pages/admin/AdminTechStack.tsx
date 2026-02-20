import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Braces, ChevronDown, ChevronUp, Copy, ClipboardPaste, AlertTriangle, Check } from 'lucide-react';
import {
    SectionHeader,
    SaveButton,
    TextField,
    ErrorAlert,
    ItemListEditor,
} from '@/components/admin/EditorComponents';
import { useContent } from '@/contexts/ContentContext';

// ─── Types ───

interface TechCategory {
    name: string;
    items: string[];
}

interface UnifiedTechCategory {
    color: string;
    en: TechCategory;
    bn: TechCategory;
}

const DEFAULT_CATEGORY: UnifiedTechCategory = {
    color: '#6366f1',
    en: { name: '', items: [] },
    bn: { name: '', items: [] },
};

// ─── Inline JSON Parser ───

function JsonPanel({
    sectionInfo,
    categories,
    onImport,
}: {
    sectionInfo: { en: { title: string; subtitle: string }; bn: { title: string; subtitle: string } };
    categories: UnifiedTechCategory[];
    onImport: (info: typeof sectionInfo, cats: UnifiedTechCategory[]) => void;
}) {
    const [open, setOpen] = useState(false);
    const [jsonText, setJsonText] = useState('');
    const [parseError, setParseError] = useState('');
    const [copied, setCopied] = useState(false);

    // Build exportable JSON from current form state
    const buildExportJson = () => {
        const enData = {
            title: sectionInfo.en.title,
            subtitle: sectionInfo.en.subtitle,
            categories: categories.map(c => ({
                name: c.en.name,
                color: c.color,
                items: c.en.items,
            })),
        };
        const bnData = {
            title: sectionInfo.bn.title,
            subtitle: sectionInfo.bn.subtitle,
            categories: categories.map(c => ({
                name: c.bn.name,
                color: c.color,
                items: c.bn.items,
            })),
        };
        return JSON.stringify({ en: enData, bn: bnData }, null, 2);
    };

    const handleExport = () => {
        const json = buildExportJson();
        setJsonText(json);
        setParseError('');
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonText || buildExportJson());
            setCopied(true);
            toast.success('JSON copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleImport = () => {
        setParseError('');
        try {
            const parsed = JSON.parse(jsonText);

            // Validate structure
            if (!parsed.en || !parsed.bn) {
                setParseError('JSON must have "en" and "bn" keys at the top level.');
                return;
            }

            const enData = parsed.en;
            const bnData = parsed.bn;

            const newInfo = {
                en: { title: enData.title || '', subtitle: enData.subtitle || '' },
                bn: { title: bnData.title || '', subtitle: bnData.subtitle || '' },
            };

            const enCats = enData.categories || [];
            const bnCats = bnData.categories || [];
            const maxLen = Math.max(enCats.length, bnCats.length);

            const merged: UnifiedTechCategory[] = [];
            for (let i = 0; i < maxLen; i++) {
                const en = enCats[i] || {};
                const bn = bnCats[i] || {};
                merged.push({
                    color: en.color || bn.color || '#6366f1',
                    en: { name: en.name || '', items: en.items || [] },
                    bn: { name: bn.name || '', items: bn.items || [] },
                });
            }

            onImport(newInfo, merged);
            toast.success('JSON imported into form! Click "Save Changes" to persist.');
        } catch (err: any) {
            setParseError(`Invalid JSON: ${err.message}`);
        }
    };

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
                onClick={() => { setOpen(!open); if (!open) handleExport(); }}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-secondary/30 transition-colors cursor-pointer"
            >
                <div className="flex items-center gap-2.5">
                    <Braces className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">JSON Import / Export</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Power Tool</span>
                </div>
                {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>

            {open && (
                <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                        Export the current form data as JSON, edit it externally, or paste JSON below and import it back. <b>Importing fills the form</b> — you still need to click <b>"Save Changes"</b> to persist.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
                        >
                            <Braces className="w-3.5 h-3.5" /> Export Current
                        </button>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                            onClick={handleImport}
                            disabled={!jsonText.trim()}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-all cursor-pointer disabled:opacity-40"
                        >
                            <ClipboardPaste className="w-3.5 h-3.5" /> Import into Form
                        </button>
                    </div>

                    {/* Error */}
                    {parseError && (
                        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{parseError}</span>
                        </div>
                    )}

                    {/* Textarea */}
                    <textarea
                        value={jsonText}
                        onChange={(e) => { setJsonText(e.target.value); setParseError(''); }}
                        placeholder='Paste your JSON here...\n\n{\n  "en": { "title": "...", "subtitle": "...", "categories": [...] },\n  "bn": { "title": "...", "subtitle": "...", "categories": [...] }\n}'
                        rows={16}
                        className="w-full rounded-lg bg-background border border-border p-4 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                        spellCheck={false}
                    />
                </div>
            )}
        </div>
    );
}

// ─── Category Editor (per-marquee row, with EN/BN tabs) ───

function CategoryEditor({
    category,
    update,
}: {
    category: UnifiedTechCategory;
    update: (c: UnifiedTechCategory) => void;
}) {
    const [tab, setTab] = useState<'en' | 'bn'>('en');

    const updateLocStr = (lang: 'en' | 'bn', field: keyof TechCategory, value: string) => {
        if (field === 'items') {
            update({
                ...category,
                [lang]: { ...category[lang], items: value.split(',').map(s => s.trim()).filter(Boolean) },
            });
        } else {
            update({
                ...category,
                [lang]: { ...category[lang], [field]: value },
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                    label="Accent Color (Hex)"
                    value={category.color}
                    onChange={(v) => update({ ...category, color: v })}
                />
                <div className="flex items-end pb-3">
                    <div className="w-full h-10 rounded-lg border border-border" style={{ backgroundColor: category.color }} />
                </div>
            </div>

            {/* Language tabs */}
            <div className="bg-background rounded-xl border border-border overflow-hidden">
                <div className="flex border-b border-border bg-secondary/30">
                    <button
                        onClick={() => setTab('en')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'en'
                            ? 'bg-background border-t-2 border-t-primary text-primary'
                            : 'text-muted-foreground hover:bg-secondary'
                            }`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setTab('bn')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === 'bn'
                            ? 'bg-background border-t-2 border-t-primary text-primary'
                            : 'text-muted-foreground hover:bg-secondary'
                            }`}
                    >
                        বাংলা (Bangla)
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <TextField
                        label={tab === 'en' ? 'Category Name' : 'ক্যাটাগরির নাম'}
                        value={category[tab].name}
                        onChange={(v) => updateLocStr(tab, 'name', v)}
                        lang={tab}
                    />
                    <TextField
                        label={tab === 'en' ? 'Skills (comma separated)' : 'স্কিলসমূহ (কমা দিয়ে আলাদা করুন)'}
                        value={category[tab].items.join(', ')}
                        onChange={(v) => updateLocStr(tab, 'items', v)}
                        multiline
                        lang={tab}
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Main Admin Page ───

export default function AdminTechStack() {
    const { content, updateSection, refreshContent, loading: contentLoading } = useContent();

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<UnifiedTechCategory[]>([]);
    const [sectionInfo, setSectionInfo] = useState({
        en: { title: '', subtitle: '' },
        bn: { title: '', subtitle: '' },
    });

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    // ─── Load & merge EN + BN ───
    useEffect(() => {
        if (contentLoading) return;

        if (!content.en || !content.bn) {
            setCategories([]);
            setLoading(false);
            return;
        }

        const enT = (content.en.techStack as any) || { categories: [] };
        const bnT = (content.bn.techStack as any) || { categories: [] };

        setSectionInfo({
            en: { title: enT.title || '', subtitle: enT.subtitle || '' },
            bn: { title: bnT.title || '', subtitle: bnT.subtitle || '' },
        });

        const enCats = enT.categories || [];
        const bnCats = bnT.categories || [];
        const maxLen = Math.max(enCats.length, bnCats.length);

        const merged: UnifiedTechCategory[] = [];
        for (let i = 0; i < maxLen; i++) {
            const en = enCats[i] || {};
            const bn = bnCats[i] || {};
            merged.push({
                color: en.color || bn.color || '#6366f1',
                en: { name: en.name || '', items: en.items || [] },
                bn: { name: bn.name || '', items: bn.items || [] },
            });
        }

        setCategories(merged);
        setLoading(false);
    }, [content, contentLoading]);

    // ─── JSON Import Handler ───
    const handleJsonImport = (
        info: { en: { title: string; subtitle: string }; bn: { title: string; subtitle: string } },
        cats: UnifiedTechCategory[]
    ) => {
        setSectionInfo(info);
        setCategories(cats);
    };

    // ─── Save ───
    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSaved(false);
        const toastId = toast.loading('Saving Tech Stack...');

        try {
            const enCategories = categories.map((c) => ({
                name: c.en.name,
                color: c.color,
                items: c.en.items,
            }));

            const bnCategories = categories.map((c) => ({
                name: c.bn.name,
                color: c.color,
                items: c.bn.items,
            }));

            const enOk = await updateSection('techStack', 'en', {
                title: sectionInfo.en.title,
                subtitle: sectionInfo.en.subtitle,
                categories: enCategories,
            });

            const bnOk = await updateSection('techStack', 'bn', {
                title: sectionInfo.bn.title,
                subtitle: sectionInfo.bn.subtitle,
                categories: bnCategories,
            });

            if (enOk && bnOk) {
                setSaved(true);
                toast.success('Tech Stack saved!', { id: toastId });
                window.dispatchEvent(
                    new CustomEvent('orbit:save-success', { detail: { section: 'techStack' } })
                );
                await refreshContent();
                setTimeout(() => setSaved(false), 2000);
            } else {
                setError('Error saving Tech Stack. Please try again.');
                toast.error('Error saving Tech Stack', { id: toastId });
            }
        } catch (err) {
            console.error(err);
            setError('Failed to save Tech Stack.');
            toast.error('Save failed', { id: toastId });
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="p-8 text-center text-muted-foreground">
                Loading Tech Stack...
            </div>
        );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <SectionHeader
                    title="Tech Stack Manager (Unified)"
                    description="Edit tech stack categories and marquee items with English & Bangla content in sync."
                />
            </div>

            <ErrorAlert message={error} />

            {/* Section titles (side by side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card rounded-xl p-6 border border-border">
                <div className="space-y-4">
                    <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">English Header</h3>
                    <TextField
                        label="Title"
                        value={sectionInfo.en.title}
                        onChange={(v) =>
                            setSectionInfo({
                                ...sectionInfo,
                                en: { ...sectionInfo.en, title: v },
                            })
                        }
                        lang="en"
                    />
                    <TextField
                        label="Subtitle"
                        value={sectionInfo.en.subtitle}
                        onChange={(v) =>
                            setSectionInfo({
                                ...sectionInfo,
                                en: { ...sectionInfo.en, subtitle: v },
                            })
                        }
                        multiline
                        lang="en"
                    />
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">Bangla Header</h3>
                    <TextField
                        label="শিরোনাম (Title)"
                        value={sectionInfo.bn.title}
                        onChange={(v) =>
                            setSectionInfo({
                                ...sectionInfo,
                                bn: { ...sectionInfo.bn, title: v },
                            })
                        }
                        lang="bn"
                    />
                    <TextField
                        label="সাবটাইটেল (Subtitle)"
                        value={sectionInfo.bn.subtitle}
                        onChange={(v) =>
                            setSectionInfo({
                                ...sectionInfo,
                                bn: { ...sectionInfo.bn, subtitle: v },
                            })
                        }
                        multiline
                        lang="bn"
                    />
                </div>
            </div>

            {/* Categories list */}
            <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">
                    Categories / Marquee Rows ({categories.length})
                </h3>

                <ItemListEditor
                    items={categories as any[]}
                    setItems={setCategories as any}
                    newItem={DEFAULT_CATEGORY as any}
                    addLabel="Add Category Row"
                    getItemLabel={(item: any) =>
                        item.en.name || item.bn.name || 'New Category'
                    }
                    renderItem={(item, _i, update) => (
                        <CategoryEditor category={item as any} update={update as any} />
                    )}
                />
            </div>

            {/* ── Inline JSON Import / Export ── */}
            <JsonPanel
                sectionInfo={sectionInfo}
                categories={categories}
                onImport={handleJsonImport}
            />

            <SaveButton onClick={handleSave} saving={saving} saved={saved} />
        </div>
    );
}
