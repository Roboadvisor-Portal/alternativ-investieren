import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ScrollText, GitCompareArrows, Megaphone, ExternalLink } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const HERO_IMG = "https://static.prod-images.emergentagent.com/jobs/7f3c764f-9e32-472d-81c2-b8c322dee5e1/images/c8929b12898feec402dab459f67c952d2195a5880576df17379691aa13716377.jpeg";
const BALANCE_IMG = "https://static.prod-images.emergentagent.com/jobs/7f3c764f-9e32-472d-81c2-b8c322dee5e1/images/4659397fa041dc519bf979d0f328a40215788fa891d833acc8baaed44bf741ef.jpeg";
const PORTRAIT_IMG = "https://static.prod-images.emergentagent.com/jobs/7f3c764f-9e32-472d-81c2-b8c322dee5e1/images/d79465601bb0d1d1239ec84b1f4218fc98f21aa23ccda5266f8668710368f752.jpeg";

const ziele = [
  {
    icon: ShieldCheck,
    title: "Unabhängige Aufklärung statt Verkaufsförderung.",
    text: "Wir erklären, wie Crowdlending, P2P-Kredite und Immobilien-Crowdinvesting funktionieren, welche gesetzlichen Rahmenbedingungen gelten und welche Risiken — bis hin zum Totalverlust — realistisch möglich sind. Das schließt auch unbequeme Themen wie dokumentierte Insolvenzfälle ausdrücklich mit ein.",
  },
  {
    icon: ScrollText,
    title: "Belegbarkeit statt Behauptung.",
    text: "Zahlen, Statistiken und Fallbeispiele auf dieser Seite sind mit Quelle und Datum versehen. Wo eine verlässliche Datenlage fehlt, benennen wir das offen, anstatt Werte zu schätzen oder zu beschönigen.",
  },
  {
    icon: GitCompareArrows,
    title: "Vergleichbarkeit statt Verwirrung.",
    text: "Unsere Anbietervergleiche folgen einheitlichen, offengelegten Kriterien (Regulierung, Mindestanlage, historische Rendite-Spannen, Laufzeiten), damit Sie Angebote unterschiedlicher Anbieter tatsächlich gegenüberstellen können, statt sich durch einzelne Marketingseiten zu klicken.",
  },
];

const kolumnen = ["Talkmarkets", "Stocktwits", "Publish0X", "Focus.de", "Sharewise"];

