import React from "react";
import { Users, ShieldCheck, Target, ScrollText } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const werte = [
  { icon: ScrollText, t: "Belegbar", d: "Zahlen mit Primärquelle und Datum – keine vagen Marketing-Aussagen." },
  { icon: ShieldCheck, t: "Unabhängig", d: "Redaktionelle Inhalte sind strikt von Affiliate-Kooperationen getrennt." },
  { icon: Target, t: "Verständlich", d: "Komplexe Finanzthemen in klarer Sprache – Antwort zuerst, dann Details." },
];

export default function UeberUns() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Über uns", path: "/ueber-uns/" }];
  return (
    <>
      <Seo title="Über uns | Alternativ Investieren" description="Alternativ Investieren ist ein unabhängiges Fachportal zur Aufklärung über alternative Investmentformen im DACH-Raum. Unsere Redaktion, Werte und Methodik." path="/ueber-uns/" jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><Users className="h-5 w-5" aria-hidden="true" /></span>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Über uns</h1>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="prose-editorial max-w-none lg:col-span-2">
            <p>Alternativ Investieren ist ein unabhängiges deutschsprachiges Fachportal, das private Anlegerinnen und Anleger in Deutschland, Österreich und der Schweiz über alternative Investmentformen aufklärt – insbesondere über Crowdlending, P2P-Kredite und Immobilien-Crowdinvesting.</p>
            <p>Unser Ziel ist es, Chancen und Risiken dieser Anlageklassen sachlich, belegbar und ohne reißerische Versprechen darzustellen. Wir glauben, dass gute Anlageentscheidungen auf Verständnis beruhen – nicht auf dem Versprechen schneller Gewinne.</p>
            <h2>Unsere Redaktion</h2>
            <p>Die Inhalte werden von <strong>Markus G</strong> verantwortet, Redakteur mit Fokus auf alternative Investments, Anlegerschutz und regulatorische Rahmenbedingungen im DACH-Raum. Jeder Beitrag wird redaktionell geprüft und mit Aktualisierungsdatum sowie Quellenverzeichnis versehen.</p>
            <h2>Transparenz zur Finanzierung</h2>
            <p>Wir finanzieren unsere Arbeit unter anderem über Affiliate-Kooperationen mit Anbietern. Diese Partnerlinks sind stets als Werbung gekennzeichnet und beeinflussen weder unsere Bewertungen noch die Rangfolge in unseren Vergleichen. Redaktion und Vermarktung sind organisatorisch getrennt.</p>
          </div>

          <aside className="space-y-4">
            {werte.map((w) => (
              <div key={w.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-petrol/10 text-petrol"><w.icon className="h-5 w-5" aria-hidden="true" /></span>
                <p className="mt-3 font-heading font-bold text-petrol-dark">{w.t}</p>
                <p className="mt-1 text-sm text-slate-600">{w.d}</p>
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </>
  );
}
