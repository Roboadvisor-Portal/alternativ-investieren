import React from "react";
import { Download, FileText, CheckSquare, ClipboardList } from "lucide-react";
import { Seo, breadcrumbSchema } from "@/components/Seo";
import { Container } from "@/components/Layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const downloads = [
  { icon: CheckSquare, title: "Checkliste: Vor der ersten Investition", desc: "10 Prüfpunkte, die Sie vor der Zeichnung eines Crowdlending- oder Crowdinvesting-Projekts durchgehen sollten.", format: "PDF", size: "Vorbereitet" },
  { icon: ClipboardList, title: "Prospekt-Prüfleitfaden Nachrangdarlehen", desc: "Worauf Sie im Verkaufsprospekt und im Vermögensanlagen-Informationsblatt (VIB) achten sollten.", format: "PDF", size: "Vorbereitet" },
  { icon: FileText, title: "Diversifikations-Vorlage (Portfolio-Tracker)", desc: "Einfache Vorlage zur Erfassung Ihrer Positionen über Plattformen und Anlageklassen hinweg.", format: "XLSX", size: "Vorbereitet" },
];

export default function Downloads() {
  const crumbs = [{ name: "Start", path: "/" }, { name: "Downloads", path: "/downloads/" }];
  return (
    <>
      <Seo title="Downloads: Checklisten & Tools | Alternativ Investieren" description="Kostenlose Checklisten und Vorlagen rund um alternative Investments: Prüfleitfäden, Portfolio-Tracker und mehr zum Herunterladen." path="/downloads/" jsonLd={[breadcrumbSchema(crumbs)]} />
      <Container className="py-12">
        <Breadcrumbs items={crumbs} />
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><Download className="h-5 w-5" aria-hidden="true" /></span>
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-petrol-dark">Downloads</h1>
            <p className="mt-1 text-slate-500">Checklisten und Vorlagen für Ihre Anlage-Entscheidungen.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {downloads.map((d) => (
            <div key={d.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6" data-testid={`download-${d.title}`}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-petrol/10 text-petrol"><d.icon className="h-5 w-5" aria-hidden="true" /></span>
              <h2 className="mt-4 font-heading text-base font-bold text-petrol-dark">{d.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{d.desc}</p>
              <button
                data-testid={`download-btn-${d.title}`}
                disabled
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-400"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> {d.format} · demnächst verfügbar
              </button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-400">Die Download-Dateien werden redaktionell erstellt und in Kürze bereitgestellt. Die Struktur ist bereits angelegt.</p>
      </Container>
    </>
  );
}
