import React from "react";
import { Link } from "react-router-dom";
import { Scale, Star, ShieldCheck, RefreshCw } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const faktoren = [
  { title: "Regulierung & Anlegerschutz", weight: "am stärksten gewichtet", text: "Verfügt der Anbieter über eine echte Finanzlizenz (z. B. MiFID II mit Anlegerentschädigung), eine ECSP-Lizenz oder ist er unreguliert? Dieser Faktor wiegt in unserer Methodik am schwersten." },
  { title: "Dokumentierter Track Record", weight: "stark gewichtet", text: "Wie lange ist der Anbieter am Markt, und welche Vorfälle (Zahlungsverzug, Liquiditätskrisen, Ausfälle) sind belegt? Bekannte Vorfälle fließen ausdrücklich ein." },
  { title: "Strukturelle Transparenz", weight: "mittel gewichtet", text: "Werden geprüfte Geschäftsberichte veröffentlicht? Gibt es Interessenkonflikte, etwa eine Personalunion von Plattform und Garantiegeber?" },
  { title: "Nutzerzufriedenheit (extern)", weight: "ergänzend", text: "Bewertungen auf externen Portalen wie Trustpilot fließen nur unterstützend ein – bewusst schwächer gewichtet als die harten Fakten." },
];

export default function WieWirBewerten() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Wie wir bewerten", path: "/wie-wir-bewerten/" }];
  return (
    <>
      <Seo title="Unsere Bewertungsmethodik: So entstehen unsere Sterne-Bewertungen | Alternativ Investieren" description="Transparente Erklärung unserer 1–5-Sterne-Bewertung für Anbieter: vier gewichtete Faktoren, warum Trustpilot separat steht und wie oft wir aktualisieren." path="/wie-wir-bewerten/" jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><Scale className="h-5 w-5" aria-hidden="true" /></span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Wie wir bewerten</h1>
          </div>

          <div className="prose-editorial mt-8 max-w-none">
            <p>Unsere Sterne-Bewertung (1 bis 5, halbe Sterne möglich) ist eine redaktionelle Gesamteinschätzung jedes Anbieters. Sie setzt sich aus vier gewichteten Faktoren zusammen und ist bewusst kein reiner Durchschnitt aus Nutzerbewertungen.</p>
            <h2>Die vier Faktoren der Sterne-Bewertung</h2>
          </div>

          <div className="mt-4 space-y-4">
            {faktoren.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-cta-gold text-cta-gold" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-petrol-dark">{f.title}</h3>
                  <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-semibold text-petrol">{f.weight}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="prose-editorial mt-10 max-w-none">
            <h2>Warum Trustpilot separat steht</h2>
            <p>Trustpilot-Werte fließen bewusst nicht direkt in unsere Sterne-Bewertung ein. Der Grund: Die Stichproben sind bei manchen Anbietern klein (teils unter 50 Bewertungen), und einzelne Anbieter bieten Bonus- oder Cashback-Programme für Bewertungen an, die das Ergebnis verzerren können. Wir zeigen den Trustpilot-Score deshalb als eigenständiges, klar als externe Quelle gekennzeichnetes Badge – niemals mit unserer eigenen Bewertung verrechnet.</p>
            <h2>Ein konkretes Beispiel: Maclear</h2>
            <p>Der Anbieter <Link to="/anbieter/maclear">Maclear</Link> erreicht auf Trustpilot einen sehr hohen Wert (rund 4,6/5), erhält von uns aber nur drei Sterne. Der Grund liegt in der Gewichtung: Maclear verfügt lediglich über eine Mitgliedschaft in einer Selbstregulierungsorganisation (indirekte FINMA-Aufsicht), nicht über eine echte Finanzlizenz wie <Link to="/anbieter/mintos">Mintos</Link> oder <Link to="/anbieter/debitum">Debitum</Link>. Zusätzlich läuft ein Empfehlungsbonus-Programm, das Trustpilot-Bewertungen verzerren kann. In unserer Methodik wiegt die schwache Regulierung schwerer als gute Nutzerbewertungen – deshalb die mittlere Note trotz hohem Trustpilot-Score.</p>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-sand p-5">
            <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
            <div>
              <p className="font-heading font-bold text-petrol-dark">Aktualisierungsrhythmus</p>
              <p className="mt-1 text-sm text-slate-600">Wir überprüfen unsere Bewertungen regelmäßig – empfohlen vierteljährlich, da sich Rendite-, Volumen- und Regulierungsdaten laufend ändern. <strong>Zuletzt überprüft am 01.09.2026.</strong></p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border-l-4 border-cta bg-slate-50 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-600">
              <strong>Unabhängigkeit:</strong> Unsere Bewertungen sind redaktionell unabhängig. Einige Anbieter-Links sind Affiliate-Links (Werbung); diese beeinflussen weder Bewertung noch Rangfolge. Mehr dazu in der <Link to="/ueber-uns/" className="font-semibold text-cta underline">Transparenz-Sektion unserer Über-uns-Seite</Link>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
