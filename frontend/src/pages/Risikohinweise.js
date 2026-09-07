import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, AlertTriangle, Ban, TrendingDown, Scale, Clock } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const risks = [
  { icon: Ban, title: "Kein Einlagenschutz", text: "Crowdlending, Crowdinvesting und Nachrangdarlehen fallen NICHT unter die gesetzliche Einlagensicherung (bis 100.000 € bei Bankguthaben). Es existiert kein staatlicher Schutzschirm." },
  { icon: TrendingDown, title: "Totalverlustrisiko", text: "Bei Ausfall des Kreditnehmers, des Projektträgers oder der Plattform kann das eingesetzte Kapital vollständig verloren gehen. Reale Fälle (z. B. Deutsche Lichtmiete, Degag) belegen dies." },
  { icon: Scale, title: "Nachrangigkeit", text: "Bei Nachrangdarlehen werden Anleger im Insolvenzfall erst nach allen vorrangigen Gläubigern bedient – häufig bleibt für nachrangige Anleger nichts übrig." },
  { icon: Clock, title: "Geringe Verfügbarkeit", text: "Das Kapital ist meist über die gesamte Laufzeit gebunden. Ein vorzeitiger Verkauf ist selten und, wenn überhaupt, oft nur mit Abschlag über einen Zweitmarkt möglich." },
  { icon: AlertTriangle, title: "Plattform-/Betreiberrisiko", text: "Gerät der Plattformbetreiber in Schieflage, können Auszahlungen monatelang blockiert werden – unabhängig von der Bonität einzelner Projekte." },
];

export default function Risikohinweise() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Risikohinweise", path: "/risikohinweise/" }];
  return (
    <>
      <Seo title="Risikohinweise: Crowdlending & Nachrangdarlehen | Alternativ Investieren" description="Allgemeine Risikohinweise zu Crowdlending, Immobilien-Crowdinvesting und Nachrangdarlehen: Totalverlustrisiko, keine Einlagensicherung, Nachrangigkeit und Fungibilität." path="/risikohinweise/" jsonLd={[breadcrumbSchema(crumbs)]} />

      <div className="border-b border-red-200 bg-red-50">
        <Container className="py-12">
          <Breadcrumbs items={crumbs} />
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-risk-red"><ShieldAlert className="h-6 w-6" aria-hidden="true" /></span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-red-800 sm:text-5xl">Risikohinweise</h1>
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-red-900">
            Investitionen in alternative Anlageformen wie Crowdlending, Immobilien-Crowdinvesting und
            Nachrangdarlehen sind mit <strong>erheblichen Risiken bis hin zum Totalverlust</strong> des
            eingesetzten Kapitals verbunden. Bitte lesen Sie diese Hinweise sorgfältig, bevor Sie investieren.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          {risks.map((r) => (
            <div key={r.title} className="rounded-2xl border border-slate-200 bg-white p-6" data-testid={`risk-${r.title}`}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-risk-red"><r.icon className="h-5 w-5" aria-hidden="true" /></span>
                <h2 className="font-heading text-lg font-bold text-petrol-dark">{r.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{r.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-4 rounded-2xl border border-slate-200 bg-sand p-6 text-sm leading-relaxed text-slate-600">
          <h2 className="font-heading text-lg font-bold text-petrol-dark">Allgemeine Hinweise</h2>
          <p><strong>Keine Anlageberatung:</strong> Alle Inhalte dieses Portals dienen ausschließlich der allgemeinen Information und Aufklärung. Sie stellen keine Anlage-, Steuer- oder Rechtsberatung und keine Aufforderung zum Kauf oder Verkauf von Finanzinstrumenten im Sinne des Wertpapierhandelsgesetzes (WpHG) dar.</p>
          <p><strong>Rendite-Angaben:</strong> Sämtliche Rendite-Angaben sind historische Werte oder Modellrechnungen und keine Prognose oder Zusicherung künftiger Erträge. Höhere in Aussicht gestellte Zinsen gehen regelmäßig mit einem höheren Ausfallrisiko einher.</p>
          <p><strong>Eigenverantwortung:</strong> Investieren Sie nur Kapital, dessen vollständigen Verlust Sie wirtschaftlich verkraften können, und streuen Sie konsequent über mehrere Projekte, Anbieter und Anlageklassen. Prüfen Sie vor jeder Anlage die offiziellen Verkaufsprospekte, Vermögensanlagen-Informationsblätter (VIB) und Warnhinweise des jeweiligen Anbieters.</p>
          <p>Vertiefende Informationen finden Sie in unserem <Link to="/ratgeber/plattform-insolvenz-was-passiert-mit-meinem-geld" className="font-semibold text-cta underline">Artikel zur Plattform-Insolvenz</Link> sowie im <Link to="/ratgeber/nachrangdarlehen-einfach-erklaert" className="font-semibold text-cta underline">Beitrag zu Nachrangdarlehen</Link>.</p>
        </div>
      </Container>
    </>
  );
}
