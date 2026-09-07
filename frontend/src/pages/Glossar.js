import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookText, Link2 } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { glossary } from "@/data/glossary";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const defkey = glossary.reduce((acc, g) => ({ ...acc, [g.slug]: g.term }), {});

export default function Glossar() {
  const [letter, setLetter] = useState("Alle");
  const { hash } = useLocation();
  const crumbs = [{ name: "Start", path: "/" }, { name: "Glossar", path: "/glossar/" }];

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("ring-2", "ring-cta");
          setTimeout(() => el.classList.remove("ring-2", "ring-cta"), 2000);
        }
      }, 250);
    }
  }, [hash]);

  const sorted = useMemo(() => [...glossary].sort((a, b) => a.term.localeCompare(b.term, "de")), []);
  const filtered = letter === "Alle" ? sorted : sorted.filter((g) => g.term.toUpperCase().startsWith(letter));
  const activeLetters = new Set(sorted.map((g) => g.term[0].toUpperCase()));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossar Alternative Investments",
    hasDefinedTerm: glossary.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.definition })),
  };

  return (
    <>
      <Seo
        title="Glossar: Begriffe zu Crowdlending & Crowdinvesting | Alternativ Investieren"
        description="Präzise Definitionen zentraler Begriffe rund um alternative Investments: Crowdlending, Nachrangdarlehen, ECSP-Verordnung, LTV, Einlagensicherung, Zweitmarkt und mehr."
        path="/glossar/"
        jsonLd={[breadcrumbSchema(crumbs), jsonLd]}
      />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><BookText className="h-5 w-5" aria-hidden="true" /></span>
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Glossar</h1>
            <p className="mt-1 text-slate-500">Zitierfähige Kurz-Definitionen der wichtigsten Fachbegriffe.</p>
          </div>
        </div>

        <div className="mt-6 max-w-3xl prose-editorial">
          <p>Die Welt der alternativen Investments hat ihre eigene Sprache: Nachrangdarlehen, Rangrücktritt, ECSP-Verordnung, Beleihungsauslauf oder Zweitmarkt begegnen Anlegern in Prospekten und auf Plattformen ständig. Wer diese Begriffe nicht sauber einordnen kann, überschätzt schnell die Sicherheit einer Anlage. In diesem Glossar erklären wir die zentralen Fachbegriffe in kurzen, präzisen Definitionen – bewusst so formuliert, dass sie für sich allein verständlich bleiben.</p>
          <p>Die Begriffe sind untereinander verlinkt, sodass Sie Zusammenhänge direkt weiterverfolgen können. Alle Definitionen dienen der Aufklärung und ersetzen keine Beratung im Einzelfall.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-1.5" data-testid="glossar-alphabet">
          <button onClick={() => setLetter("Alle")} className={`rounded-lg px-3 py-1.5 text-xs font-bold ${letter === "Alle" ? "bg-petrol text-white" : "bg-white border border-slate-200 text-slate-600"}`}>Alle</button>
          {alphabet.map((l) => {
            const active = activeLetters.has(l);
            return (
              <button
                key={l}
                disabled={!active}
                onClick={() => setLetter(l)}
                data-testid={`glossar-letter-${l}`}
                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${letter === l ? "bg-petrol text-white" : active ? "bg-white border border-slate-200 text-slate-600 hover:border-petrol/40" : "text-slate-300 cursor-not-allowed"}`}
              >
                {l}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((g) => (
            <article key={g.slug} id={g.slug} data-testid={`glossar-term-${g.slug}`} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-heading text-xl font-bold text-petrol-dark">{g.term}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.definition}</p>
              {g.related?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Verwandt:</span>
                  {g.related.filter((r) => defkey[r]).map((r) => (
                    <a key={r} href={`#${r}`} className="inline-flex items-center gap-0.5 rounded bg-sand px-2 py-0.5 text-xs font-medium text-petrol hover:underline"><Link2 className="h-3 w-3" aria-hidden="true" />{defkey[r]}</a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-sand p-6 text-sm text-slate-600">
          Vertiefende Artikel finden Sie im <Link to="/ratgeber/" className="font-semibold text-cta underline">Ratgeber</Link>.
          Alle Definitionen dienen der Aufklärung und stellen keine Anlageberatung dar.
        </div>
      </Container>
    </>
  );
}
