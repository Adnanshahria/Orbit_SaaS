import { useState, useEffect } from 'react';
import { SectionHeader, LangToggle, SaveButton, TextField, ErrorAlert, ItemListEditor, useSectionEditor, JsonPanel, ColorField } from '@/components/admin/EditorComponents';

export default function AdminServices() {
    const { lang, setLang, saving, saved, error, getData, save } = useSectionEditor('services');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [items, setItems] = useState<{
        title: string;
        desc: string;
        color?: string; // Accent color
        bg?: string;    // Custom background
        border?: string; // Custom border
    }[]>([]);

    // Global Theme (Defaults)
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

            // Defaults for global theme
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
        <div className="space-y-8 max-w-7xl mx-auto pb-20">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <SectionHeader
                    title="Services Designer"
                    description="Craft unique digital experiences with granular per-card branding."
                />
                <div className="flex items-center gap-3">
                    <LangToggle lang={lang} setLang={setLang} />
                    <SaveButton onClick={() => save(currentPayload)} saving={saving} saved={saved} />
                </div>
            </div>

            <ErrorAlert message={error} />

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Content & Individual Card Designers - 8 cols */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Section Header Editor */}
                    <div className="bg-card rounded-[2rem] p-8 border border-border shadow-xl shadow-primary/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="text-xl">✍️</span>
                            </div>
                            <h3 className="font-black text-xl text-foreground">Header Settings</h3>
                        </div>
                        <div className="space-y-6">
                            <TextField label="Section Title" value={title} onChange={setTitle} lang={lang} />
                            <TextField label="Section Subtitle" value={subtitle} onChange={setSubtitle} multiline lang={lang} />
                        </div>
                    </div>

                    {/* Service Items Designer */}
                    <div className="bg-card rounded-[2rem] p-8 border border-border shadow-xl shadow-primary/5">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <span className="text-xl">💠</span>
                                </div>
                                <h3 className="font-black text-xl text-foreground">Service Customizer</h3>
                            </div>
                            <div className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                                {items.length} Active Modules
                            </div>
                        </div>

                        <ItemListEditor
                            items={items}
                            setItems={setItems}
                            newItem={{ title: '', desc: '', color: iconColor, bg: cardBg, border: cardBorder }}
                            addLabel="Add Custom Service"
                            renderItem={(item, _i, update) => (
                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start py-4">
                                    {/* Text Content */}
                                    <div className="xl:col-span-12 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <TextField label="Module Title" value={item.title} onChange={v => update({ ...item, title: v })} lang={lang} />
                                            </div>
                                        </div>
                                        <TextField label="Capability Description" value={item.desc} onChange={v => update({ ...item, desc: v })} multiline lang={lang} />
                                    </div>

                                    {/* Visual branding row */}
                                    <div className="xl:col-span-12 pt-4 border-t border-border/50">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">Indivdiual Card Design System</h4>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                            {/* Design Controls */}
                                            <div className="grid grid-cols-1 gap-5">
                                                <ColorField label="Accent (Icon & Glow)" value={item.color || iconColor} onChange={v => update({ ...item, color: v })} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ColorField label="Card Base" value={item.bg || cardBg} onChange={v => update({ ...item, bg: v })} />
                                                    <ColorField label="Card Edge" value={item.border || cardBorder} onChange={v => update({ ...item, border: v })} />
                                                </div>
                                            </div>

                                            {/* High Fidelity Preview */}
                                            <div className="relative group">
                                                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div
                                                    className="relative p-7 rounded-[2.5rem] border transition-all duration-500 shadow-2xl"
                                                    style={{
                                                        backgroundColor: item.bg || cardBg,
                                                        borderColor: item.border || cardBorder,
                                                        boxShadow: `0 20px 40px -10px ${(item.color || iconColor)}33`
                                                    }}
                                                >
                                                    <div
                                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                                                        style={{
                                                            backgroundColor: `${(item.color || iconColor)}15`,
                                                            boxShadow: `inset 0 0 10px ${(item.color || iconColor)}10`
                                                        }}
                                                    >
                                                        <div className="w-6 h-6 rounded-md" style={{ backgroundColor: (item.color || iconColor) }} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="h-4 w-3/4 rounded-full bg-foreground/20" />
                                                        <div className="h-2 w-full rounded-full bg-foreground/10" />
                                                        <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
                                                    </div>
                                                </div>
                                                <div className="absolute top-2 right-2 text-[9px] font-black bg-foreground text-background px-2 py-0.5 rounded-full uppercase">Live Preview</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

                {/* Global Theme & Utilities - 4 cols */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-card rounded-[2rem] p-8 border border-border shadow-2xl shadow-primary/5 sticky top-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <span className="text-xl">🍭</span>
                            </div>
                            <h3 className="font-black text-xl text-foreground">Global Defaults</h3>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                    <span>Typography</span>
                                    <div className="h-px flex-1 bg-border ml-4" />
                                </label>
                                <div className="space-y-4">
                                    <ColorField label="Header Title" value={titleColor} onChange={setTitleColor} />
                                    <ColorField label="Header Subtitle" value={subtitleColor} onChange={setSubtitleColor} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                    <span>Base Aesthetics</span>
                                    <div className="h-px flex-1 bg-border ml-4" />
                                </label>
                                <div className="space-y-4">
                                    <ColorField label="Fallback Background" value={cardBg} onChange={setCardBg} />
                                    <ColorField label="Fallback Border" value={cardBorder} onChange={setCardBorder} />
                                    <ColorField label="Fallback Accent" value={iconColor} onChange={setIconColor} />
                                </div>
                            </div>

                            {/* Section Preview */}
                            <div className="pt-4">
                                <div className="p-6 rounded-[2rem] bg-secondary/30 border border-border/50 text-center">
                                    <h4 className="font-black text-lg mb-2" style={{ color: titleColor }}>Section Branding</h4>
                                    <p className="text-xs font-medium opacity-60 leading-relaxed" style={{ color: subtitleColor }}>
                                        Global colors define the baseline for all headers and fallback styles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-border pt-12">
                <JsonPanel
                    title={`Master Blueprint (${lang.toUpperCase()})`}
                    description="Export the complete services 디자인 system as JSON."
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
