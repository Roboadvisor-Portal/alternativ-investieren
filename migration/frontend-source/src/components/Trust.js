import React from "react";
import { ShieldCheck, AlertTriangle, Megaphone, CalendarClock } from "lucide-react";

const RISK = {
  green: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", dot: "bg-emerald-500", label: "Geringes Risiko / besichert" },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-300", dot: "bg-yellow-400", label: "Moderate Risikoklasse" },
  orange: { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-300", dot: "bg-orange-500", label: "Erhöhtes Nachrang-Risiko" },
  red: { bg: "bg-red-50", text: "text-red-800", border: "border-red-300", dot: "bg-red-500", label: "Hohes Verlustrisiko (bis 100 %)" },
};

export function RiskAmpel({ level = "orange", text, className = "" }) {
  const r = RISK[level] || RISK.orange;
  return (
    <div
      data-testid={`risk-ampel-${level}`}
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 ${r.bg} ${r.text} ${r.border} ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${r.dot} opacity-40`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${r.dot}`} />
      </span>
      <span className="text-xs font-semibold tracking-tight">{text || r.label}</span>
    </div>
  );
}

export function VerifiedBadge({ date = "Juli 2026" }) {
  return (
    <div
      data-testid="verified-badge"
      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-800"
    >
      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs font-semibold">Redaktionell geprüft · Stand: {date}</span>
    </div>
  );
}

export function LastUpdated({ date }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-slate-500" data-testid="last-updated">
      <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Zuletzt aktualisiert am {date}</span>
    </div>
  );
}

export function AffiliateNotice({ className = "" }) {
  return (
    <div
      data-testid="affiliate-notice"
      className={`rounded-r-lg border-l-4 border-cta bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 ${className}`}
    >
      <div className="mb-1 flex items-center gap-2 font-semibold text-slate-800">
        <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
        Transparenzhinweis & Werbekennzeichnung
      </div>
      Unsere Vergleiche sind redaktionell unabhängig. Einige der hier gezeigten Anbieter-Links sind
      Affiliate-Links (Werbung). Eröffnen Sie darüber ein Konto, erhalten wir ggf. eine Provision –
      ohne Mehrkosten für Sie. Dies beeinflusst weder unsere Bewertungen noch die Rangfolge.
    </div>
  );
}

export function RiskDisclaimerBanner({ className = "" }) {
  return (
    <div
      data-testid="risk-disclaimer-banner"
      className={`flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium leading-relaxed text-amber-900 ${className}`}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        <strong>Risikohinweis:</strong> Investitionen in Crowdlending und Immobilien-Crowdinvesting
        beinhalten ein erhebliches Risiko bis hin zum <strong>Totalverlust</strong> des eingesetzten
        Kapitals. Es besteht keine Einlagensicherung. Alle Angaben ohne Gewähr, keine Anlageberatung
        im Sinne des WpHG.
      </p>
    </div>
  );
}

export function AdLabel({ className = "" }) {
  return (
    <span
      data-testid="ad-label"
      className={`inline-flex items-center rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 ${className}`}
    >
      Anzeige
    </span>
  );
}
