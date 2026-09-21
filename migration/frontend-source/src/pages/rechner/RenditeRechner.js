import React, { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Seo, breadcrumbSchema, faqSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RechnerShell, Field, eur } from "@/components/calculators/RechnerShell";
import { RechnerContent } from "@/components/RechnerContent";
import { rechnerContent } from "@/data/rechnerContent";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Platzhalter-Szenario-Bandbreiten je Anlageklasse (redaktionell zu verifizieren)
const SCENARIOS = {
  crowdlending: { label: "Crowdlending / P2P", konservativ: 3, realistisch: 6, optimistisch: 9 },
  "immobilien-crowdinvesting": { label: "Immobilien-Crowdinvesting", konservativ: 3.5, realistisch: 5.5, optimistisch: 7.5 },
};

const COLORS = { konservativ: "#64748B", realistisch: "#133E46", optimistisch: "#C2610C" };

export default function RenditeRechner() {
  const [betrag, setBetrag] = useState(5000);
  const [jahre, setJahre] = useState(5);
  const [klasse, setKlasse] = useState("crowdlending");

  const sc = SCENARIOS[klasse];

  const { chartData, endwerte } = useMemo(() => {
    const data = [];
    for (let y = 0; y <= jahre; y++) {
      data.push({
        jahr: `J${y}`,
        konservativ: Math.round(betrag * Math.pow(1 + sc.konservativ / 100, y)),
        realistisch: Math.round(betrag * Math.pow(1 + sc.realistisch / 100, y)),
        optimistisch: Math.round(betrag * Math.pow(1 + sc.optimistisch / 100, y)),
      });
    }
    return { chartData: data, endwerte: data[data.length - 1] };
  }, [betrag, jahre, sc]);

  const crumbs = [{ name: "Start", path: "/" }, { name: "Rechner", path: "/rechner/" }, { name: "Rendite-Szenario-Rechner", path: "/rechner/rendite-szenario-rechner" }];

  return (
    <>
      <Seo title="Rendite-Szenario-Rechner | Alternativ Investieren" description="Drei Szenarien statt einer Prognose: Berechnen Sie modellhaft konservative, realistische und optimistische Entwicklungen Ihrer Anlage. Keine Anlageberatung." path="/rechner/rendite-szenario-rechner" jsonLd={[breadcrumbSchema(crumbs), faqSchema(rechnerContent.rendite.faq)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <RechnerShell
          testid="rendite-rechner"
          title="Rendite-Szenario-Rechner"
          subtitle="Drei Szenarien statt einer Prognose – bewusst als Modellrechnung."
          icon={TrendingUp}
          inputs={
            <>
              <Field label="Anlagebetrag" hint={eur(betrag)}>
                <Slider data-testid="input-betrag" value={[betrag]} min={500} max={100000} step={500} onValueChange={(v) => setBetrag(v[0])} />
              </Field>
              <Field label="Anlagedauer" hint={`${jahre} Jahre`}>
                <Slider data-testid="input-jahre" value={[jahre]} min={1} max={15} step={1} onValueChange={(v) => setJahre(v[0])} />
              </Field>
              <Field label="Anlageklasse" hint="Hinterlegte Szenario-Bandbreiten sind Platzhalter-Werte.">
                <Select value={klasse} onValueChange={setKlasse}>
                  <SelectTrigger data-testid="input-klasse"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(SCENARIOS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <div className="mt-6 space-y-2 rounded-xl bg-sand p-4 text-xs">
                <p className="font-semibold text-slate-700">Angenommene Zinssätze p.a. ({sc.label}):</p>
                <div className="flex justify-between"><span className="text-slate-500">Konservativ</span><span className="num font-semibold">{sc.konservativ} %</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Realistisch</span><span className="num font-semibold">{sc.realistisch} %</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Optimistisch</span><span className="num font-semibold">{sc.optimistisch} %</span></div>
              </div>
            </>
          }
          result={
            <>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Modellhafte Kapitalentwicklung</p>
              <div className="grid grid-cols-3 gap-3">
                {["konservativ", "realistisch", "optimistisch"].map((k) => (
                  <div key={k} data-testid={`result-${k}`} className="rounded-xl border border-slate-200 p-3 text-center">
                    <p className="text-[11px] font-semibold capitalize" style={{ color: COLORS[k] }}>{k}</p>
                    <p className="num mt-1 text-lg font-bold text-petrol-dark">{eur(endwerte[k])}</p>
                    <p className="num text-[10px] text-slate-400">+{eur(endwerte[k] - betrag)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="jahr" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={60} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => eur(v)} contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="konservativ" stroke={COLORS.konservativ} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="realistisch" stroke={COLORS.realistisch} strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="optimistisch" stroke={COLORS.optimistisch} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          }
          methodik={
            <>
              <p>Der Rechner zeigt bewusst <strong>drei Szenarien statt einer einzelnen Rendite-Prognose</strong>, weil eine punktgenaue Vorhersage künftiger Erträge rechtlich und sachlich unseriös wäre. Die Berechnung erfolgt als jährlicher Zinseszins: Endkapital = Anlagebetrag × (1 + Zinssatz)^Jahre.</p>
              <p className="mt-3">Die hinterlegten Zinssätze je Anlageklasse sind <strong>Platzhalter-Werte</strong>, die redaktionell verifiziert und laufend aktualisiert werden. Nicht berücksichtigt sind Ausfälle, Steuern, Gebühren, Inflation und Wiederanlage-Effekte. In der Praxis mindern insbesondere Kreditausfälle die tatsächliche Rendite spürbar.</p>
            </>
          }
        />
        <RechnerContent content={rechnerContent.rendite} currentPath="/rechner/rendite-szenario-rechner" />
      </Container>
    </>
  );
}
