import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, FileText, BookText, Calculator, Layers } from "lucide-react";
import { api } from "@/lib/api";
import { glossary } from "@/data/glossary";

const staticEntries = [
  { title: "Crowdlending / P2P-Kredite", path: "/crowdlending/", type: "Anlageklasse", icon: Layers },
  { title: "Immobilien-Crowdinvesting", path: "/immobilien-crowdinvesting/", type: "Anlageklasse", icon: Layers },
  { title: "Rendite-Szenario-Rechner", path: "/rechner/rendite-szenario-rechner", type: "Rechner", icon: Calculator },
  { title: "Diversifikations-Rechner", path: "/rechner/diversifikations-rechner", type: "Rechner", icon: Calculator },
  { title: "Steuer-Rechner Kapitalerträge", path: "/rechner/steuer-rechner-kapitalertraege", type: "Rechner", icon: Calculator },
  { title: "Risikohinweise", path: "/risikohinweise/", type: "Seite", icon: FileText },
];

export function SearchModal({ open, onClose }) {
  const [q, setQ] = useState("");
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    if (open && articles.length === 0) {
      api.get("/articles").then((r) => setArticles(r.data)).catch(() => {});
    }
  }, [open, articles.length]);

  const results = useMemo(() => {
    const entries = [
      ...staticEntries,
      ...articles.map((a) => ({ title: a.title, path: `/ratgeber/${a.slug}`, type: "Ratgeber", icon: FileText })),
      ...glossary.map((g) => ({ title: g.term, path: `/glossar/#${g.slug}`, type: "Glossar", icon: BookText })),
    ];
    if (!q.trim()) return entries.slice(0, 8);
    const term = q.toLowerCase();
    return entries.filter((e) => e.title.toLowerCase().includes(term) || e.type.toLowerCase().includes(term)).slice(0, 10);
  }, [q, articles]);

  const go = (path) => {
    onClose();
    if (path.includes("#")) {
      const [p, hash] = path.split("#");
      navigate(p);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      navigate(path);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-petrol-darker/50 p-4 pt-[10vh] backdrop-blur-sm" onClick={onClose} data-testid="search-modal">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-4">
          <SearchIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          <input
            data-testid="search-input"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Artikel, Begriffe, Rechner suchen…"
            className="w-full bg-transparent py-4 text-base text-petrol-dark outline-none placeholder:text-slate-400"
            aria-label="Suchbegriff"
          />
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-400">Keine Treffer</li>}
          {results.map((r) => (
            <li key={r.path + r.title}>
              <button
                onClick={() => go(r.path)}
                data-testid={`search-result-${r.path}`}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sand"
              >
                <r.icon className="h-4 w-4 text-petrol" aria-hidden="true" />
                <span className="flex-1 text-sm font-medium text-petrol-dark">{r.title}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{r.type}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
