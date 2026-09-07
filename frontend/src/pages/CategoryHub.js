import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Users, Building2, Check, X, Scale, Landmark, ArrowRight, Calculator, FileText } from "lucide-react";
import { Seo, breadcrumbSchema, faqSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { RiskAmpel, VerifiedBadge, LastUpdated, RiskDisclaimerBanner } from "@/components/Trust";
import { ProviderComparison } from "@/components/ProviderComparison";
import { categories } from "@/data/categories";
import { articles } from "@/data/articles";

const iconMap = { Users, Building2 };

export default function CategoryHub({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  const cat = categories[slug];
  if (!cat) return <Navigate to="/" replace />;
  const Icon = iconMap[cat.icon] || Users;
  const related = articles.filter((a) => cat.relatedArticles.includes(a.slug));

  const crumbs = [
    { name: "Start", path: "/" },
    { name: cat.label, path: `/${cat.slug}/` },
  ];

  return (
    <>
      <Seo
        title={cat.metaTitle}
        description={cat.metaDescription}
        path={`/${cat.slug}/`}
        jsonLd={[breadcrumbSchema(crumbs), faqSchema(cat.faq)]}
      />

      {/* Hero */}
      <div className="border-b border-slate-200 bg-petrol-dark text-white">
        <Container className="py-14">
          <div className="[&_a]:text-slate-300 [&_a:hover]:text-white [&_[aria-current]]:text-white">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-cta-gold"><Icon className="h-6 w-6" aria-hidden="true" /></span>
            <RiskAmpel level={cat.riskLevel} text={cat.riskText} className="!bg-white/10 !text-white !border-white/20" />
          </div>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{cat.hero}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <VerifiedBadge />
            <span className="text-xs text-slate-300"><LastUpdated date="01.07.2026" /></span>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        {/* 1. Answer-first + intro */}
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border-l-4 border-cta bg-sand p-6" data-testid="answer-first">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cta">Das Wichtigste zuerst</p>
              <p className="text-lg leading-relaxed text-slate-800">{cat.answerFirst}</p>
            </div>
            <div className="prose-editorial mt-8 max-w-none">
              <h2>Wie funktioniert {cat.label}?</h2>
              {cat.intro.map((p, i) => <p key={i}>{p}</p>)}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="mb-1 text-sm font-bold text-petrol-dark">Für wen geeignet?</p>
                <p className="!mb-0 text-sm text-slate-600">{cat.forWhom}</p>
              </div>
            </div>
          </div>

          {/* 2. Facts block */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6" data-testid="facts-block">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">Zahlen · Daten · Fakten</p>
              <dl className="space-y-4">
                {cat.facts.map((f) => (
                  <div key={f.label} className="border-b border-slate-100 pb-3 last:border-0">
                    <dt className="text-xs text-slate-500">{f.label}</dt>
                    <dd className="num text-xl font-bold text-petrol-dark">{f.value}</dd>
                    <dd className="text-[11px] text-slate-400">{f.note} · Quelle: {f.source}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        {/* 3. Pro/Contra */}
        <section className="mt-14">
          <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-petrol-dark sm:text-3xl">Vor- und Nachteile im Überblick</h2>
          <div className="grid gap-5 md:grid-cols-2" data-testid="pro-contra">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
              <p className="mb-4 flex items-center gap-2 font-heading font-bold text-emerald-800"><Check className="h-5 w-5" aria-hidden="true" /> Chancen</p>
              <ul className="space-y-2.5">
                {cat.pros.map((p, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />{p}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
              <p className="mb-4 flex items-center gap-2 font-heading font-bold text-red-800"><X className="h-5 w-5" aria-hidden="true" /> Risiken</p>
              <ul className="space-y-2.5">
                {cat.cons.map((p, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />{p}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Legal + 5. Tax */}
        <section className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6" data-testid="legal-block">
            <p className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-petrol-dark"><Scale className="h-5 w-5 text-petrol" aria-hidden="true" /> Rechtlicher Rahmen</p>
            <dl className="space-y-3 text-sm">
              <div><dt className="font-semibold text-slate-700">BaFin-Regulierung</dt><dd className="text-slate-600">{cat.legal.bafin}</dd></div>
              <div><dt className="font-semibold text-slate-700">Einlagensicherung</dt><dd className="text-slate-600">{cat.legal.einlagensicherung}</dd></div>
              <div><dt className="font-semibold text-slate-700">Anlegerschutz</dt><dd className="text-slate-600">{cat.legal.anlegerschutz}</dd></div>
            </dl>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6" data-testid="tax-block">
            <p className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-petrol-dark"><Landmark className="h-5 w-5 text-petrol" aria-hidden="true" /> Steuerliche Behandlung</p>
            <p className="text-sm leading-relaxed text-slate-600">{cat.tax}</p>
            <Link to="/rechner/steuer-rechner-kapitalertraege" data-testid="tax-calc-link" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-petrol px-4 py-2 text-sm font-semibold text-white hover:bg-petrol-light">
              <Calculator className="h-4 w-4" aria-hidden="true" /> Zum Steuer-Rechner
            </Link>
          </div>
        </section>

        {/* 6. Provider comparison */}
        <section className="mt-16">
          <h2 className="mb-2 font-heading text-2xl font-bold tracking-tight text-petrol-dark sm:text-3xl">Anbietervergleich {cat.label}</h2>
          <p className="mb-6 max-w-2xl text-sm text-slate-500">Sortier- und filterbar. Aktuell Beispieldaten – die Vergleichsstruktur ist vollständig angelegt, das Partnernetzwerk wird redaktionell ergänzt.</p>
          <ProviderComparison category={cat.slug} />
        </section>

        {/* 7. FAQ */}
        <div className="mt-16">
          <FaqSection faq={cat.faq} />
        </div>

        {/* 8. Related articles */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-petrol-dark sm:text-3xl">Passende Ratgeber-Artikel</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {related.map((a) => (
                <Link key={a.slug} to={`/ratgeber/${a.slug}`} data-testid={`related-article-${a.slug}`} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
                  <img src={a.heroImage} alt={a.heroAlt} loading="lazy" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-heading text-sm font-bold leading-snug text-petrol-dark">{a.title}</h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-cta"><FileText className="h-3 w-3" aria-hidden="true" /> Artikel lesen <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-14"><RiskDisclaimerBanner /></div>
      </Container>
    </>
  );
}
