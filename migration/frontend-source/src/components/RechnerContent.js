import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, PieChart, Landmark, BookText, FileText } from "lucide-react";
import { FaqSection } from "@/components/FaqSection";

// Inline markdown parser: [Label](/pfad) and **bold**
function renderInline(text) {
  const nodes = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) {
      const label = m[1];
      const path = m[2];
      if (path.startsWith("http")) {
        nodes.push(<a key={key++} href={path} target="_blank" rel="noopener noreferrer">{label}</a>);
      } else {
        nodes.push(<Link key={key++} to={path}>{label}</Link>);
      }
    } else if (m[3]) {
      nodes.push(<strong key={key++}>{m[3]}</strong>);
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

const relatedLinks = [
  { to: "/crowdlending/", icon: FileText, label: "Crowdlending verstehen", desc: "Chancen, Risiken & Anbietervergleich" },
  { to: "/immobilien-crowdinvesting/", icon: FileText, label: "Immobilien-Crowdinvesting", desc: "Nachrangdarlehen & Projektfinanzierung" },
  { to: "/rechner/rendite-szenario-rechner", icon: TrendingUp, label: "Rendite-Szenario-Rechner", desc: "Drei Szenarien statt Prognose" },
  { to: "/rechner/diversifikations-rechner", icon: PieChart, label: "Diversifikations-Rechner", desc: "Klumpenrisiko sichtbar machen" },
  { to: "/rechner/steuer-rechner-kapitalertraege", icon: Landmark, label: "Steuer-Rechner", desc: "Abgeltungsteuer & Netto-Ertrag" },
  { to: "/glossar/", icon: BookText, label: "Glossar", desc: "Fachbegriffe kompakt erklärt" },
];

export function RechnerContent({ content, currentPath }) {
  const related = relatedLinks.filter((l) => l.to !== currentPath);
  return (
    <section className="mt-16" data-testid="rechner-content">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-petrol-dark sm:text-3xl">{content.heading}</h2>

        <div className="mt-6 rounded-2xl border-l-4 border-cta bg-sand p-6" data-testid="rechner-answer-first">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cta">Kurz erklärt</p>
          <p className="text-lg leading-relaxed text-slate-800">{content.answer}</p>
        </div>

        <div className="prose-editorial mt-8 max-w-none">
          {content.sections.map((sec, i) => (
            <div key={i}>
              <h3>{sec.h2}</h3>
              {sec.paragraphs.map((p, j) => <p key={j}>{renderInline(p)}</p>)}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <FaqSection faq={content.faq} title="Häufige Fragen zum Rechner" />
        </div>

        <div className="mt-12">
          <h2 className="mb-5 font-heading text-xl font-bold tracking-tight text-petrol-dark">Passende Seiten & Tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((l) => (
              <Link key={l.to} to={l.to} data-testid={`rechner-related-${l.to}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-petrol/10 text-petrol"><l.icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-petrol-dark">{l.label}</span>
                  <span className="block text-xs text-slate-500">{l.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
