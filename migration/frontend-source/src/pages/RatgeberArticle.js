import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Seo, breadcrumbSchema, articleSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VerifiedBadge, RiskDisclaimerBanner } from "@/components/Trust";
import { ArticleBlocks, AuthorBox, SourcesBox } from "@/components/ArticleBlocks";
import { api } from "@/lib/api";

export default function RatgeberArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(undefined);
  const [all, setAll] = useState([]);

  useEffect(() => {
    setArticle(undefined);
    api.get(`/articles/${slug}`).then((r) => setArticle(r.data)).catch(() => setArticle(null));
    api.get("/articles").then((r) => setAll(r.data)).catch(() => setAll([]));
  }, [slug]);

  if (article === undefined) return <Container className="py-20 text-center text-sm text-slate-400">Artikel wird geladen…</Container>;
  if (article === null) return <Navigate to="/ratgeber/" replace />;

  const crumbs = [
    { name: "Start", path: "/" },
    { name: "Ratgeber", path: "/ratgeber/" },
    { name: article.title, path: `/ratgeber/${article.slug}` },
  ];
  const more = all.filter((a) => a.slug !== slug).slice(0, 2);
  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }) : "");

  return (
    <>
      <Seo
        title={`${article.metaTitle || article.title} | Alternativ Investieren`}
        description={article.metaDescription || article.excerpt}
        path={`/ratgeber/${article.slug}`}
        image={article.heroImage}
        jsonLd={[breadcrumbSchema(crumbs), articleSchema(article)]}
      />

      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={crumbs} />
          <div className="mb-4 flex flex-wrap gap-1.5">
            {article.tags.map((t) => <span key={t} className="rounded bg-petrol/10 px-2 py-0.5 text-[11px] font-semibold text-petrol">{t}</span>)}
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-petrol-dark sm:text-5xl">{article.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="font-semibold text-slate-700">Von {article.author}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readingTime} Min. Lesezeit</span>
            <span>Aktualisiert: {fmtDate(article.updated)}</span>
          </div>
          <div className="mt-4"><VerifiedBadge /></div>
        </div>

        <figure className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl">
          <img src={article.heroImage} alt={article.heroAlt} className="aspect-[16/8] w-full object-cover" />
        </figure>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* Answer-first paragraph (GEO) */}
          <div className="rounded-2xl border-l-4 border-cta bg-sand p-6" data-testid="article-answer-first">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-cta">Kurz zusammengefasst</p>
            <p className="text-lg leading-relaxed text-slate-800">{article.answerFirst}</p>
          </div>

          <div className="mt-8">
            <ArticleBlocks blocks={article.blocks} />
          </div>

          <AuthorBox author={article.author} updated={fmtDate(article.updated)} />
          <SourcesBox sources={article.sources} />
          <RiskDisclaimerBanner className="mt-6" />

          <section className="mt-14">
            <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-petrol-dark">Weiterlesen</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {more.map((a) => (
                <Link key={a.slug} to={`/ratgeber/${a.slug}`} data-testid={`more-article-${a.slug}`} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
                  <img src={a.heroImage} alt={a.heroAlt} loading="lazy" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-heading text-sm font-bold leading-snug text-petrol-dark">{a.title}</h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-cta">Lesen <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
