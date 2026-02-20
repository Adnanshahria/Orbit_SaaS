import { useState, useEffect } from 'react';
import { SectionHeader, LangToggle, SaveButton, TextField, ErrorAlert, ItemListEditor, useSectionEditor, JsonPanel, ColorField } from '@/components/admin/EditorComponents';
import { Settings2, Paintbrush, Palette, Maximize2, Minimize2 } from 'lucide-react';

export default function AdminServices() {
    const { lang, setLang, saving, saved, error, getData, save } = useSectionEditor('services');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [items, setItems] = useState<{
        title: string;
        desc: string;
        color?: string;
        bg?: string;
        border?: string;
    }[]>([]);

    // Global
    const [titleColor, setTitleColor] = useState('');
    const [subtitleColor, setSubtitleColor] = useState('');
    const [cardBg, setCardBg] = useState('');
    const [cardBorder, setCardBorder] = useState('');
    const [iconColor, setIconColor] = useState('');

    // Collapsed section toggles
    const [showGlobal, setShowGlobal] = useState(false);

    useEffect(() => {
        const d = getData();
        if (d) {
            setTitle(d.title || '');
            setSubtitle(d.subtitle || '');
            setItems(d.items || []);
            setTitleColor(d.titleColor || '#ffffff');
            setSubtitleColor(d.subtitleColor || '#94a3b8');
            setCardBg(d.cardBg || 'rgba(15, 23, 42, 0.45)');
            setCardBorder(d.cardBorder || 'rgba(255, 255, 255, 0.08)');
            setIconColor(d.iconColor || '#6c5ce7');
        }
    }, [getData]);

    const payload = {
        title, subtitle, items,
        titleColor, subtitleColor, cardBg, cardBorder, iconColor,
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-24 relative">
            {/* ── Sticky Top Bar ── */}
            <div className="sticky top-0 z-50 -mx-4 px-4 py-4 md:-mx-8 md:px-8 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <SectionHeader
                    title="Services Configuration"
                    description="Design modules and control aesthetic properties."
                />
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <LangToggle lang={lang} setLang={setLang} />
                    <SaveButton onClick={() => save(payload)} saving={saving} saved={saved} />
                </div>
            </div>

            <ErrorAlert message={error} />

            {/* ── Section Header Fields ── */}
            <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings2 className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">Section Identity</h3>
                </div>
                <div className="grid gap-5">
                    <TextField label="Main Title" value={title} onChange={setTitle} lang={lang} />
                    <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} multiline lang={lang} />
                </div>
            </div>

            {/* ── Service Items ── */}
            <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <Paintbrush className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">Service Modules</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Manage individual cards and their visual identity.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-secondary text-foreground rounded-lg border border-border/50">
                        Total Modules: <span className="text-primary">{items.length}</span>
                    </div>
                </div>

                <ItemListEditor
                    items={items}
                    setItems={setItems}
                    newItem={{ title: '', desc: '', color: iconColor }}
                    addLabel="Add New Service Module"
                    renderItem={(item, _i, update) => (
                        <div className="group relative bg-background rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                            <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground opacity-50">
                                ID: {String(_i + 1).padStart(2, '0')}
                            </div>

                            {/* Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 pr-12">
                                <TextField label="Module Title" value={item.title} onChange={v => update({ ...item, title: v })} lang={lang} />
                                <TextField label="Description" value={item.desc} onChange={v => update({ ...item, desc: v })} multiline lang={lang} />
                            </div>

                            {/* Accent Color Picker Row */}
                            <div className="flex items-center gap-6 flex-wrap bg-secondary/30 p-4 rounded-xl border border-border/40">
                                <div className="w-48">
                                    <ColorField label="Primary Accent" value={item.color || iconColor} onChange={v => update({ ...item, color: v })} />
                                </div>

                                {/* Micro Preview Card */}
                                <div className="flex-1 flex items-center gap-4 border-l border-border/50 pl-6">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-16">Preview</span>
                                    <div
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg border shadow-sm w-48 transition-colors"
                                        style={{
                                            backgroundColor: item.bg || cardBg,
                                            borderColor: item.border || cardBorder,
                                        }}
                                    >
                                        <div
                                            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: `${(item.color || iconColor)}15` }}
                                        >
                                            <div className="w-2.5 h-2.5 rounded-sm transition-colors" style={{ backgroundColor: item.color || iconColor }} />
                                        </div>
                                        <div className="space-y-1.5 flex-1">
                                            <div className="h-1.5 w-full rounded-full bg-foreground/20" />
                                            <div className="h-1 w-3/4 rounded-full bg-foreground/10" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="text-[11px] font-bold text-foreground bg-background border border-border hover:border-primary/50 hover:text-primary px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-sm"
                                    onClick={() => {
                                        const el = document.getElementById(`adv-${_i}`);
                                        if (el) el.classList.toggle('hidden');
                                    }}
                                >
                                    <Palette className="w-3 h-3" />
                                    Deep Customization
                                </button>
                            </div>

                            {/* Advanced Appearance (Hidden by default) */}
                            <div id={`adv-${_i}`} className="hidden pt-6 mt-4 border-t border-border/30">
                                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 mb-4">
                                    <p className="text-xs text-orange-600/80 font-medium">
                                        Override the global background and border colors specifically for this module. Leave empty or click reset to use global defaults.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <ColorField label="Module Background (CSS String)" value={item.bg || cardBg} onChange={v => update({ ...item, bg: v })} />
                                        <button className="text-[10px] text-muted-foreground hover:text-foreground font-medium underline underline-offset-2 transition-colors" onClick={() => update({ ...item, bg: undefined })}>Reset Base</button>
                                    </div>
                                    <div className="space-y-2">
                                        <ColorField label="Module Border" value={item.border || cardBorder} onChange={v => update({ ...item, border: v })} />
                                        <button className="text-[10px] text-muted-foreground hover:text-foreground font-medium underline underline-offset-2 transition-colors" onClick={() => update({ ...item, border: undefined })}>Reset Edge</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>

            {/* ── Global Theme (Collapsed by default) ── */}
            <div className={`bg-gradient-to-br from-card to-card/50 rounded-2xl border ${showGlobal ? 'border-primary/30 shadow-md shadow-primary/5' : 'border-border shadow-sm'} overflow-hidden transition-all duration-300`}>
                <button
                    type="button"
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/40 transition-colors"
                    onClick={() => setShowGlobal(!showGlobal)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${showGlobal ? 'bg-primary/20' : 'bg-primary/10'}`}>
                            <Palette className={`w-4 h-4 ${showGlobal ? 'text-primary' : 'text-primary/70'}`} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-foreground">Global Aesthetics</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">Base fallbacks and typography colors.</p>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground">
                        {showGlobal ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </div>
                </button>

                {showGlobal && (
                    <div className="p-6 border-t border-border/50 bg-background/50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="md:col-span-3 pb-3 border-b border-border/30">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Typography Colors</h4>
                            </div>
                            <ColorField label="Header Title" value={titleColor} onChange={setTitleColor} />
                            <ColorField label="Header Subtitle" value={subtitleColor} onChange={setSubtitleColor} />
                            <ColorField label="Default Accent" value={iconColor} onChange={setIconColor} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 pb-3 border-b border-border/30">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Base Structure</h4>
                            </div>
                            <ColorField label="Fallback Background" value={cardBg} onChange={setCardBg} />
                            <ColorField label="Fallback Border" value={cardBorder} onChange={setCardBorder} />
                        </div>
                    </div>
                )}
            </div>

            {/* ── JSON Blueprint ── */}
            <div className="pt-8 border-t border-border">
                <JsonPanel
                    title={`Master JSON Blueprint (${lang.toUpperCase()})`}
                    description="Directly edit the raw configuration data for advanced templating."
                    data={payload}
                    onImport={(parsed) => {
                        setTitle(parsed.title || '');
                        setSubtitle(parsed.subtitle || '');
                        setItems(parsed.items || []);
                        setTitleColor(parsed.titleColor || '#ffffff');
                        setSubtitleColor(parsed.subtitleColor || '#94a3b8');
                        setCardBg(parsed.cardBg || 'rgba(15, 23, 42, 0.45)');
                        setCardBorder(parsed.cardBorder || 'rgba(255, 255, 255, 0.08)');
                        setIconColor(parsed.iconColor || '#6c5ce7');
                    }}
                />
            </div>
        </div>
    );
}
