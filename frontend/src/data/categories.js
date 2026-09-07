// Kategorie-Hub-Inhalte (identischer Aufbau je Kategorie)
export const categories = {
  crowdlending: {
    slug: "crowdlending",
    icon: "Users",
    label: "Crowdlending",
    navLabel: "Crowdlending / P2P",
    metaTitle:
      "Crowdlending: Chancen, Risiken & Anbietervergleich 2026 | Alternativ Investieren",
    metaDescription:
      "Crowdlending & P2P-Kredite verständlich erklärt: Marktvolumen, Ausfallrisiken, Regulierung, Steuern und ein Anbietervergleich für Anleger im DACH-Raum. Keine Anlageberatung.",
    hero:
      "Crowdlending & P2P-Kredite: Chancen und Risiken im Überblick",
    answerFirst:
      "Crowdlending (auch P2P-Kredite) ist eine alternative Anlageform, bei der viele private Anleger über eine Online-Plattform gemeinsam Geld an Unternehmen, Privatpersonen oder Projekte verleihen und dafür Zinsen erhalten. Die Zinschancen liegen typischerweise zwischen 4 % und 10 % pro Jahr und damit deutlich über klassischen Bankprodukten – dafür entfällt die gesetzliche Einlagensicherung vollständig. Anleger tragen das Ausfallrisiko des Kreditnehmers sowie das Insolvenzrisiko der Plattform und können ihr eingesetztes Kapital ganz oder teilweise verlieren. Crowdlending eignet sich als Beimischung für Anleger mit bereits vorhandener sicherer Vermögensbasis, die einen begrenzten Betrag über viele Projekte und Plattformen streuen. Als Ersatz für die Notfallreserve oder das Tagesgeldkonto ist es nicht geeignet.",
    intro: [
      "Beim Crowdlending bündeln Plattformen viele kleine Anlagebeträge und vergeben daraus Kredite an Kreditnehmer – vom Konsumkredit über die Unternehmensfinanzierung bis zum Immobilienprojekt. Anleger können sich oft schon ab 25 bis 100 Euro pro Projekt beteiligen und bauen sich so ein Portfolio aus vielen einzelnen Krediten auf.",
      "Der Reiz liegt in der Verzinsung, die spürbar über Tagesgeld oder Festgeld liegt. Der Preis dafür ist ein grundlegend anderes Risikoprofil: Anleger sind wirtschaftlich Kreditgeber und tragen das volle Ausfallrisiko – ohne den Schutzschirm der Einlagensicherung.",
    ],
    forWhom:
      "Geeignet für risikobewusste Anleger mit vorhandener sicherer Basis (Tagesgeld, Festgeld, ETFs), die einen klar begrenzten Teil ihres Vermögens für höhere Zinschancen einsetzen und konsequent streuen.",
    facts: [
      { label: "Marktvolumen DE (2019)", value: "417,7 Mio. €", note: "Crowdinvesting, Höchststand", source: "Statista/crowdfunding.de" },
      { label: "Marktvolumen DE (2020)", value: "327,8 Mio. €", note: "Crowdinvesting", source: "Statista/crowdfunding.de" },
      { label: "Typische Zinsspanne", value: "4 – 10 % p.a.", note: "historisch, je nach Risikoklasse", source: "Marktbeobachtung" },
      { label: "Einstieg ab", value: "25 – 100 €", note: "je Projekt", source: "Plattform-Angaben" },
    ],
    pros: [
      "Höhere Zinschancen als klassische Bankprodukte",
      "Schon mit kleinen Beträgen breit streubar",
      "Große Auswahl an Projekten und Kreditarten",
      "Transparente Projektdaten, teils mit Zweitmarkt",
    ],
    cons: [
      "Keine gesetzliche Einlagensicherung",
      "Ausfallrisiko einzelner Kreditnehmer",
      "Plattformrisiko bei Insolvenz des Betreibers",
      "Kapital meist über die gesamte Laufzeit gebunden",
    ],
    legal: {
      bafin: "Teilweise – Plattformen benötigen für viele Angebote eine Zulassung nach der EU-ECSP-Verordnung (Aufsicht: BaFin).",
      einlagensicherung: "Nein. Crowdlending-Anlagen unterliegen nicht der gesetzlichen Einlagensicherung.",
      anlegerschutz: "Anlegerbasisinformationsblatt (KIIS) nach ECSP-VO; Vermögensanlagen-Informationsblatt (VIB) nach VermAnlG.",
    },
    tax:
      "Zinserträge aus Crowdlending unterliegen in Deutschland grundsätzlich der Abgeltungsteuer (25 % zzgl. Solidaritätszuschlag und ggf. Kirchensteuer). Bis zum Sparer-Pauschbetrag von 1.000 € pro Person bleiben Kapitalerträge steuerfrei. Bei ausländischen Plattformen ist häufig eine Angabe in der Steuererklärung erforderlich.",
    riskLevel: "orange",
    riskText: "Erhöhtes Risiko bis Totalverlust möglich – keine Einlagensicherung.",
    faq: [
      { q: "Was ist Crowdlending?", a: "Crowdlending bezeichnet die gemeinsame Kreditvergabe vieler privater Anleger über eine Online-Plattform an Unternehmen, Projekte oder Privatpersonen gegen Zinsen. Es zählt zu den alternativen Investmentformen und trägt ein Ausfall- und Plattformrisiko ohne Einlagensicherung." },
      { q: "Wie sicher ist Crowdlending?", a: "Crowdlending ist nicht durch die gesetzliche Einlagensicherung geschützt. Bei Ausfall des Kreditnehmers oder Insolvenz der Plattform kann das eingesetzte Kapital teilweise oder vollständig verloren gehen. Diversifikation über viele Projekte senkt das Risiko, beseitigt es aber nicht." },
      { q: "Welche Rendite ist beim Crowdlending realistisch?", a: "Historisch bewegen sich die Zinsen je nach Risikoklasse meist zwischen 4 % und 10 % pro Jahr. Diese Angaben sind historische Werte, keine Prognose; höhere in Aussicht gestellte Zinsen gehen in der Regel mit höherem Ausfallrisiko einher." },
      { q: "Ab welchem Betrag kann ich in Crowdlending investieren?", a: "Viele Plattformen ermöglichen den Einstieg bereits ab 25 bis 100 Euro pro Projekt. Das erleichtert die Streuung über viele Kredite, was für die Risikobegrenzung entscheidend ist." },
      { q: "Wie werden Erträge aus Crowdlending besteuert?", a: "Zinserträge unterliegen in Deutschland der Abgeltungsteuer von 25 % zzgl. Solidaritätszuschlag und ggf. Kirchensteuer. Bis zum Sparer-Pauschbetrag von 1.000 Euro pro Person bleiben Kapitalerträge steuerfrei." },
    ],
    relatedArticles: ["crowdlending-vs-klassisches-sparen", "plattform-insolvenz-was-passiert-mit-meinem-geld"],
  },

  "immobilien-crowdinvesting": {
    slug: "immobilien-crowdinvesting",
    icon: "Building2",
    label: "Immobilien-Crowdinvesting",
    navLabel: "Immobilien-Crowdinvesting",
    metaTitle:
      "Immobilien-Crowdinvesting: Chancen, Risiken & Anbietervergleich 2026 | Alternativ Investieren",
    metaDescription:
      "Immobilien-Crowdinvesting erklärt: Nachrangdarlehen, LTV, Regulierung nach VermAnlG/BaFin, Steuern und ein Anbietervergleich für Anleger im DACH-Raum. Keine Anlageberatung.",
    hero: "Immobilien-Crowdinvesting: Projektfinanzierung für private Anleger",
    answerFirst:
      "Immobilien-Crowdinvesting ist eine alternative Anlageform, bei der viele private Anleger über eine Plattform gemeinsam ein Immobilienprojekt finanzieren – meist über Nachrangdarlehen oder Namensschuldverschreibungen mit fester Verzinsung und begrenzter Laufzeit. Die in Aussicht gestellten Zinsen liegen historisch häufig zwischen 4 % und 8 % pro Jahr. Da die Finanzierung in der Regel nachrangig erfolgt, werden Anleger im Insolvenzfall des Projektträgers erst nach Banken und anderen vorrangigen Gläubigern bedient und können ihr Kapital vollständig verlieren. Eine gesetzliche Einlagensicherung besteht nicht. Wichtige Kennzahlen zur Risikoeinschätzung sind der Beleihungsauslauf (LTV), der Projektfortschritt und die Bonität des Projektträgers. Immobilien-Crowdinvesting eignet sich als Beimischung für Anleger, die über mehrere Projekte, Anbieter und Regionen streuen.",
    intro: [
      "Beim Immobilien-Crowdinvesting stellen Anleger Projektträgern Kapital für den Bau, Kauf oder die Sanierung von Immobilien zur Verfügung. Rechtlich handelt es sich meist um Nachrangdarlehen oder Namensschuldverschreibungen mit fester Laufzeit und festem Zinssatz.",
      "Für Anleger ist die Immobilie als Sachwert im Hintergrund attraktiv. Entscheidend ist jedoch die rechtliche Stellung: Nachrangige Geldgeber tragen ein hohes Risiko, weil sie im Ernstfall hinter den Banken stehen.",
    ],
    forWhom:
      "Geeignet für Anleger, die einen begrenzten Teil ihres Vermögens über mehrere Projekte, Anbieter und Regionen streuen und die Kennzahlen (LTV, Projektstatus, Bonität) selbst einschätzen möchten.",
    facts: [
      { label: "Typische Zinsspanne", value: "4 – 8 % p.a.", note: "historisch, je Projekt", source: "Marktbeobachtung" },
      { label: "Einstieg ab", value: "250 – 500 €", note: "je Projekt", source: "Plattform-Angaben" },
      { label: "Laufzeiten", value: "12 – 48 Monate", note: "projektabhängig", source: "Plattform-Angaben" },
      { label: "Rechtsform", value: "meist Nachrangdarlehen", note: "mit Rangrücktritt", source: "VermAnlG" },
    ],
    pros: [
      "Sachwertbezug (Immobilie als Projektgrundlage)",
      "Feste Verzinsung über überschaubare Laufzeiten",
      "Zugang zu Projekten ab kleinen Beträgen",
      "Teils besicherte Strukturen mit niedrigem LTV",
    ],
    cons: [
      "Nachrangigkeit: Anleger stehen hinter Banken",
      "Keine Einlagensicherung, Totalverlust möglich",
      "Projekt- und Fertigstellungsrisiko",
      "Geringe Fungibilität, Kapital langfristig gebunden",
    ],
    legal: {
      bafin: "Teilweise – öffentliche Angebote unterliegen dem Vermögensanlagengesetz (VIB) bzw. der ECSP-Verordnung; die BaFin billigt Prospekte, prüft aber nicht die Werthaltigkeit.",
      einlagensicherung: "Nein. Immobilien-Crowdinvesting unterliegt nicht der gesetzlichen Einlagensicherung.",
      anlegerschutz: "Vermögensanlagen-Informationsblatt (VIB) bzw. Anlagebasisinformationsblatt (KIIS); Warnhinweise verpflichtend.",
    },
    tax:
      "Zinserträge aus Immobilien-Crowdinvesting werden in Deutschland als Kapitalerträge mit der Abgeltungsteuer (25 % zzgl. Soli und ggf. Kirchensteuer) besteuert. Der Sparer-Pauschbetrag von 1.000 € pro Person mindert die Steuerlast. Die konkrete Behandlung hängt von der Rechtsform der Anlage ab.",
    riskLevel: "orange",
    riskText: "Nachrangiges Kapital – im Insolvenzfall Totalverlust möglich.",
    faq: [
      { q: "Was ist Immobilien-Crowdinvesting?", a: "Immobilien-Crowdinvesting ist die gemeinsame Finanzierung eines Immobilienprojekts durch viele Anleger über eine Plattform, meist in Form von Nachrangdarlehen mit fester Verzinsung und begrenzter Laufzeit. Anleger tragen ein Ausfall- und Nachrangrisiko ohne Einlagensicherung." },
      { q: "Wie riskant ist Immobilien-Crowdinvesting?", a: "Das Risiko ist erhöht: Da die Finanzierung meist nachrangig erfolgt, werden Anleger im Insolvenzfall erst nach Banken bedient und können ihr Kapital vollständig verlieren. Kennzahlen wie der Beleihungsauslauf (LTV) helfen bei der Einschätzung." },
      { q: "Was bedeutet Nachrangigkeit beim Immobilien-Crowdinvesting?", a: "Nachrangigkeit bedeutet, dass Anleger im Insolvenzfall erst bedient werden, wenn alle vorrangigen Gläubiger – insbesondere finanzierende Banken – vollständig befriedigt sind. Reicht die Insolvenzmasse nicht, gehen nachrangige Anleger leer aus." },
      { q: "Welche Rendite ist beim Immobilien-Crowdinvesting üblich?", a: "Historisch liegen die festen Zinsen häufig zwischen 4 % und 8 % pro Jahr, abhängig von Projekt, Laufzeit und Risiko. Diese Werte sind historisch und keine Prognose." },
      { q: "Ist Immobilien-Crowdinvesting reguliert?", a: "Öffentliche Angebote unterliegen dem Vermögensanlagengesetz oder der EU-ECSP-Verordnung. Die BaFin billigt Prospekte formal, prüft jedoch nicht die wirtschaftliche Werthaltigkeit oder Erfolgsaussicht des Projekts." },
    ],
    relatedArticles: ["nachrangdarlehen-einfach-erklaert", "plattform-insolvenz-was-passiert-mit-meinem-geld"],
  },
};

export const categoryList = Object.values(categories);
