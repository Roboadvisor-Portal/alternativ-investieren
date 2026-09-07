import React, { useState, useMemo } from "react";
import { PieChart as PieIcon, Plus, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Seo, breadcrumbSchema, faqSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RechnerShell, Field, eur } from "@/components/calculators/RechnerShell";
import { RechnerContent } from "@/components/RechnerContent";
import { rechnerContent } from "@/data/rechnerContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PALETTE = ["#133E46", "#C2610C", "#1D5B67", "#D97706", "#0B252C", "#64748B", "#15803D", "#A16207"];

export default function DiversifikationRechner() {
  const [rows, setRows] = useState([
    { name: "Plattform A", amount: 4000 },
    { name: "Plattform B", amount: 1000 },
  ]);

  const total = rows.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const update = (i, key, val) => setRows((r) => r.map((row, j) => (j === i ? { ...row, [key]: val } : row)));
  const add = () => setRows((r) => [...r, { name: `Plattform ${String.fromCharCode(65 + r.length)}`, amount: 1000 }]);
  const remove = (i) => setRows((r) => r.filter((_, j) => j !== i));

  const { hhi, maxShare, level, chart } = useMemo(() => {
    if (total === 0) return { hhi: 0, maxShare: 0, level: "none", chart: [] };
    const shares = rows.map((r) => (Number(r.amount) || 0) / total);
    const hhi = shares.reduce((s, sh) => s + sh * sh, 0);
    const maxShare = Math.max(...shares);
    let level = "green";
    if (maxShare >= 0.6 || hhi >= 0.5) level = "red";
    else if (maxShare >= 0.4 || hhi >= 0.3) level = "orange";
    else if (maxShare >= 0.25 || hhi >= 0.2) level = "yellow";
    const chart = rows.map((r, i) => ({ name: r.name, value: Number(r.amount) || 0, color: PALETTE[i % PALETTE.length] }));
    return { hhi, maxShare, level, chart };
  }, [rows, total]);

  const advice = {
    green: { icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50 border-emerald-200", title: "Gut gestreut", text: "Ihr Kapital ist breit über mehrere Positionen verteilt. Ein einzelner Ausfall trifft nur einen kleinen Teil des Portfolios." },
    yellow: { icon: AlertTriangle, color: "text-yellow-800 bg-yellow-50 border-yellow-300", title: "Leichte Konzentration", text: "Eine Position hat spürbares Gewicht. Prüfen Sie, ob eine feinere Streuung über mehr Projekte/Plattformen sinnvoll ist." },
    orange: { icon: AlertTriangle, color: "text-orange-800 bg-orange-50 border-orange-300", title: "Erhöhtes Klumpenrisiko", text: "Ein großer Teil des Kapitals steckt in wenigen Positionen. Fällt eine davon aus, ist der Verlust überproportional groß." },
    red: { icon: AlertTriangle, color: "text-red-800 bg-red-50 border-red-300", title: "Hohes Klumpenrisiko", text: "Ihr Kapital ist stark auf eine einzige Position konzentriert. Bei alternativen Investments gilt: konsequent über viele Projekte, Anbieter und Anlageklassen streuen." },
    none: { icon: AlertTriangle, color: "text-slate-600 bg-slate-50 border-slate-200", title: "Bitte Beträge eingeben", text: "Fügen Sie Ihre geplante Aufteilung hinzu, um das Klumpenrisiko zu sehen." },
  }[level];

  const crumbs = [{ name: "Start", path: "/" }, { name: "Rechner", path: "/rechner/" }, { name: "Diversifikations-Rechner", path: "/rechner/diversifikations-rechner" }];

  return (
    <>
      <Seo title="Diversifikations-Rechner | Alternativ Investieren" description="Visualisieren Sie Ihr Klumpenrisiko über mehrere Plattformen und Anlageklassen und erhalten Sie allgemeine Diversifikationstipps. Keine Anlageberatung." path="/rechner/diversifikations-rechner" jsonLd={[breadcrumbSchema(crumbs), faqSchema(rechnerContent.diversifikation.faq)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <RechnerShell
          testid="diversifikation-rechner"
          title="Diversifikations-Rechner"
          subtitle="Klumpenrisiko sichtbar machen – über Plattformen und Anlageklassen."
          icon={PieIcon}
          inputs={
            <>
              <Field label="Geplante Aufteilung">
                <div className="space-y-2" data-testid="diversifikation-rows">
                  {rows.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input data-testid={`div-name-${i}`} value={r.name} onChange={(e) => update(i, "name", e.target.value)} className="flex-1" aria-label="Plattformname" />
                      <Input data-testid={`div-amount-${i}`} type="number" value={r.amount} onChange={(e) => update(i, "amount", e.target.value)} className="w-28" aria-label="Betrag in Euro" />
                      <button onClick={() => remove(i)} disabled={rows.length <= 1} data-testid={`div-remove-${i}`} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30" aria-label="Entfernen"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </Field>
              <Button onClick={add} data-testid="div-add" variant="outline" className="w-full gap-2"><Plus className="h-4 w-4" /> Position hinzufügen</Button>
              <div className="mt-5 flex items-center justify-between rounded-xl bg-sand p-4">
                <span className="text-sm font-semibold text-slate-600">Gesamtsumme</span>
                <span className="num text-lg font-bold text-petrol-dark">{eur(total)}</span>
              </div>
            </>
          }
          result={
            <>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Verteilung &amp; Risikoanalyse</p>
              <div className="grid items-center gap-4 sm:grid-cols-2">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chart} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                        {chart.map((c, i) => <Cell key={i} fill={c.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => eur(v)} contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">Größte Einzelposition</p>
                    <p className="num text-2xl font-bold text-petrol-dark">{(maxShare * 100).toFixed(0)} %</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">Herfindahl-Index (HHI)</p>
                    <p className="num text-2xl font-bold text-petrol-dark">{hhi.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-400">0 = breit gestreut · 1 = alles in einer Position</p>
                  </div>
                </div>
              </div>
              <div data-testid="diversifikation-advice" className={`mt-4 flex items-start gap-3 rounded-xl border p-4 ${advice.color}`}>
                <advice.icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-heading font-bold">{advice.title}</p>
                  <p className="mt-0.5 text-sm">{advice.text}</p>
                </div>
              </div>
            </>
          }
          methodik={
            <>
              <p>Der Rechner bewertet die Konzentration Ihres geplanten Portfolios über zwei Kennzahlen: den <strong>Anteil der größten Einzelposition</strong> und den <strong>Herfindahl-Hirschman-Index (HHI)</strong>, die Summe der quadrierten Anteile. Ein HHI nahe 0 steht für breite Streuung, ein Wert nahe 1 für starke Konzentration.</p>
              <p className="mt-3">Die Ampel-Schwellen (gelb ab 25 %/HHI 0,2; orange ab 40 %/0,3; rot ab 60 %/0,5) sind allgemeine Orientierungswerte, keine individuelle Empfehlung. Bei alternativen Investments ist die Streuung über viele Projekte, Anbieter und Anlageklassen das wichtigste Instrument zur Risikobegrenzung.</p>
            </>
          }
        />
        <RechnerContent content={rechnerContent.diversifikation} currentPath="/rechner/diversifikations-rechner" />
      </Container>
    </>
  );
}
