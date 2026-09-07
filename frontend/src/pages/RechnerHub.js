import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, PieChart, Landmark, ArrowRight, Calculator } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RiskDisclaimerBanner } from "@/components/Trust";

const tools = [
  { to: "/rechner/rendite-szenario-rechner", icon: TrendingUp, label: "Rendite-Szenario-Rechner", desc: "Drei Szenarien (konservativ, realistisch, optimistisch) statt einer Prognose – als bewusste Modellrechnung." },
  { to: "/rechner/diversifikations-rechner", icon: PieChart, label: "Diversifikations-Rechner", desc: "Verteilen Sie Ihr Kapital über mehrere Positionen und sehen Sie sofort, wie hoch Ihr Klumpenrisiko ist." },
  { to: "/rechner/steuer-rechner-kapitalertraege", icon: Landmark, label: "Steuer-Rechner Kapitalerträge", desc: "Abgeltungsteuer (DE), KESt (AT) oder Einkommensteuer (CH) auf Zinserträge – inkl. Sparer-Pauschbetrag." },
];

export default function RechnerHub() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Rechner", path: "/rechner/" }];
  return (
    <>
      <Seo title="Rechner & Tools für alternative Investments | Alternativ Investieren" description="Kostenlose Rechner: Rendite-Szenarien, Diversifikation und Kapitalertragsteuer im DACH-Raum. Vereinfachte Modellrechnungen, keine Anlageberatung." path="/rechner/" jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><Calculator className="h-5 w-5" aria-hidden="true" /></span>
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Rechner &amp; Tools</h1>
            <p className="mt-1 text-slate-500">Fundierte Entscheidungen statt Bauchgefühl – alle Berechnungen als Modellrechnung.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to} data-testid={`rechner-hub-${t.to}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-petrol/30 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><t.icon className="h-6 w-6" aria-hidden="true" /></span>
              <h2 className="mt-5 font-heading text-lg font-bold text-petrol-dark">{t.label}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cta transition-transform group-hover:translate-x-1">Rechner öffnen <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>

        <div className="mt-10"><RiskDisclaimerBanner /></div>
      </Container>
    </>
  );
}
