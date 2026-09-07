import React, { useState, useMemo } from "react";
import { Landmark } from "lucide-react";
import { Seo, breadcrumbSchema, faqSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RechnerShell, Field, eur2 } from "@/components/calculators/RechnerShell";
import { RechnerContent } from "@/components/RechnerContent";
import { rechnerContent } from "@/data/rechnerContent";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SteuerRechner() {
  const [land, setLand] = useState("DE");
  const [ertrag, setErtrag] = useState(1500);
  const [verheiratet, setVerheiratet] = useState(false);
  const [kirche, setKirche] = useState(false);
  const [kirchenRate, setKirchenRate] = useState("9");
  const [chGrenzsatz, setChGrenzsatz] = useState(25);

  const result = useMemo(() => {
    const e = Number(ertrag) || 0;
    if (land === "DE") {
      const freibetrag = verheiratet ? 2000 : 1000;
      const zve = Math.max(0, e - freibetrag);
      const kirchenR = kirche ? Number(kirchenRate) / 100 : 0;
      // Abgeltungsteuer mit Kirchensteuer-Minderung: est = zve*0.25 / (1 + 0.25*ks) (vereinfacht ohne Minderung)
      const est = zve * 0.25;
      const soli = est * 0.055;
      const ks = est * kirchenR;
      const steuer = est + soli + ks;
      return { freibetrag, zve, posten: [
        { label: `Freibetrag (Sparer-Pauschbetrag)`, value: -Math.min(e, freibetrag), info: verheiratet ? "2.000 € (zusammenveranlagt)" : "1.000 € (Einzelperson)" },
        { label: "Zu versteuernder Ertrag", value: zve, plain: true },
        { label: "Abgeltungsteuer (25 %)", value: est },
        { label: "Solidaritätszuschlag (5,5 %)", value: soli },
        ...(kirche ? [{ label: `Kirchensteuer (${kirchenRate} %)`, value: ks }] : []),
      ], steuer, netto: e - steuer, quote: e > 0 ? (steuer / e) * 100 : 0 };
    }
    if (land === "AT") {
      const est = e * 0.275;
      return { posten: [
        { label: "Kapitalertrag", value: e, plain: true },
        { label: "KESt (27,5 %)", value: est },
      ], steuer: est, netto: e - est, quote: 27.5, note: "In Österreich unterliegen Kapitalerträge einer Kapitalertragsteuer (KESt) von 27,5 %. Ein Freibetrag wie der deutsche Sparer-Pauschbetrag besteht nicht." };
    }
    // CH
    const est = e * (Number(chGrenzsatz) / 100);
    return { posten: [
      { label: "Zinsertrag", value: e, plain: true },
      { label: `Einkommensteuer (Grenzsatz ${chGrenzsatz} %)`, value: est },
    ], steuer: est, netto: e - est, quote: Number(chGrenzsatz), note: "In der Schweiz gibt es keine Abgeltungsteuer. Zinserträge werden als Einkommen zum persönlichen Grenzsteuersatz versteuert. Die einbehaltene Verrechnungssteuer (35 %) ist bei korrekter Deklaration rückforderbar. Bitte den individuellen Grenzsatz angeben." };
  }, [land, ertrag, verheiratet, kirche, kirchenRate, chGrenzsatz]);

  const crumbs = [{ name: "Start", path: "/" }, { name: "Rechner", path: "/rechner/" }, { name: "Steuer-Rechner Kapitalerträge", path: "/rechner/steuer-rechner-kapitalertraege" }];

  return (
    <>
      <Seo title="Steuer-Rechner Kapitalerträge (DACH) | Alternativ Investieren" description="Berechnen Sie vereinfacht die Steuer auf Zinserträge aus Crowdlending und Nachrangdarlehen: Abgeltungsteuer (DE), KESt (AT) oder Einkommensteuer (CH). Keine Steuerberatung." path="/rechner/steuer-rechner-kapitalertraege" jsonLd={[breadcrumbSchema(crumbs), faqSchema(rechnerContent.steuer.faq)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <RechnerShell
          testid="steuer-rechner"
          title="Steuer-Rechner Kapitalerträge"
          subtitle="Vereinfachte Steuer auf Zinserträge aus Crowdlending / Nachrangdarlehen."
          icon={Landmark}
          inputs={
            <>
              <Field label="Land">
                <Select value={land} onValueChange={setLand}>
                  <SelectTrigger data-testid="input-land"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DE">Deutschland (Abgeltungsteuer)</SelectItem>
                    <SelectItem value="AT">Österreich (KESt)</SelectItem>
                    <SelectItem value="CH">Schweiz (Einkommensteuer)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Zinsertrag pro Jahr" hint="Bruttozinsen aus Crowdlending/Nachrangdarlehen">
                <Input data-testid="input-ertrag" type="number" value={ertrag} onChange={(e) => setErtrag(e.target.value)} aria-label="Zinsertrag in Euro" />
              </Field>
              {land === "DE" && (
                <>
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-sand p-3">
                    <span className="text-sm font-medium text-slate-700">Zusammenveranlagt (Ehepaar)</span>
                    <Switch data-testid="input-verheiratet" checked={verheiratet} onCheckedChange={setVerheiratet} />
                  </div>
                  <div className="mb-4 flex items-center justify-between rounded-xl bg-sand p-3">
                    <span className="text-sm font-medium text-slate-700">Kirchensteuerpflichtig</span>
                    <Switch data-testid="input-kirche" checked={kirche} onCheckedChange={setKirche} />
                  </div>
                  {kirche && (
                    <Field label="Kirchensteuersatz">
                      <Select value={kirchenRate} onValueChange={setKirchenRate}>
                        <SelectTrigger data-testid="input-kirchenrate"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">9 % (Standard)</SelectItem>
                          <SelectItem value="8">8 % (BW / Bayern)</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </>
              )}
              {land === "CH" && (
                <Field label="Persönlicher Grenzsteuersatz (%)" hint="Ihr marginaler Einkommensteuersatz">
                  <Input data-testid="input-ch-satz" type="number" value={chGrenzsatz} onChange={(e) => setChGrenzsatz(e.target.value)} />
                </Field>
              )}
            </>
          }
          result={
            <>
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Steuerberechnung</p>
              <div className="space-y-2" data-testid="steuer-breakdown">
                {result.posten.map((p, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${p.plain ? "bg-sand font-semibold" : ""}`}>
                    <span className="text-slate-600">{p.label}{p.info && <span className="ml-1 text-[11px] text-slate-400">· {p.info}</span>}</span>
                    <span className={`num font-semibold ${p.value < 0 ? "text-emerald-600" : "text-petrol-dark"}`}>{eur2(p.value)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div data-testid="result-steuer" className="rounded-xl border border-red-200 bg-red-50/60 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-red-500">Steuerlast gesamt</p>
                  <p className="num text-2xl font-bold text-red-700">{eur2(result.steuer)}</p>
                  <p className="num text-[11px] text-red-400">effektiv {result.quote.toFixed(1)} %</p>
                </div>
                <div data-testid="result-netto" className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-emerald-600">Netto-Ertrag</p>
                  <p className="num text-2xl font-bold text-emerald-700">{eur2(result.netto)}</p>
                </div>
              </div>
              {result.note && <p className="mt-4 rounded-xl bg-sand p-3 text-xs leading-relaxed text-slate-600">{result.note}</p>}
            </>
          }
          methodik={
            <>
              <p><strong>Deutschland:</strong> Kapitalerträge unterliegen der Abgeltungsteuer von 25 % zzgl. 5,5 % Solidaritätszuschlag auf die Steuer und ggf. Kirchensteuer (8 % oder 9 %). Bis zum Sparer-Pauschbetrag (1.000 € pro Person, 2.000 € bei Zusammenveranlagung) bleiben Erträge steuerfrei. Eine mögliche Minderung der Abgeltungsteuer durch die Kirchensteuer ist hier vereinfacht nicht berücksichtigt.</p>
              <p className="mt-3"><strong>Österreich:</strong> KESt von 27,5 % ohne Freibetrag. <strong>Schweiz:</strong> keine Abgeltungsteuer – Zinsen werden als Einkommen zum persönlichen Grenzsatz besteuert; die Verrechnungssteuer (35 %) ist bei Deklaration rückforderbar.</p>
              <p className="mt-3">Alle Berechnungen sind vereinfacht und ersetzen keine steuerliche Beratung. Individuelle Faktoren (Günstigerprüfung, Verlustverrechnung, ausländische Quellensteuer) bleiben unberücksichtigt.</p>
            </>
          }
        />
        <RechnerContent content={rechnerContent.steuer} currentPath="/rechner/steuer-rechner-kapitalertraege" />
      </Container>
    </>
  );
}
