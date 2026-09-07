import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ExternalLink, Wallet, Clock, Percent, Repeat } from "lucide-react";
import { api } from "@/lib/api";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RiskAmpel, AdLabel, RiskDisclaimerBanner, LastUpdated } from "@/components/Trust";
import { StarRating, TrustpilotBadge, TierBadge, fmtEuro, fmtTerm } from "@/components/AnbieterCard";
import { providerDetails } from "@/data/providerDetails";

const catLabel = { crowdlending: "Crowdlending", "immobilien-crowdinvesting": "Immobilien-Crowdinvesting" };
const sectionTitles = {
  unternehmen: "Unternehmensbeschreibung", angebot: "Angebot", kosten: "Kosten",
  recht: "Rechtssicherheit", chancen: "Chancen", risiken: "Risiken",
};

export default function AnbieterDetail() {
  const { slug } = useParams();
  const [provider, setProvider] = useState(undefined);
  const detail = providerDetails[slug];

  useEffect(() => {
    api.get("/providers").then((r) => setProvider(r.data.find((p) => p.slug === slug) || null)).catch(() => setProvider(null));
  }, [slug]);

  if (provider === undefined) return <Container className="py-20 text-center text-sm text-slate-400">Anbieter wird geladen…</Container>;
  if (provider === null || !detail) return <Navigate to="/" replace />;

  const cat = provider.asset_classes[0];
  const crumbs = [
    { name: "Start", path: "/" },
    { name: catLabel[cat] || "Anbieter", path: `/${cat}/` },
    { name: provider.name, path: `/anbieter/${slug}` },
  ];
  const facts = [
    { icon: Percent, label: "Rendite-Spanne p.a.", value: provider.return_min != null ? `${provider.return_min}–${provider.return_max} %` : "–", note: provider.return_period },
    { icon: Wallet, label: "Mindestanlage", value: fmtEuro(provider.min_investment) },
    { icon: Clock, label: "Laufzeit", value: fmtTerm(provider.term_min_months, provider.term_max_months) },
    { icon: Repeat, label: "Zweitmarkt", value: provider.secondary_market ? "Ja" : "Nein" },
  ];

  return (
    <>
      <Seo title={`${provider.name}: Erfahrungen, Rendite & Regulierung | Alternativ Investieren`} description={provider.review_text?.slice(0, 155)} path={`/anbieter/${slug}`} jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-petrol text-lg font-bold text-white">{provider.name.slice(0, 2)}</div>
              <div>
                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-petrol-dark sm:text-4xl">{provider.name}</h1>
                <p className="mt-1 text-sm text-slate-500">{provider.asset_classes.map((a) => catLabel[a]).join(", ")}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <TierBadge tier={provider.regulation_tier} />
              <RiskAmpel level={provider.risk_level} />
              <span className="flex items-center gap-1.5"><StarRating value={provider.star_rating} /><span className="num text-sm font-bold text-petrol-dark">{provider.star_rating?.toFixed(1)}/5</span></span>
              <Link to="/wie-wir-bewerten/" className="text-xs font-semibold text-cta underline">Wie bewerten wir?</Link>
              <TrustpilotBadge score={provider.trustpilot_score} count={provider.trustpilot_count} url={provider.trustpilot_url} />
            </div>

            {provider.regulation_note && <p className="mt-3 text-sm text-slate-500">{provider.regulation_note}</p>}

            <div className="prose-editorial mt-8 max-w-none">
              {["unternehmen", "angebot", "kosten", "recht", "chancen", "risiken"].map((k) => (
                <div key={k}>
                  <h2>{sectionTitles[k]}</h2>
                  <p>{detail[k]}</p>
                </div>
              ))}
            </div>

            <RiskDisclaimerBanner className="mt-8" />
          </div>

          {/* Sticky Fakten + CTA */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kerndaten</p>
                  <AdLabel />
                </div>
                <dl className="space-y-3">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0">
                      <f.icon className="h-4 w-4 text-petrol" aria-hidden="true" />
                      <div>
                        <dt className="text-[11px] text-slate-400">{f.label}</dt>
                        <dd className="num text-sm font-bold text-petrol-dark">{f.value}{f.note ? <span className="ml-1 font-normal text-slate-400">({f.note})</span> : null}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <a href={provider.affiliate_url || "#"} target="_blank" rel="sponsored noopener noreferrer" data-testid={`detail-cta-${provider.id}`} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-semibold text-white hover:bg-cta-hover">
                  Zum Anbieter <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-2 text-center text-[10px] text-slate-400">Partnerlink (Werbung) · rel="sponsored"</p>
                <div className="mt-4 border-t border-slate-100 pt-3 text-center">
                  <LastUpdated date="September 2026" />
                </div>
              </div>
              <Link to={`/${cat}/`} className="block rounded-2xl border border-slate-200 bg-sand p-4 text-center text-sm font-semibold text-petrol hover:border-petrol/40">
                ← Zurück zum {catLabel[cat]}-Vergleich
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
