import React from "react";
import { Helmet } from "react-helmet-async";

const SITE = "https://alternativ-investieren.com";

export function Seo({ title, description, path = "/", jsonLd = [], image }) {
  const url = `${SITE}${path}`;
  const fullTitle = title ? `${title}` : "Alternativ Investieren";
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="de_DE" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

export function faqSchema(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(a) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    image: a.heroImage,
    datePublished: a.published,
    dateModified: a.updated,
    author: { "@type": "Person", name: a.author },
    publisher: {
      "@type": "Organization",
      name: "Alternativ Investieren",
      url: SITE,
    },
    mainEntityOfPage: `${SITE}/ratgeber/${a.slug}`,
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Alternativ Investieren",
  url: SITE,
  description:
    "Unabhängiges Fachportal zur Aufklärung über Crowdlending und Immobilien-Crowdinvesting im DACH-Raum.",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Alternativ Investieren",
  url: SITE,
  inLanguage: "de-DE",
};
