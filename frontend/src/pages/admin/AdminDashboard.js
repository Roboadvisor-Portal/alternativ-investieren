import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, X, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const empty = {
  name: "", logo_url: "", asset_classes: ["crowdlending"], min_investment: 100,
  return_min: 5, return_max: 8, return_period: "2020-2024", bafin_regulated: false,
  regulation_note: "", term_min_months: 6, term_max_months: 36, risk_level: "orange",
  secondary_market: false, countries: ["DE"], rating: 4, review_text: "", affiliate_url: "#", is_example: true,
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (user === false) navigate("/admin/login");
  }, [user, navigate]);

  const load = () => api.get("/providers").then((r) => setProviders(r.data)).catch(() => {});
  useEffect(() => { if (user && user !== false) load(); }, [user]);

  const openNew = () => { setForm(empty); setEditing("new"); };
  const openEdit = (p) => { setForm({ ...empty, ...p }); setEditing(p.id); };
  const close = () => setEditing(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    const payload = {
      ...form,
      min_investment: Number(form.min_investment) || null,
      return_min: Number(form.return_min) || null,
      return_max: Number(form.return_max) || null,
      term_min_months: Number(form.term_min_months) || null,
      term_max_months: Number(form.term_max_months) || null,
      rating: Number(form.rating) || null,
    };
    try {
      if (editing === "new") await api.post("/providers", payload);
      else await api.put(`/providers/${editing}`, payload);
      toast.success("Anbieter gespeichert");
      close();
      load();
    } catch (e) {
      toast.error("Speichern fehlgeschlagen");
    }
  };

  const del = async (id) => {
    if (!window.confirm("Anbieter wirklich löschen?")) return;
    try {
      await api.delete(`/providers/${id}`);
      toast.success("Anbieter gelöscht");
      load();
    } catch (e) {
      toast.error("Löschen fehlgeschlagen");
    }
  };

  const toggleAsset = (a) => {
    set("asset_classes", form.asset_classes.includes(a) ? form.asset_classes.filter((x) => x !== a) : [...form.asset_classes, a]);
  };

  if (!user || user === false) return null;

  return (
    <>
      <Seo title="Anbieter-Verwaltung | Alternativ Investieren" description="Interne Verwaltung." path="/admin" />
      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-petrol-dark">Anbieter-Verwaltung</h1>
            <p className="mt-1 text-sm text-slate-500">Angemeldet als {user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button data-testid="admin-new-provider" onClick={openNew} className="gap-2 bg-cta hover:bg-cta-hover"><Plus className="h-4 w-4" /> Neuer Anbieter</Button>
            <Button data-testid="admin-logout" onClick={() => { logout(); navigate("/"); }} variant="outline" className="gap-2"><LogOut className="h-4 w-4" /> Abmelden</Button>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>Rendite-Angaben werden auf den Vergleichsseiten automatisch mit dem Pflicht-Disclaimer („historisch/Modellrechnung, keine Prognose, Totalverlust möglich“) ausgegeben. Neue Karten übernehmen diesen Baustein automatisch.</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-sand text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Anbieter</th>
                <th className="px-4 py-3">Anlageklassen</th>
                <th className="px-4 py-3">Rendite</th>
                <th className="px-4 py-3">Min.</th>
                <th className="px-4 py-3">Beispiel</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {providers.map((p) => (
                <tr key={p.id} data-testid={`admin-row-${p.id}`}>
                  <td className="px-4 py-3 font-semibold text-petrol-dark">{p.name}</td>
                  <td className="px-4 py-3 text-xs">{p.asset_classes.join(", ")}</td>
                  <td className="num px-4 py-3">{p.return_min}–{p.return_max} %</td>
                  <td className="num px-4 py-3">{p.min_investment} €</td>
                  <td className="px-4 py-3">{p.is_example ? "Ja" : "Nein"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button data-testid={`admin-edit-${p.id}`} onClick={() => openEdit(p)} className="rounded-lg p-2 text-slate-400 hover:bg-sand hover:text-petrol"><Pencil className="h-4 w-4" /></button>
                      <button data-testid={`admin-delete-${p.id}`} onClick={() => del(p.id)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {providers.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">Noch keine Anbieter</td></tr>}
            </tbody>
          </table>
        </div>
      </Container>

      {editing && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-petrol-darker/50 p-4 backdrop-blur-sm" onClick={close}>
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()} data-testid="admin-form">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-petrol-dark">{editing === "new" ? "Neuer Anbieter" : "Anbieter bearbeiten"}</h2>
              <button onClick={close} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Anbietername" className="col-span-2"><Input data-testid="form-name" value={form.name} onChange={(e) => set("name", e.target.value)} /></FormField>
              <FormField label="Logo-URL" className="col-span-2"><Input data-testid="form-logo" value={form.logo_url} onChange={(e) => set("logo_url", e.target.value)} placeholder="https://…" /></FormField>
              <FormField label="Anlageklassen" className="col-span-2">
                <div className="flex gap-2">
                  {[["crowdlending", "Crowdlending"], ["immobilien-crowdinvesting", "Immobilien-CI"]].map(([v, l]) => (
                    <button key={v} type="button" onClick={() => toggleAsset(v)} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${form.asset_classes.includes(v) ? "border-petrol bg-petrol text-white" : "border-slate-200 text-slate-600"}`}>{l}</button>
                  ))}
                </div>
              </FormField>
              <FormField label="Rendite min (%)"><Input data-testid="form-return-min" type="number" value={form.return_min} onChange={(e) => set("return_min", e.target.value)} /></FormField>
              <FormField label="Rendite max (%)"><Input data-testid="form-return-max" type="number" value={form.return_max} onChange={(e) => set("return_max", e.target.value)} /></FormField>
              <FormField label="Zeitraum"><Input value={form.return_period} onChange={(e) => set("return_period", e.target.value)} placeholder="2020-2024" /></FormField>
              <FormField label="Mindestanlage (€)"><Input data-testid="form-min" type="number" value={form.min_investment} onChange={(e) => set("min_investment", e.target.value)} /></FormField>
              <FormField label="Laufzeit min (Monate)"><Input type="number" value={form.term_min_months} onChange={(e) => set("term_min_months", e.target.value)} /></FormField>
              <FormField label="Laufzeit max (Monate)"><Input type="number" value={form.term_max_months} onChange={(e) => set("term_max_months", e.target.value)} /></FormField>
              <FormField label="Risiko">
                <Select value={form.risk_level} onValueChange={(v) => set("risk_level", v)}>
                  <SelectTrigger data-testid="form-risk"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="green">Gering (grün)</SelectItem>
                    <SelectItem value="yellow">Moderat (gelb)</SelectItem>
                    <SelectItem value="orange">Erhöht (orange)</SelectItem>
                    <SelectItem value="red">Hoch (rot)</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Bewertung (0–5)"><Input type="number" step="0.1" value={form.rating} onChange={(e) => set("rating", e.target.value)} /></FormField>
              <FormField label="Regulierungshinweis" className="col-span-2"><Input value={form.regulation_note} onChange={(e) => set("regulation_note", e.target.value)} placeholder="z. B. ECSP-Lizenz (EU)" /></FormField>
              <FormField label="Affiliate-URL" className="col-span-2"><Input data-testid="form-affiliate" value={form.affiliate_url} onChange={(e) => set("affiliate_url", e.target.value)} placeholder="https://…" /></FormField>
              <FormField label="Kurzbewertung (redaktionell)" className="col-span-2"><Textarea data-testid="form-review" value={form.review_text} onChange={(e) => set("review_text", e.target.value)} rows={3} /></FormField>
              <div className="col-span-2 flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm"><Switch checked={form.bafin_regulated} onCheckedChange={(v) => set("bafin_regulated", v)} /> BaFin-reguliert</label>
                <label className="flex items-center gap-2 text-sm"><Switch checked={form.secondary_market} onCheckedChange={(v) => set("secondary_market", v)} /> Zweitmarkt</label>
                <label className="flex items-center gap-2 text-sm"><Switch checked={form.is_example} onCheckedChange={(v) => set("is_example", v)} /> Beispieldaten</label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={close} variant="outline">Abbrechen</Button>
              <Button data-testid="form-save" onClick={save} className="bg-cta hover:bg-cta-hover">Speichern</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FormField({ label, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-semibold text-slate-600">{label}</label>
      {children}
    </div>
  );
}
