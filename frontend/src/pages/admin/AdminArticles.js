import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus, Pencil, Trash2, LogOut, ArrowLeft, ArrowUp, ArrowDown, Save, X,
  Sparkles, Loader2, Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api, API, formatApiErrorDetail } from "@/lib/api";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const emptyArticle = {
  slug: "", title: "", excerpt: "", metaTitle: "", metaDescription: "",
  category: "crowdlending", tags: [], author: "Markus G",
  published: new Date().toISOString().slice(0, 10), updated: new Date().toISOString().slice(0, 10),
  readingTime: 6, status: "draft", heroImage: "", heroAlt: "", answerFirst: "",
  blocks: [{ type: "p", text: "" }], sources: [],
};

const slugify = (s) =>
  s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const blockTypes = [
  { v: "p", l: "Absatz" },
  { v: "h2", l: "Überschrift (H2)" },
  { v: "h3", l: "Unterüberschrift (H3)" },
  { v: "ul", l: "Aufzählung" },
  { v: "chart", l: "Diagramm" },
  { v: "flow", l: "Ablauf-Grafik" },
  { v: "rank", l: "Rangfolge-Grafik" },
];

export default function AdminArticles() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(null); // null | "new" | id
  const [form, setForm] = useState(emptyArticle);
  const [genPrompt, setGenPrompt] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (user === false) navigate("/admin/login"); }, [user, navigate]);

  const load = () => api.get("/admin/articles").then((r) => setArticles(r.data)).catch(() => {});
  useEffect(() => { if (user && user !== false) load(); }, [user]);

  const openNew = () => { setForm(emptyArticle); setGenPrompt(""); setEditing("new"); };
  const openEdit = (a) => { setForm({ ...emptyArticle, ...a }); setGenPrompt(""); setEditing(a.id); };
  const close = () => setEditing(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setTitle = (v) => setForm((f) => ({ ...f, title: v, slug: editing === "new" && (!f.slug || f.slug === slugify(f.title)) ? slugify(v) : f.slug }));

  // ---- block helpers ----
  const setBlock = (i, patch) => setForm((f) => ({ ...f, blocks: f.blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) }));
  const defaultForType = (t) => {
    if (t === "ul") return { type: "ul", items: [""] };
    if (t === "chart") return { type: "chart", chart: "marktvolumen" };
    if (t === "flow") return { type: "flow", steps: [{ title: "", text: "" }] };
    if (t === "rank") return { type: "rank", steps: [{ rank: "1", title: "", note: "", highlight: false }] };
    return { type: t, text: "" };
  };
  const changeBlockType = (i, t) => setForm((f) => ({ ...f, blocks: f.blocks.map((b, j) => (j === i ? defaultForType(t) : b)) }));
  const addBlock = () => setForm((f) => ({ ...f, blocks: [...f.blocks, { type: "p", text: "" }] }));
  const removeBlock = (i) => setForm((f) => ({ ...f, blocks: f.blocks.filter((_, j) => j !== i) }));
  const moveBlock = (i, dir) => setForm((f) => {
    const arr = [...f.blocks]; const t = i + dir;
    if (t < 0 || t >= arr.length) return f;
    [arr[i], arr[t]] = [arr[t], arr[i]];
    return { ...f, blocks: arr };
  });

  const generateImage = async () => {
    if (!genPrompt.trim()) { toast.error("Bitte einen Bild-Prompt eingeben"); return; }
    setGenLoading(true);
    try {
      const { data } = await api.post("/admin/generate-image", { prompt: genPrompt });
      set("heroImage", `${API}/media/${data.media_path}`);
      toast.success("Bild generiert und gespeichert");
    } catch (e) {
      toast.error(formatApiErrorDetail(e.response?.data?.detail) || "Bildgenerierung fehlgeschlagen");
    } finally {
      setGenLoading(false);
    }
  };

  const save = async () => {
    if (!form.title.trim() || !form.slug.trim()) { toast.error("Titel und Slug sind erforderlich"); return; }
    setSaving(true);
    const payload = {
      ...form,
      readingTime: Number(form.readingTime) || 5,
      tags: Array.isArray(form.tags) ? form.tags : String(form.tags).split(",").map((t) => t.trim()).filter(Boolean),
      sources: Array.isArray(form.sources) ? form.sources : String(form.sources).split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editing === "new") await api.post("/articles", payload);
      else await api.put(`/articles/${editing}`, payload);
      toast.success("Artikel gespeichert");
      close();
      load();
    } catch (e) {
      toast.error(formatApiErrorDetail(e.response?.data?.detail) || "Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Artikel wirklich löschen?")) return;
    try { await api.delete(`/articles/${id}`); toast.success("Artikel gelöscht"); load(); }
    catch { toast.error("Löschen fehlgeschlagen"); }
  };

  if (!user || user === false) return null;

  return (
    <>
      <Seo title="Artikel-Verwaltung | Alternativ Investieren" description="Interne Blog-Verwaltung." path="/admin/artikel" />
      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-petrol-dark">Artikel-Verwaltung</h1>
            <p className="mt-1 text-sm text-slate-500">Angemeldet als {user.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button data-testid="admin-new-article" onClick={openNew} className="gap-2 bg-cta hover:bg-cta-hover"><Plus className="h-4 w-4" /> Neuer Artikel</Button>
            <Button data-testid="admin-goto-providers" onClick={() => navigate("/admin")} variant="outline" className="gap-2"><Users className="h-4 w-4" /> Anbieter</Button>
            <Button data-testid="admin-logout" onClick={() => { logout(); navigate("/"); }} variant="outline" className="gap-2"><LogOut className="h-4 w-4" /> Abmelden</Button>
          </div>
        </div>

        {!editing && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-sand text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Titel</th>
                  <th className="px-4 py-3">Kategorie</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Datum</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((a) => (
                  <tr key={a.id} data-testid={`admin-article-row-${a.slug}`}>
                    <td className="px-4 py-3 font-semibold text-petrol-dark">{a.title}</td>
                    <td className="px-4 py-3 text-xs">{a.category}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${a.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {a.status === "published" ? "Veröffentlicht" : "Entwurf"}
                      </span>
                    </td>
                    <td className="num px-4 py-3 text-xs">{a.published}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button data-testid={`admin-article-edit-${a.slug}`} onClick={() => openEdit(a)} className="rounded-lg p-2 text-slate-400 hover:bg-sand hover:text-petrol"><Pencil className="h-4 w-4" /></button>
                        <button data-testid={`admin-article-delete-${a.slug}`} onClick={() => del(a.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Noch keine Artikel</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <div className="mt-6" data-testid="admin-article-editor">
            <button onClick={close} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-petrol"><ArrowLeft className="h-4 w-4" /> Zurück zur Liste</button>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main content */}
              <div className="space-y-4 lg:col-span-2">
                <Field label="Titel"><Input data-testid="article-title" value={form.title} onChange={(e) => setTitle(e.target.value)} /></Field>
                <Field label="Slug (URL)"><Input data-testid="article-slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="mein-artikel" /></Field>
                <Field label="Kurzbeschreibung (Excerpt)"><Textarea data-testid="article-excerpt" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></Field>
                <Field label="Antwort zuerst (GEO-Kernaussage)"><Textarea data-testid="article-answerfirst" rows={4} value={form.answerFirst} onChange={(e) => set("answerFirst", e.target.value)} /></Field>

                {/* Blocks */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Inhalt (Blöcke)</p>
                    <Button size="sm" variant="outline" onClick={addBlock} data-testid="article-add-block" className="gap-1"><Plus className="h-3.5 w-3.5" /> Block</Button>
                  </div>
                  <div className="space-y-4">
                    {form.blocks.map((b, i) => (
                      <BlockCard key={i} block={b} index={i} total={form.blocks.length}
                        onType={(t) => changeBlockType(i, t)} onChange={(patch) => setBlock(i, patch)}
                        onMove={(d) => moveBlock(i, d)} onRemove={() => removeBlock(i)} />
                    ))}
                  </div>
                </div>

                <Field label="Quellen (eine pro Zeile)">
                  <Textarea data-testid="article-sources" rows={3}
                    value={Array.isArray(form.sources) ? form.sources.join("\n") : form.sources}
                    onChange={(e) => set("sources", e.target.value.split("\n"))} />
                </Field>
              </div>

              {/* Sidebar meta */}
              <aside className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex justify-end">
                    <Button data-testid="article-save" onClick={save} disabled={saving} className="w-full gap-2 bg-cta hover:bg-cta-hover">
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Speichern
                    </Button>
                  </div>
                </div>
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <Field label="Status">
                    <Select value={form.status} onValueChange={(v) => set("status", v)}>
                      <SelectTrigger data-testid="article-status"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Veröffentlicht</SelectItem>
                        <SelectItem value="draft">Entwurf</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Kategorie">
                    <Select value={form.category} onValueChange={(v) => set("category", v)}>
                      <SelectTrigger data-testid="article-category"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crowdlending">Crowdlending</SelectItem>
                        <SelectItem value="immobilien-crowdinvesting">Immobilien-Crowdinvesting</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Tags (kommagetrennt)">
                    <Input data-testid="article-tags"
                      value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
                      onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
                  </Field>
                  <Field label="Autor"><Input value={form.author} onChange={(e) => set("author", e.target.value)} /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Veröffentlicht"><Input type="date" value={form.published} onChange={(e) => set("published", e.target.value)} /></Field>
                    <Field label="Aktualisiert"><Input type="date" value={form.updated} onChange={(e) => set("updated", e.target.value)} /></Field>
                  </div>
                  <Field label="Lesezeit (Min.)"><Input type="number" value={form.readingTime} onChange={(e) => set("readingTime", e.target.value)} /></Field>
                </div>

                {/* Hero image + AI */}
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Beitragsbild</p>
                  {form.heroImage && <img src={form.heroImage} alt="Vorschau" className="aspect-[16/9] w-full rounded-lg object-cover" data-testid="article-hero-preview" />}
                  <Field label="Bild-URL"><Input data-testid="article-hero-url" value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} placeholder="https://…" /></Field>
                  <Field label="Alt-Text"><Input value={form.heroAlt} onChange={(e) => set("heroAlt", e.target.value)} /></Field>
                  <div className="rounded-lg border border-dashed border-petrol/30 bg-sand p-3">
                    <p className="mb-2 text-xs font-semibold text-petrol-dark">KI-Bild generieren</p>
                    <Textarea data-testid="article-ai-prompt" rows={2} value={genPrompt} onChange={(e) => setGenPrompt(e.target.value)} placeholder="z. B. Ruhige, seriöse Illustration zum Thema Nachrangdarlehen, gedämpfte Petrol-Töne" className="mb-2 bg-white" />
                    <Button data-testid="article-ai-generate" onClick={generateImage} disabled={genLoading} size="sm" variant="outline" className="w-full gap-2">
                      {genLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Bild generieren
                    </Button>
                  </div>
                </div>

                {/* SEO */}
                <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">SEO</p>
                  <Field label="Meta-Titel"><Input data-testid="article-meta-title" value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} /></Field>
                  <Field label="Meta-Beschreibung"><Textarea data-testid="article-meta-desc" rows={3} value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} /></Field>
                </div>
              </aside>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

function BlockCard({ block, index, total, onType, onChange, onMove, onRemove }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" data-testid={`block-${index}`}>
      <div className="mb-2 flex items-center gap-2">
        <div className="w-48">
          <Select value={block.type} onValueChange={onType}>
            <SelectTrigger className="h-8 bg-white text-xs" data-testid={`block-type-${index}`}><SelectValue /></SelectTrigger>
            <SelectContent>
              {blockTypes.map((t) => <SelectItem key={t.v} value={t.v}>{t.l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto flex gap-1">
          <button onClick={() => onMove(-1)} disabled={index === 0} className="rounded p-1.5 text-slate-400 hover:bg-white disabled:opacity-30"><ArrowUp className="h-4 w-4" /></button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} className="rounded p-1.5 text-slate-400 hover:bg-white disabled:opacity-30"><ArrowDown className="h-4 w-4" /></button>
          <button onClick={onRemove} data-testid={`block-remove-${index}`} className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><X className="h-4 w-4" /></button>
        </div>
      </div>

      {(block.type === "p") && (
        <Textarea rows={3} value={block.text || ""} onChange={(e) => onChange({ text: e.target.value })} data-testid={`block-text-${index}`} className="bg-white" placeholder="Text… interne Links via {link:slug:Anzeigetext}" />
      )}
      {(block.type === "h2" || block.type === "h3") && (
        <Input value={block.text || ""} onChange={(e) => onChange({ text: e.target.value })} data-testid={`block-text-${index}`} className="bg-white" placeholder="Überschrift" />
      )}
      {block.type === "ul" && (
        <ListEditor items={block.items || [""]} onChange={(items) => onChange({ items })} />
      )}
      {block.type === "chart" && (
        <Select value={block.chart || "marktvolumen"} onValueChange={(v) => onChange({ chart: v })}>
          <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="marktvolumen">Marktvolumen-Diagramm</SelectItem></SelectContent>
        </Select>
      )}
      {block.type === "flow" && (
        <StepEditor steps={block.steps || []} fields={[["title", "Titel"], ["text", "Text"]]} onChange={(steps) => onChange({ steps })} defaultStep={{ title: "", text: "" }} />
      )}
      {block.type === "rank" && (
        <StepEditor steps={block.steps || []} fields={[["rank", "Rang"], ["title", "Titel"], ["note", "Notiz"]]} hasHighlight onChange={(steps) => onChange({ steps })} defaultStep={{ rank: "", title: "", note: "", highlight: false }} />
      )}
    </div>
  );
}

function ListEditor({ items, onChange }) {
  const upd = (i, v) => onChange(items.map((it, j) => (j === i ? v : it)));
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <Input value={it} onChange={(e) => upd(i, e.target.value)} className="bg-white" placeholder={`Punkt ${i + 1}`} />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded p-2 text-slate-400 hover:text-red-500"><X className="h-4 w-4" /></button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={() => onChange([...items, ""])} className="gap-1"><Plus className="h-3.5 w-3.5" /> Punkt</Button>
    </div>
  );
}

function StepEditor({ steps, fields, onChange, defaultStep, hasHighlight }) {
  const upd = (i, k, v) => onChange(steps.map((s, j) => (j === i ? { ...s, [k]: v } : s)));
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={i} className="rounded-lg border border-slate-200 bg-white p-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Schritt {i + 1}</span>
            <button onClick={() => onChange(steps.filter((_, j) => j !== i))} className="rounded p-1 text-slate-400 hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
          </div>
          {fields.map(([k, l]) => (
            <Input key={k} value={s[k] || ""} onChange={(e) => upd(i, k, e.target.value)} className="mt-1" placeholder={l} />
          ))}
          {hasHighlight && (
            <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <Switch checked={!!s.highlight} onCheckedChange={(v) => upd(i, "highlight", v)} /> Hervorheben (rot)
            </label>
          )}
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={() => onChange([...steps, { ...defaultStep }])} className="gap-1"><Plus className="h-3.5 w-3.5" /> Schritt</Button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
      {children}
    </div>
  );
}