export default function UeberUns() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Über uns", path: "/ueber-uns/" }];
  return (
    <>
      <Seo
        title="Über uns | Alternativ Investieren"
        description="Alternativ Investieren ist ein unabhängiges Fachportal zur Aufklärung über alternative Investmentformen im DACH-Raum. Idee, Vision, Redaktion und Transparenz zur Finanzierung."
        path="/ueber-uns/"
        image={HERO_IMG}
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <Container className="py-12">
        <Breadcrumbs items={crumbs} />

        <header className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cta">Über uns</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight text-petrol-dark sm:text-5xl">
            Idee &amp; Vision
          </h1>
        </header>

        {/* Aufmacherbild */}
        <figure className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-slate-200">
          <img src={HERO_IMG} alt="Person am aufgeräumten Schreibtisch mit Blick über eine Stadtsilhouette — Recherche und Überblick statt Hektik" className="aspect-[16/9] w-full object-cover" />
        </figure>

        {/* Idee & Vision Text */}
        <div className="prose-editorial mx-auto mt-10 max-w-3xl">
          <p>Alternative Investmentformen wie Crowdlending, P2P-Kredite oder Immobilien-Crowdinvesting werden von vielen Anbietern mit hohen Zinsversprechen und glatten Erfolgsgeschichten beworben. Was in dieser Darstellung oft zu kurz kommt, sind die Risiken, die rechtliche Konstruktion im Hintergrund und die Frage, was im Ernstfall — bei einer Plattform- oder Emittenten-Insolvenz — tatsächlich mit dem investierten Geld passiert.</p>
          <p>Genau aus dieser Beobachtung ist Alternativ Investieren entstanden: aus der Überzeugung, dass Anlegerinnen und Anleger eine Informationsquelle verdienen, die nicht vom Vertriebsinteresse eines einzelnen Anbieters geleitet ist, sondern von journalistischer Sorgfalt. Wir wollen die Lücke schließen zwischen euphorischer Anbieter-Werbung auf der einen und trockenen, schwer zugänglichen Rechtstexten auf der anderen Seite — mit Inhalten, die verständlich, aber nicht verkürzt sind.</p>
        </div>
      </Container>

      {/* Zielsetzung — mit Waage-Grafik */}
      <div className="border-y border-slate-200 bg-white">
        <Container className="py-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <figure className="order-2 overflow-hidden rounded-2xl lg:order-1">
              <img src={BALANCE_IMG} alt="Stilisierte Waage als Sinnbild für das Abwägen von Chancen und Risiken" className="aspect-[3/2] w-full object-cover" />
            </figure>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-petrol-dark">Zielsetzung</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700">Alternativ Investieren verfolgt drei konkrete Ziele:</p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-6">
            {ziele.map((z) => (
              <div key={z.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><z.icon className="h-5 w-5" aria-hidden="true" /></span>
                <p className="text-base leading-relaxed text-slate-700">
                  <strong className="font-heading text-petrol-dark">{z.title}</strong>{" "}{z.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl border-l-4 border-cta pl-5 font-serif text-2xl italic leading-snug text-petrol-dark">
            Wir glauben, dass gute Anlageentscheidungen auf Verständnis beruhen — nicht auf dem Versprechen schneller Gewinne.
          </p>
        </Container>
      </div>

      {/* Unsere Redaktion — Porträt */}
      <Container className="py-16 lg:py-20">
        <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold tracking-tight text-petrol-dark">Unsere Redaktion</h2>

        <div className="mx-auto mt-8 grid max-w-3xl gap-8 sm:grid-cols-[220px_1fr] sm:items-start">
          <figure className="mx-auto w-full max-w-[220px]">
            <img src={PORTRAIT_IMG} alt="Porträt von Markus G., Redakteur und Gründer von Alternativ Investieren" className="aspect-square w-full rounded-2xl border border-slate-200 object-cover" />
            <figcaption className="mt-2 text-center text-xs text-slate-400">Markus G., Redaktion</figcaption>
          </figure>

          <div className="rounded-2xl border border-slate-200 bg-sand p-6">
            <h3 className="font-heading text-xl font-bold text-petrol-dark">Markus G. – der Kopf hinter Alternativ Investieren</h3>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Ideengeber, Redakteur, Anbieter-Scout – Markus ist an praktisch allem beteiligt, was auf dieser Seite passiert. Angefangen hat alles mit Neugier auf FinTech, daraus wurde über die Jahre echte Branchenerfahrung – und die Überzeugung, dass alternative Investments eine ehrlichere Aufklärung verdienen als glattpolierte Anbieter-Websites.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Als Kolumnist schreibt er zudem für zahlreiche Finanzportale, u. a.:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {kolumnen.map((k) => (
                <span key={k} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-petrol">
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />{k}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-700">
          Alle Inhalte werden von Markus G. verantwortet, Redakteur mit Fokus auf alternative Investments, Anlegerschutz und regulatorische Rahmenbedingungen im DACH-Raum. Jeder Beitrag wird redaktionell geprüft und mit Aktualisierungsdatum sowie Quellenverzeichnis versehen, damit Sie jede Aussage bei Bedarf selbst nachvollziehen können.
        </p>
      </Container>

      {/* Transparenz zur Finanzierung — abgesetzte Hinweis-Box */}
      <Container className="pb-20">
        <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-cta bg-slate-50 p-6 sm:p-8" data-testid="transparenz-box">
          <div className="flex items-center gap-2 text-petrol-dark">
            <Megaphone className="h-5 w-5 text-cta" aria-hidden="true" />
            <h2 className="font-heading text-xl font-bold">Transparenz zur Finanzierung</h2>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Wir finanzieren unsere Arbeit unter anderem über Affiliate-Kooperationen mit Anbietern. Diese Partnerlinks sind stets als Werbung gekennzeichnet und beeinflussen weder unsere Bewertungen noch die Rangfolge in unseren Vergleichen. Redaktion und Vermarktung sind organisatorisch getrennt.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <Link to="/risikohinweise/" className="font-semibold text-cta underline underline-offset-2">Zu den Risikohinweisen</Link>
            <Link to="/ratgeber/" className="font-semibold text-cta underline underline-offset-2">Zum Ratgeber</Link>
            <Link to="/glossar/" className="font-semibold text-cta underline underline-offset-2">Zum Glossar</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
