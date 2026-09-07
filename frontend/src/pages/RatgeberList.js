import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articles, ratgeberTags } from "@/data/articles";

export default function RatgeberList() {
  const [tag, setTag] = useState("Alle");
  const filtered = tag === "Alle" ? articles : articles.filter((a) => a.tags.includes(tag));
  const crumbs = [{ name: "Start", path: "/" }, { name: "Ratgeber", path: "/ratgeber/" }];

  return (
    <>
      <Seo
        title="Ratgeber & Magazin: Crowdlending & Crowdinvesting | Alternativ Investieren"
        description="Redaktionell geprüfte Ratgeber-Artikel zu Crowdlending, Immobilien-Crowdinvesting, Nachrangdarlehen, Steuern und Anlegerschutz. Mit Quellenangaben. Keine Anlageberatung."
        path="/ratgeber/"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><BookOpen className="h-5 w-5" aria-hidden="true" /></span>
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Ratgeber &amp; Magazin</h1>
            <p className="mt-1 text-slate-500">Aufklärung mit Quellen – von Marktzahlen bis Insolvenzrecht.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" data-testid="ratgeber-tags">
          {["Alle", ...ratgeberTags].map((t) => (
            <button
              key={t}
              data-testid={`tag-filter-${t}`}
              onClick={() => setTag(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${tag === t ? "bg-petrol text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-petrol/40"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <motion.article key={a.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link to={`/ratgeber/${a.slug}`} data-testid={`ratgeber-card-${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={a.heroImage} alt={a.heroAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {a.tags.slice(0, 2).map((t) => <span key={t} className="rounded bg-petrol/10 px-2 py-0.5 text-[10px] font-semibold text-petrol">{t}</span>)}
                  </div>
                  <h2 className="font-heading text-base font-bold leading-snug text-petrol-dark">{a.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">{a.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3 w-3" aria-hidden="true" /> {a.readingTime} Min. · {new Date(a.published).toLocaleDateString("de-DE")}</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </>
  );
}
