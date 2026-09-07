import React, { useState } from "react";
import { ChevronDown, Info, ShieldAlert } from "lucide-react";

export function RechnerShell({ title, subtitle, icon: Icon, inputs, result, methodik, testid }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-testid={testid}>
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><Icon className="h-6 w-6" aria-hidden="true" /></span>
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-petrol-dark sm:text-4xl">{title}</h1>
          <p className="mt-1 text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">{inputs}</div>
        </div>
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">{result}</div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setOpen((v) => !v)} data-testid="methodik-toggle" className="flex w-full items-center justify-between px-6 py-4 text-left">
          <span className="flex items-center gap-2 font-heading font-bold text-petrol-dark"><Info className="h-4 w-4 text-petrol" aria-hidden="true" /> Methodik &amp; Annahmen</span>
          <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {open && <div className="border-t border-slate-100 px-6 py-5 text-sm leading-relaxed text-slate-600">{methodik}</div>}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium leading-relaxed text-amber-900" data-testid="calc-disclaimer">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p><strong>Wichtiger Hinweis:</strong> Dies ist eine vereinfachte Modellrechnung und keine Prognose. Es handelt sich nicht um eine Anlage-, Steuer- oder Rechtsberatung. Alle Angaben ohne Gewähr. Tatsächliche Ergebnisse können erheblich abweichen; ein Totalverlust ist möglich.</p>
      </div>
    </div>
  );
}

export function Field({ label, children, hint }) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export const eur = (n) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n || 0);
export const eur2 = (n) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(n || 0);
