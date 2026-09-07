import React from "react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Impressum() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Impressum", path: "/impressum/" }];
  return (
    <>
      <Seo title="Impressum | Alternativ Investieren" description="Impressum und Anbieterkennzeichnung nach § 5 TMG für alternativ-investieren.com." path="/impressum/" jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Impressum</h1>

          <div className="prose-editorial mt-8 max-w-none">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Xolo Go OÜ – Commerce Unlimited<br />
              Markus Gildemeister<br />
              Kalasadama tn 4<br />
              10415 Tallinn<br />
              Estland
            </p>

            <h2>Kontakt</h2>
            <p>Telefon: +49 (0)176 65057661</p>

            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              Markus Gildemeister<br />
              Anschrift wie oben.
            </p>

            <h2>Haftungsausschluss</h2>
            <p>Die Inhalte dieser Website dienen ausschließlich der allgemeinen Information und Aufklärung. Sie stellen keine Anlage-, Steuer- oder Rechtsberatung dar und begründen kein Beratungs- oder Auskunftsverhältnis. Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>

            <h2>Hinweis zu Affiliate-Links</h2>
            <p>Diese Website enthält Affiliate-Links (Werbung). Erfolgt über einen solchen Link ein Vertragsabschluss, können wir eine Provision erhalten – ohne Mehrkosten für Sie. Affiliate-Links sind entsprechend gekennzeichnet.</p>

            <h2>Online-Streitbeilegung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
