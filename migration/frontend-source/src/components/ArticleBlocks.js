import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { MarktvolumenChart } from "@/components/charts/MarketDataCharts";

const rechnerLinks = {
  "diversifikations-rechner": "/rechner/diversifikations-rechner",
  "rendite-szenario-rechner": "/rechner/rendite-szenario-rechner",
  "steuer-rechner": "/rechner/steuer-rechner-kapitalertraege",
};

// parse {link:slug:label} inside text -> render inline links (article slug or rechner slug)
function renderText(text) {
  const parts = [];
  const regex = /\{link:([^:]+):([^}]+)\}/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const slug = m[1];
    const label = m[2];
    const to = rechnerLinks[slug] || `/ratgeber/${slug}`;
    parts.push(<Link key={m.index} to={to}>{label}</Link>);
    last = regex.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function ArticleBlocks({ blocks }) {
  return (
    <div className="prose-editorial max-w-none">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} id={`sec-${i}`}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return <p key={i}>{renderText(b.text)}</p>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-petrol" aria-hidden="true" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "chart":
            return b.chart === "marktvolumen" ? <MarktvolumenChart key={i} /> : null;
          case "flow":
            return <FlowGraphic key={i} steps={b.steps} />;
          case "rank":
            return <RankGraphic key={i} steps={b.steps} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function FlowGraphic({ steps }) {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-sand p-5 sm:p-6" data-testid="flow-graphic">
      <p className="mb-5 text-xs font-bold uppercase tracking-wider text-slate-500">Ablauf einer Plattform-Insolvenz</p>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-petrol text-sm font-bold text-white">{i + 1}</span>
              {i < steps.length - 1 && <span className="my-1 w-px flex-1 bg-slate-300" />}
            </div>
            <div className="pb-2">
              <p className="font-semibold text-petrol-dark">{s.title}</p>
              <p className="text-sm text-slate-600">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RankGraphic({ steps }) {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" data-testid="rank-graphic">
      <p className="mb-5 text-xs font-bold uppercase tracking-wider text-slate-500">Rangfolge im Insolvenzfall</p>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 rounded-xl border p-4 ${
              s.highlight ? "border-risk-red/40 bg-red-50" : "border-slate-200 bg-slate-50"
            }`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold ${s.highlight ? "bg-risk-red text-white" : "bg-petrol text-white"}`}>
              {s.rank}
            </span>
            <div className="flex-1">
              <p className={`font-semibold ${s.highlight ? "text-risk-red" : "text-petrol-dark"}`}>{s.title}</p>
              <p className="text-xs text-slate-500">{s.note}</p>
            </div>
            {i < steps.length - 1 && <ArrowRight className="hidden h-4 w-4 rotate-90 text-slate-300 sm:block" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthorBox({ author, updated }) {
  return (
    <div className="my-10 flex items-start gap-4 rounded-2xl border border-slate-200 bg-sand p-5" data-testid="author-box">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-petrol text-lg font-bold text-white">
        {author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Autor</p>
        <p className="font-heading text-base font-bold text-petrol-dark">{author}</p>
        <p className="mt-1 text-sm text-slate-600">
          Redakteur mit Fokus auf alternative Investments, Crowdlending und Anlegerschutz im DACH-Raum.
          Alle Inhalte dienen der Aufklärung und stellen keine Anlageberatung dar.
        </p>
        <p className="mt-2 text-xs text-slate-400">Zuletzt aktualisiert am {updated}</p>
      </div>
    </div>
  );
}

export function SourcesBox({ sources }) {
  if (!sources?.length) return null;
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5" data-testid="sources-box">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Quellenverzeichnis</p>
      <ol className="space-y-2 text-sm text-slate-600">
        {sources.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="font-mono text-xs text-petrol">[{i + 1}]</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
