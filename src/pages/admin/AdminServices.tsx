import { useState, useEffect } from 'react';
import { SectionHeader, LangToggle, SaveButton, TextField, ErrorAlert, ItemListEditor, useSectionEditor, JsonPanel, ColorField } from '@/components/admin/EditorComponents';

export default function AdminServices() {
    const { lang, setLang, saving, saved, error, getData, save } = useSectionEditor('services');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [items, setItems] = useState<{ title: string; desc: string; color?: string }[]>([]);

    // Theme Customization
    const [titleColor, setTitleColor] = useState('');
    const [subtitleColor, setSubtitleColor] = useState('');
    const [cardBg, setCardBg] = useState('');
    const [cardBorder, setCardBorder] = useState('');
    const [iconColor, setIconColor] = useState('');

    useEffect(() => {
        const d = getData();
        if (d) {
            setTitle(d.title || '');
            setSubtitle(d.subtitle || '');
            setItems(d.items || []);

            // Defaults for colors
            setTitleColor(d.titleColor || '#ffffff');
            setSubtitleColor(d.subtitleColor || '#94a3b8');
            setCardBg(d.cardBg || 'rgba(15, 23, 42, 0.3)');
            setCardBorder(d.cardBorder || 'rgba(255, 255, 255, 0.1)');
            setIconColor(d.iconColor || '#6c5ce7');
        }
    }, [getData]);

    const currentPayload = {
        title, subtitle, items,
        titleColor, subtitleColor, cardBg, cardBorder, iconColor
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <SectionHeader title="Services Section" description="Manage offerings and section theme" />
                <LangToggle lang={lang} setLang={setLang} />
            </div>
            <ErrorAlert message={error} />

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Content - 8 cols */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-4 bg-card rounded-2xl p-6 border border-border shadow-sm">
                        <h3 className="font-bold text-foreground mb-1 flex items-center gap-2 text-lg">
                            📝 Header Content
                        </h3>
                        <TextField label="Section Title" value={title} onChange={setTitle} lang={lang} />
                        <TextField label="Section Subtitle" value={subtitle} onChange={setSubtitle} multiline lang={lang} />
                    </div>

                    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                                🛠️ Service Items
                            </h3>
                            <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold">
                                {items.length} Services
                            </span>
                        </div>
                        <ItemListEditor
                            items={items}
                            setItems={setItems}
                            newItem={{ title: '', desc: '', color: iconColor }}
                            addLabel="Add New Service"
                            renderItem={(item, _i, update) => (
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                    <div className="md:col-span-8 space-y-4">
                                        <TextField label="Title" value={item.title} onChange={v => update({ ...item, title: v })} lang={lang} />
                                        <TextField label="Description" value={item.desc} onChange={v => update({ ...item, desc: v })} multiline lang={lang} />
                                    </div>
                                    <div className="md:col-span-4 space-y-4 pt-1">
                                        <label className="text-sm font-bold text-foreground block uppercase tracking-wider text-[10px]">Card Branding</label>
                                        <ColorField label="Primary Color" value={item.color || iconColor} onChange={v => update({ ...item, color: v })} />

                                        {/* Mini Preview */}
                                        <div
                                            className="mt-4 p-4 rounded-xl border border-border/50 transition-all"
                                            style={{
                                                backgroundColor: cardBg,
                                                borderColor: cardBorder,
                                                boxShadow: `0 8px 16px -4px ${(item.color || iconColor)}22`
                                            }}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                                                style={{ backgroundColor: `${(item.color || iconColor)}22` }}
                                            >
                                                <div className="w-4 h-4 rounded" style={{ backgroundColor: (item.color || iconColor) }} />
                                            </div>
                                            <div className="h-3 w-16 rounded bg-foreground/20 mb-1" />
                                            <div className="h-2 w-full rounded bg-foreground/10" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Theme - 4 cols */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-6 bg-card rounded-2xl p-6 border border-border shadow-sm sticky top-6">
                        <h3 className="font-bold text-lg text-foreground mb-1 flex items-center gap-2">
                            🎨 Global Theme
                        </h3>

                        <div className="space-y-5">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-foreground block uppercase tracking-wider text-[10px]">Typography</label>
                                <div className="grid grid-cols-1 gap-4">
                                    <ColorField label="Title" value={titleColor} onChange={setTitleColor} />
                                    <ColorField label="Subtitle" value={subtitleColor} onChange={setSubtitleColor} />
                                </div>
                            </div>

                            <div className="pt-5 border-t border-border space-y-4">
                                <label className="text-sm font-bold text-foreground block uppercase tracking-wider text-[10px]">Card Default Aesthetics</label>
                                <div className="space-y-4">
                                    <ColorField label="Background" value={cardBg} onChange={setCardBg} />
                                    <ColorField label="Border" value={cardBorder} onChange={setCardBorder} />
                                    <ColorField label="Fallback Icon Color" value={iconColor} onChange={setIconColor} />
                                </div>
                            </div>

                            <div className="pt-5 border-t border-border">
                                <label className="text-sm font-bold text-foreground block mb-4 uppercase tracking-wider text-[10px]">Header Preview</label>
                                <div className="text-center p-4 rounded-xl bg-secondary/20 border border-border/50">
                                    <h4 className="font-bold text-sm mb-1" style={{ color: titleColor }}>Section Title</h4>
                                    <p className="text-[10px] opacity-80 line-clamp-1" style={{ color: subtitleColor }}>Section subtitle preview text here...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <SaveButton onClick={() => save(currentPayload)} saving={saving} saved={saved} />
            </div>

            <div className="mt-12 pt-8 border-t border-border">
                <JsonPanel
                    title={`JSON Import / Export (${lang.toUpperCase()})`}
                    data={currentPayload}
                    onImport={(parsed) => {
                        setTitle(parsed.title || '');
                        setSubtitle(parsed.subtitle || '');
                        setItems(parsed.items || []);
                        setTitleColor(parsed.titleColor || '#ffffff');
                        setSubtitleColor(parsed.subtitleColor || '#94a3b8');
                        setCardBg(parsed.cardBg || 'rgba(15, 23, 42, 0.3)');
                        setCardBorder(parsed.cardBorder || 'rgba(255, 255, 255, 0.1)');
                        setIconColor(parsed.iconColor || '#6c5ce7');
                    }}
                />
            </div>
        </div>
    );
}
