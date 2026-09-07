import React from "react";
import { Link } from "react-router-dom";
import { RiskAmpel, AdLabel } from "@/components/Trust";
import { Star, StarHalf, ExternalLink, Info, ShieldCheck, Wallet, Clock, Repeat } from "lucide-react";
import { tierLabels } from "@/data/providerDetails";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

const fmtEuro = (n) => (n == null ? "–" : `${new Intl.NumberFormat("de-DE").format(n)} €`);
const fmtTerm = (min, max) => {
  if (min == null && max == null) return "–";
  const toY = (m) => (m % 12 === 0 ? `${m / 12} J.` : `${m} Mon.`);
  return `${min != null ? toY(min) : "?"} – ${max != null ? toY(max) : "?"}`;
};

const assetLabels = {
  crowdlending: "Crowdlending",
  "immobilien-crowdinvesting": "Immobilien-CI",
};

// Mandatory disclaimer rendered automatically with every provider card
function ReturnDisclaimer() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="inline-flex items-center text-slate-400 hover:text-petrol" aria-label="Hinweis zu Rendite-Angaben">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">
          Historische Werte bzw. Modellrechnung, keine Prognose. Rendite-Angaben stellen keine
          zugesicherte Verzinsung dar. Totalverlust möglich, keine Einlagensicherung.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function StarRating({ value, size = "h-4 w-4" }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} von 5 Sternen`}>
      {[1, 2, 3, 4, 5].map((n) => {
        if (n <= full) return <Star key={n} className={`${size} fill-cta-gold text-cta-gold`} aria-hidden="true" />;
        if (n === full + 1 && half) return <StarHalf key={n} className={`${size} fill-cta-gold text-cta-gold`} aria-hidden="true" />;
        return <Star key={n} className={`${size} text-slate-300`} aria-hidden="true" />;
      })}
    </span>
  );
}

export function TrustpilotBadge({ score, count, url, className = "" }) {
  if (!score || !count) return null;
  const inner = (
    <span className={`inline-flex items-center gap-1.5 rounded-md border border-[#00b67a]/40 bg-[#00b67a]/10 px-2 py-1 text-xs ${className}`}>
      <Star className="h-3.5 w-3.5 fill-[#00b67a] text-[#00b67a]" aria-hidden="true" />
      <span className="font-bold text-[#00734a]">{score.toFixed(1)}</span>
      <span className="text-slate-500">Trustpilot · {count}</span>
    </span>
  );
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" data-testid="trustpilot-badge">{inner}</a> : inner;
}

export function TierBadge({ tier }) {
  const t = tierLabels[tier] || tierLabels.tier2;
  return (
    <span data-testid={`tier-badge-${tier}`} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t.color}`}>
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />{t.label}
    </span>
  );
}

export function AnbieterCard({ provider }) {
  const p = provider;
  return (
    <div
      data-testid={`provider-card-${p.id}`}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="absolute right-3 top-3 flex items-center gap-2">
        {p.is_example && (
          <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-800">Beispieldaten</span>
        )}
        <AdLabel />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3">
          {p.logo_url ? (
            <img src={p.logo_url} alt={`${p.name} Logo`} className="h-11 w-11 rounded-lg object-contain" loading="lazy" />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-petrol text-base font-bold text-white">
              {p.name.replace(/Beispiel-Plattform /, "").slice(0, 2)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate font-heading text-base font-bold text-petrol-dark">
              {p.slug ? <Link to={`/anbieter/${p.slug}`} className="hover:text-cta">{p.name}</Link> : p.name}
            </h3>
            <div className="mt-1 flex flex-wrap gap-1">
              {p.asset_classes.map((a) => (
                <span key={a} className="rounded bg-petrol/10 px-1.5 py-0.5 text-[10px] font-semibold text-petrol">{assetLabels[a] || a}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Regulierungs-Stufe */}
        <div className="mt-3"><TierBadge tier={p.regulation_tier} /></div>

        {/* Redaktionelle Sterne-Bewertung */}
        {p.star_rating != null && (
          <div className="mt-3 flex items-center gap-2" data-testid={`star-rating-${p.id}`}>
            <StarRating value={p.star_rating} />
            <span className="num text-xs font-bold text-petrol-dark">{p.star_rating.toFixed(1)}/5</span>
            <Link to="/wie-wir-bewerten/" data-testid="how-we-rate-link" className="inline-flex items-center gap-0.5 text-[11px] text-slate-400 hover:text-petrol">
              <Info className="h-3 w-3" aria-hidden="true" /> Wie bewerten wir?
            </Link>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Rendite <ReturnDisclaimer />
            </p>
            <p className="num font-semibold text-petrol-dark">
              {p.return_min != null ? `${p.return_min}\u2013${p.return_max} %` : "–"}
            </p>
            {p.return_period && <p className="text-[10px] text-slate-400">{p.return_period}</p>}
          </div>
          <div>
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><Wallet className="h-3 w-3" aria-hidden="true" />Mindestanlage</p>
            <p className="num font-semibold text-petrol-dark">{fmtEuro(p.min_investment)}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><Clock className="h-3 w-3" aria-hidden="true" />Laufzeit</p>
            <p className="num font-semibold text-petrol-dark">{fmtTerm(p.term_min_months, p.term_max_months)}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><Repeat className="h-3 w-3" aria-hidden="true" />Zweitmarkt</p>
            <p className="font-semibold text-petrol-dark">{p.secondary_market ? "Ja" : "Nein"}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <RiskAmpel level={p.risk_level} />
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-petrol" aria-hidden="true" />
            {p.bafin_regulated ? "BaFin/reguliert" : "EU-ECSP / VermAnlG"}
          </span>
        </div>
        {p.regulation_note && <p className="mt-1.5 text-[11px] text-slate-400">{p.regulation_note}</p>}

        {p.review_text && <p className="mt-3 text-xs leading-relaxed text-slate-600">{p.review_text}</p>}

        <div className="mt-3">
          <TrustpilotBadge score={p.trustpilot_score} count={p.trustpilot_count} url={p.trustpilot_url} />
        </div>
      </div>

      <div className="mt-auto border-t border-slate-100 p-4">
        <a
          href={p.affiliate_url || "#"}
          target="_blank"
          rel="sponsored noopener noreferrer"
          data-testid={`provider-cta-button-${p.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
        >
          Zum Anbieter <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="mt-2 text-center text-[10px] text-slate-400">Partnerlink (Werbung) · rel="sponsored"</p>
      </div>
    </div>
  );
}

export { fmtEuro, fmtTerm, assetLabels };
