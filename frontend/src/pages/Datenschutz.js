import React from "react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Datenschutz() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Datenschutz", path: "/datenschutz/" }];
  return (
    <>
      <Seo title="Datenschutzerklärung | Alternativ Investieren" description="Datenschutzerklärung nach DSGVO für alternativ-investieren.com: Verarbeitung personenbezogener Daten, Cookies, Ihre Rechte." path="/datenschutz/" jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Datenschutzerklärung</h1>

          <div className="prose-editorial mt-8 max-w-none">
            <h2>1. Verantwortlicher</h2>
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist Xolo Go OÜ – Commerce Unlimited, Markus Gildemeister, Kalasadama tn 4, 10415 Tallinn, Estland. Kontakt: +49 (0)176 65057661.</p>

            <h2>2. Grundsätzliches</h2>
            <p>Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten ausschließlich im Einklang mit der Datenschutz-Grundverordnung (DSGVO) und den anwendbaren nationalen Datenschutzgesetzen.</p>

            <h2>3. Aufruf der Website (Server-Logs)</h2>
            <p>Beim Besuch der Website werden technisch notwendige Daten (z. B. IP-Adresse in gekürzter Form, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Browsertyp) verarbeitet. Rechtsgrundlage ist unser berechtigtes Interesse am sicheren und stabilen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).</p>

            <h2>4. Cookies &amp; Einwilligung</h2>
            <p>Wir verwenden technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Optionale Cookies – etwa für Statistik/Reichweitenmessung oder Affiliate-Tracking – setzen wir ausschließlich mit Ihrer vorherigen Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft über den Cookie-Hinweis widerrufen.</p>

            <h2>5. Affiliate-Tracking</h2>
            <p>Beim Klick auf einen Affiliate-Link können – abhängig von Ihrer Einwilligung – Informationen an den jeweiligen Partner übermittelt werden, um eine mögliche Provision zuzuordnen. Diese Verarbeitung erfolgt erst nach Ihrer Einwilligung.</p>

            <h2>6. Ihre Rechte</h2>
            <p>Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie ein Widerspruchsrecht (Art. 21 DSGVO). Zudem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren.</p>

            <h2>7. Speicherdauer</h2>
            <p>Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben.</p>

            <p className="text-sm text-slate-500">Diese Datenschutzerklärung wird bei der Integration von Analyse- oder Tracking-Diensten entsprechend ergänzt.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
