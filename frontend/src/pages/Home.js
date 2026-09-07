import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users, Building2, TrendingUp, PieChart, Landmark, ArrowRight, ShieldAlert,
  BookOpen, BadgeCheck, ScrollText, Target,
} from "lucide-react";
import { Seo, organizationSchema, websiteSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { SectionTitle } from "@/components/FaqSection";
import { VerifiedBadge } from "@/components/Trust";
import { RenditeVergleichChart } from "@/components/charts/MarketDataCharts";
import { api } from "@/lib/api";

const categories = [
  { to: "/crowdlending/", icon: Users, label: "Crowdlending / P2P", desc: "Viele Anleger vergeben gemeinsam Kredite. Höhere Zinschancen, kein Einlagenschutz.", stat: "4 – 10 % p.a." },
  { to: "/immobilien-crowdinvesting/", icon: Building2, label: "Immobilien-Crowdinvesting", desc: "Projektfinanzierung über Nachrangdarlehen. Sachwertbezug, nachrangiges Risiko.", stat: "4 – 8 % p.a." },
];

const rechner = [
  { to: "/rechner/rendite-szenario-rechner", icon: TrendingUp, label: "Rendite-Szenario-Rechner", desc: "Drei Szenarien statt Prognose" },
  { to: "/rechner/diversifikations-rechner", icon: PieChart, label: "Diversifikations-Rechner", desc: "Klumpenrisiko sichtbar machen" },
  { to: "/rechner/steuer-rechner-kapitalertraege", icon: Landmark, label: "Steuer-Rechner", desc: "Abgeltungsteuer berechnen" },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    api.get("/articles").then((r) => setArticles(r.data.slice(0, 3))).catch(() => setArticles([]));
  }, []);
  return (
    <>
      <Seo
        title="Alternativ Investieren | Crowdlending & Immobilien-Crowdinvesting DACH"
        description="Unabhängiges Fachportal zu Crowdlending & Immobilien-Crowdinvesting im DACH-Raum. Redaktionell geprüfte Aufklärung, Anbietervergleich, Rechner & Glossar. Keine Anlageberatung."
        path="/"
        jsonLd={[organizationSchema, websiteSchema]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-petrol-dark text-white">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <Container className="relative py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.div initial="hidden" animate="show" variants={fade}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cta-gold">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> Unabhängig · redaktionell geprüft · DACH
                </span>
              </motion.div>
              <motion.h1 initial="hidden" animate="show" custom={1} variants={fade} className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Alternative Investments verstehen – <span className="text-cta-gold">bevor</span> Sie investieren
              </motion.h1>
              <motion.p initial="hidden" animate="show" custom={2} variants={fade} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                Wir nehmen alternative Investments ernst – mit fundierten Informationen zu Crowdlending
                und Immobilien-Crowdinvesting, echten Zahlen statt Hochglanz-Versprechen und einem
                Anbietervergleich, der Klartext spricht.
              </motion.p>
              <motion.div initial="hidden" animate="show" custom={3} variants={fade} className="mt-8 flex flex-wrap gap-3">
                <Link to="/crowdlending/" data-testid="hero-cta-crowdlending" className="inline-flex items-center gap-2 rounded-lg bg-cta px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cta-hover">
                  Anlageklassen entdecken <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/rechner/" data-testid="hero-cta-rechner" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Rechner nutzen
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl border border-white/10 bg-white p-6 text-slate-900 shadow-2xl">
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">Rendite-Bandbreiten im Vergleich</p>
              <p className="mb-4 text-sm text-slate-500">Historische Spannen p.a. – keine Prognose</p>
              <RenditeVergleichChart />
              <p className="mt-3 text-[10px] text-slate-400">Modellhafte Darstellung. Höhere Zinsen gehen mit höherem Ausfallrisiko einher.</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Risk banner moved to footer */}

      {/* Categories */}
      <Container className="py-16 lg:py-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Anlageklassen">Zwei Wege, alternativ zu investieren</SectionTitle>
          <VerifiedBadge />
        </div>
        <p className="mb-10 max-w-3xl text-base leading-relaxed text-slate-600">
          Crowdlending und Immobilien-Crowdinvesting sind die beiden zugänglichsten Formen alternativer
          Geldanlage für Privatanleger im DACH-Raum. Beide funktionieren nach demselben Grundprinzip –
          viele Anleger finanzieren gemeinsam über eine Plattform – unterscheiden sich aber deutlich in
          Sicherheitenstruktur, Laufzeit und Risikoprofil. Beim Crowdlending steht das Ausfallrisiko
          einzelner Kredite im Vordergrund, beim Immobilien-Crowdinvesting die Nachrangigkeit gegenüber
          finanzierenden Banken. Wählen Sie eine Anlageklasse, um Funktionsweise, Zahlen, Regulierung und
          einen strukturierten Anbietervergleich im Detail zu sehen.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((c, i) => (
            <motion.div key={c.to} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fade}>
              <Link to={c.to} data-testid={`home-category-${c.to}`} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:border-petrol/30 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><c.icon className="h-6 w-6" aria-hidden="true" /></span>
                  <span className="num rounded-lg bg-sand px-3 py-1 text-sm font-bold text-petrol">{c.stat}</span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-petrol-dark">{c.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cta transition-transform group-hover:translate-x-1">Mehr erfahren <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Educational / editorial section */}
      <div className="border-y border-slate-200 bg-white">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionTitle eyebrow="Grundlagen">Was sind alternative Investments – und warum jetzt?</SectionTitle>
              <div className="prose-editorial mt-6 max-w-none">
                <p>Als alternative Investments bezeichnet man Anlageformen jenseits der klassischen Bausteine wie Tagesgeld, Sparbuch, Aktien, Anleihen oder breit gestreute ETFs. Dazu zählen unter anderem Crowdlending, Immobilien-Crowdinvesting, Beteiligungen an Sachwerten und Nachrangdarlehen. Ihr gemeinsames Merkmal: Sie versprechen eine höhere Verzinsung als klassische Bankprodukte – im Gegenzug für ein deutlich höheres Risiko und eine eingeschränkte Verfügbarkeit des Kapitals.</p>
                <p>In den vergangenen Jahren sind diese Anlageformen für Privatanleger leicht zugänglich geworden. Online-Plattformen senken die Einstiegshürden auf oft nur 25 bis 500 Euro pro Projekt, wo früher fünfstellige Mindestbeträge und ein Bankberater nötig waren. Diese Demokratisierung ist eine Chance – sie verlagert aber auch die Verantwortung für die Risikoprüfung vollständig auf den Anleger selbst.</p>
                <p>Genau hier setzt dieses Portal an. Wir erklären nicht nur, wie die einzelnen Anlageformen funktionieren, sondern auch, welche Risiken sie tragen, wie sie reguliert und besteuert werden und worauf man vor einer Investition achten sollte. Unser Anspruch ist Aufklärung mit belegbaren Zahlen und klaren Definitionen – keine Renditeversprechen und keine Verharmlosung realer Verlustfälle.</p>
                <p>Der wichtigste Grundsatz vorweg: Alternative Investments gehören – wenn überhaupt – nur als kleine, klar begrenzte Beimischung in ein Portfolio, dessen Fundament aus sicheren und jederzeit verfügbaren Anlagen besteht. Sie ersetzen weder die Notfallreserve auf dem Tagesgeldkonto noch eine breit gestreute Altersvorsorge.</p>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-sand p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cta">Definition</p>
                <p className="font-heading text-base font-bold text-petrol-dark">Einlagensicherung</p>
                <p className="mt-1 text-sm text-slate-600">Gesetzlicher Schutz von Bankguthaben bis 100.000 € pro Kunde und Institut. Bei alternativen Investments existiert dieser Schutz <strong>nicht</strong>.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-sand p-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-cta">Faustregel</p>
                <p className="font-heading text-base font-bold text-petrol-dark">Risiko-Prämie</p>
                <p className="mt-1 text-sm text-slate-600">Je höher der versprochene Zins, desto höher das eingepreiste Ausfallrisiko. Hohe Renditen sind kein Geschenk, sondern eine Warnung.</p>
              </div>
              <Link to="/glossar/" data-testid="home-glossar-link" className="flex items-center justify-between rounded-2xl border border-petrol/20 bg-petrol p-5 text-white transition-colors hover:bg-petrol-light">
                <span>
                  <span className="block font-heading font-bold">Fachbegriffe klären</span>
                  <span className="block text-xs text-slate-300">17 Definitionen im Glossar</span>
                </span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </div>

      {/* Rechner */}
      <div className="bg-petrol-darker py-16 text-white lg:py-24">
        <Container>
          <SectionTitle eyebrow="Kostenlose Tools" className="mb-10 [&_h2]:text-white">Rechner für fundierte Entscheidungen</SectionTitle>
          <div className="grid gap-5 md:grid-cols-3">
            {rechner.map((r) => (
              <Link key={r.to} to={r.to} data-testid={`home-rechner-${r.to}`} className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cta/20 text-cta-gold"><r.icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-4 font-heading text-lg font-bold">{r.label}</h3>
                <p className="mt-1 text-sm text-slate-400">{r.desc}</p>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Latest articles */}
      <Container className="py-16 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionTitle eyebrow="Ratgeber">Aktuelles aus unserem Magazin</SectionTitle>
          <Link to="/ratgeber/" className="inline-flex items-center gap-1 text-sm font-semibold text-cta" data-testid="home-all-articles">Alle Artikel <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a, i) => (
            <motion.article key={a.slug} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fade}>
              <Link to={`/ratgeber/${a.slug}`} data-testid={`home-article-${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={a.heroImage} alt={a.heroAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {a.tags.slice(0, 2).map((t) => <span key={t} className="rounded bg-petrol/10 px-2 py-0.5 text-[10px] font-semibold text-petrol">{t}</span>)}
                  </div>
                  <h3 className="font-heading text-base font-bold leading-snug text-petrol-dark">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-2">{a.excerpt}</p>
                  <span className="mt-3 text-xs text-slate-400">{a.readingTime} Min. Lesezeit</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>

      {/* Trust strip */}
      <Container className="pb-20">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ScrollText, t: "Quellen belegt", d: "Zahlen mit Primärquelle und Datum" },
            { icon: Target, t: "Antwort zuerst", d: "Kernaussage vorab, klar formuliert" },
            { icon: ShieldAlert, t: "Risiko transparent", d: "Totalverlust-Hinweise, keine Schönfärberei" },
            { icon: BookOpen, t: "Unabhängig", d: "Redaktion getrennt von Affiliate-Links" },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-petrol/10 text-petrol"><f.icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <p className="font-heading font-bold text-petrol-dark">{f.t}</p>
                <p className="text-xs text-slate-500">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
