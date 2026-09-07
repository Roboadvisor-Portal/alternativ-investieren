import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const cols = [
  {
    title: "Anlageklassen",
    links: [
      { to: "/crowdlending/", label: "Crowdlending / P2P" },
      { to: "/immobilien-crowdinvesting/", label: "Immobilien-Crowdinvesting" },
    ],
  },
  {
    title: "Rechner",
    links: [
      { to: "/rechner/rendite-szenario-rechner", label: "Rendite-Szenario-Rechner" },
      { to: "/rechner/diversifikations-rechner", label: "Diversifikations-Rechner" },
      { to: "/rechner/steuer-rechner-kapitalertraege", label: "Steuer-Rechner" },
    ],
  },
  {
    title: "Wissen",
    links: [
      { to: "/ratgeber/", label: "Ratgeber / Magazin" },
      { to: "/glossar/", label: "Glossar" },
      { to: "/downloads/", label: "Downloads & Checklisten" },
      { to: "/ueber-uns/", label: "Über uns" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { to: "/risikohinweise/", label: "Risikohinweise" },
      { to: "/impressum/", label: "Impressum" },
      { to: "/datenschutz/", label: "Datenschutz" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-petrol-darker text-slate-300" data-testid="footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-sm font-extrabold text-white">Alternativ Investieren</span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Unabhängiges Fachportal zur Aufklärung über alternative Investmentformen im DACH-Raum.
              Keine Anlageberatung.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">{c.title}</h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-slate-300 transition-colors hover:text-cta-gold" data-testid={`footer-link-${l.to}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-400">
          <strong className="text-slate-200">Wichtiger Hinweis:</strong> Alle Inhalte dienen ausschließlich der
          allgemeinen Information und Aufklärung und stellen keine Anlageberatung, Steuer- oder Rechtsberatung dar.
          Rendite-Angaben sind historisch bzw. Modellrechnungen und keine Prognose. Investitionen in Crowdlending
          und Crowdinvesting können zum Totalverlust führen. Einige Links sind Affiliate-Links (Werbung).
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Alternativ Investieren · alternativ-investieren.com</p>
          <Link to="/admin/login" className="text-slate-600 hover:text-slate-400" data-testid="footer-admin-link">Redaktions-Login</Link>
        </div>
      </div>
    </footer>
  );
}
