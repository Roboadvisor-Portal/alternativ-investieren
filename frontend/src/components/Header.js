import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users, Building2, Calculator, BookOpen, Menu, X, Search, ChevronDown,
  TrendingUp, PieChart, Landmark, ShieldAlert,
} from "lucide-react";

const iconMap = { Users, Building2 };

const categories = [
  { to: "/crowdlending/", label: "Crowdlending / P2P", icon: Users, desc: "P2P-Kredite & Schwarmfinanzierung" },
  { to: "/immobilien-crowdinvesting/", label: "Immobilien-Crowdinvesting", icon: Building2, desc: "Projektfinanzierung mit Nachrangdarlehen" },
];

const rechner = [
  { to: "/rechner/rendite-szenario-rechner", label: "Rendite-Szenario-Rechner", icon: TrendingUp, desc: "Drei Szenarien statt einer Prognose" },
  { to: "/rechner/diversifikations-rechner", label: "Diversifikations-Rechner", icon: PieChart, desc: "Klumpenrisiko sichtbar machen" },
  { to: "/rechner/steuer-rechner-kapitalertraege", label: "Steuer-Rechner", icon: Landmark, desc: "Abgeltungsteuer auf Zinserträge" },
];

function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        data-testid={`nav-dropdown-${label.toLowerCase()}`}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-petrol focus:outline-none focus-visible:ring-2 focus-visible:ring-cta"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 w-80 pt-2">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            {items.map((it) => (
              <Link
                key={it.to}
                to={it.to}
                data-testid={`nav-item-${it.to}`}
                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-sand"
              >
                <span className="mt-0.5 rounded-lg bg-petrol/10 p-2 text-petrol">
                  <it.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-petrol-dark">{it.label}</span>
                  <span className="block text-xs text-slate-500">{it.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-petrol-dark text-white">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-base font-extrabold tracking-tight text-petrol-dark">
              Alternativ Investieren
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Crowdlending · Crowdinvesting · DACH
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Anlageklassen" items={categories} />
          <Dropdown label="Rechner" items={rechner} />
          <Link to="/ratgeber/" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-petrol" data-testid="nav-ratgeber">Ratgeber</Link>
          <Link to="/glossar/" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-petrol" data-testid="nav-glossar">Glossar</Link>
          <Link to="/risikohinweise/" className="rounded-lg px-3 py-2 text-sm font-semibold text-risk-orange hover:text-risk-red" data-testid="nav-risiko">
            <span className="inline-flex items-center gap-1"><ShieldAlert className="h-4 w-4" aria-hidden="true" />Risikohinweise</span>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            data-testid="open-search-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors hover:border-petrol/40 hover:text-petrol"
            aria-label="Suche öffnen"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Suchen</span>
            <kbd className="hidden rounded bg-slate-100 px-1.5 text-[10px] font-semibold text-slate-400 md:inline">⌘K</kbd>
          </button>
          <button
            data-testid="mobile-menu-btn"
            className="lg:hidden rounded-lg p-2 text-petrol-dark"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menü"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden" data-testid="mobile-menu">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            <p className="px-2 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">Anlageklassen</p>
            {categories.map((c) => (
              <Link key={c.to} to={c.to} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sand">
                <c.icon className="h-4 w-4 text-petrol" aria-hidden="true" />{c.label}
              </Link>
            ))}
            <p className="px-2 pt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Rechner</p>
            {rechner.map((c) => (
              <Link key={c.to} to={c.to} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sand">
                <c.icon className="h-4 w-4 text-petrol" aria-hidden="true" />{c.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link to="/ratgeber/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sand"><BookOpen className="h-4 w-4 text-petrol" aria-hidden="true" />Ratgeber</Link>
              <Link to="/glossar/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-sand"><Calculator className="h-4 w-4 text-petrol" aria-hidden="true" />Glossar</Link>
              <Link to="/risikohinweise/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-semibold text-risk-orange hover:bg-sand"><ShieldAlert className="h-4 w-4" aria-hidden="true" />Risikohinweise</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export { iconMap };
