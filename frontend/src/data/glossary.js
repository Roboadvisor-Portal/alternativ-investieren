// Glossar-Begriffe – kurze, präzise, zitierfähige Definitionen (GEO-optimiert)
export const glossary = [
  {
    term: "Crowdlending",
    slug: "crowdlending",
    definition:
      "Crowdlending (auch P2P-Kredite oder Schwarmfinanzierung) bezeichnet die Vergabe von Krediten durch viele private Anleger gemeinsam über eine Online-Plattform an Unternehmen, Immobilienprojekte oder Privatpersonen. Die Anleger erhalten dafür Zinsen. Anders als bei einem Bankguthaben besteht keine gesetzliche Einlagensicherung; bei Ausfall des Kreditnehmers oder der Plattform droht ein Teil- oder Totalverlust.",
    related: ["nachrangdarlehen", "p2p-kredit", "einlagensicherung"],
  },
  {
    term: "Nachrangdarlehen",
    slug: "nachrangdarlehen",
    definition:
      "Ein Nachrangdarlehen ist ein Kredit, bei dem der Darlehensgeber (Anleger) im Insolvenzfall des Darlehensnehmers erst dann bedient wird, wenn alle vorrangigen Gläubiger vollständig befriedigt wurden. Möglich macht dies ein vertraglicher Rangrücktritt. Nachrangdarlehen sind bei alternativen Investments verbreitet, weil sie bilanziell oft wie Eigenkapital wirken – für Anleger bedeuten sie ein erhöhtes Verlustrisiko.",
    related: ["rangruecktritt", "crowdlending", "vermoegensanlagengesetz"],
  },
  {
    term: "Rangrücktritt",
    slug: "rangruecktritt",
    definition:
      "Der Rangrücktritt ist eine vertragliche Klausel, mit der ein Gläubiger auf seinen gleichrangigen Anspruch verzichtet und sich freiwillig hinter andere Gläubiger einreiht. Bei Nachrangdarlehen führt der Rangrücktritt dazu, dass Anleger im Insolvenzfall zuletzt bedient werden und ihr Kapital vollständig verlieren können.",
    related: ["nachrangdarlehen"],
  },
  {
    term: "Einlagensicherung",
    slug: "einlagensicherung",
    definition:
      "Die gesetzliche Einlagensicherung schützt Bankguthaben (z. B. auf Giro-, Tagesgeld- oder Festgeldkonten) bis zu 100.000 Euro pro Kunde und Institut im Falle einer Bankpleite. Investments in Crowdlending, Nachrangdarlehen oder Crowdinvesting fallen NICHT unter die Einlagensicherung – das eingesetzte Kapital ist im Ausfall- oder Insolvenzfall nicht geschützt.",
    related: ["crowdlending", "nachrangdarlehen"],
  },
  {
    term: "Immobilien-Crowdinvesting",
    slug: "immobilien-crowdinvesting",
    definition:
      "Beim Immobilien-Crowdinvesting finanzieren viele Anleger gemeinsam über eine Plattform ein Immobilienprojekt (Neubau, Bestand oder Bauträgerfinanzierung), meist über Nachrangdarlehen oder Anleihen. Anleger erhalten feste Zinsen über eine begrenzte Laufzeit. Die Anlage unterliegt in Deutschland häufig dem Vermögensanlagengesetz und trägt ein erhebliches Ausfallrisiko.",
    related: ["nachrangdarlehen", "vermoegensanlagengesetz", "ltv"],
  },
  {
    term: "ECSP-Verordnung",
    slug: "ecsp-verordnung",
    definition:
      "Die ECSP-Verordnung (European Crowdfunding Service Providers Regulation, EU 2020/1503) ist der einheitliche EU-Rechtsrahmen für Schwarmfinanzierungsdienstleister. Plattformen benötigen eine Zulassung durch die zuständige Aufsichtsbehörde (in Deutschland die BaFin) und müssen ein Anlagebasisinformationsblatt (KIIS) bereitstellen. Sie erhöht den Anlegerschutz, beseitigt aber nicht das grundsätzliche Verlustrisiko.",
    related: ["bafin", "immobilien-crowdinvesting"],
  },
  {
    term: "BaFin",
    slug: "bafin",
    definition:
      "Die Bundesanstalt für Finanzdienstleistungsaufsicht (BaFin) ist die deutsche Finanzaufsichtsbehörde. Sie billigt Wertpapierprospekte und Vermögensanlagen-Verkaufsprospekte, beaufsichtigt Banken und Finanzdienstleister und lässt Crowdfunding-Plattformen nach der ECSP-Verordnung zu. Eine BaFin-Billigung eines Prospekts ist keine Empfehlung und kein Qualitätssiegel für die Werthaltigkeit einer Anlage.",
    related: ["ecsp-verordnung", "vermoegensanlagengesetz"],
  },
  {
    term: "Vermögensanlagengesetz",
    slug: "vermoegensanlagengesetz",
    definition:
      "Das Vermögensanlagengesetz (VermAnlG) regelt in Deutschland den öffentlichen Vertrieb von Vermögensanlagen wie Nachrangdarlehen, partiarischen Darlehen und Namensschuldverschreibungen. Es sieht Prospekt- bzw. Informationsblattpflichten (VIB) vor, stellt aber geringere regulatorische Hürden als ein Wertpapierprospekt – ein Grund, warum viele Crowdinvesting-Projekte diese Form nutzen.",
    related: ["nachrangdarlehen", "bafin"],
  },
  {
    term: "LTV (Loan-to-Value)",
    slug: "ltv",
    definition:
      "Der Loan-to-Value (Beleihungsauslauf) beschreibt das Verhältnis der Darlehenssumme zum Wert der finanzierten Immobilie, angegeben in Prozent. Ein niedriger LTV (z. B. 60 %) bedeutet einen größeren Sicherheitspuffer für Anleger, ein hoher LTV (z. B. über 85 %) ein höheres Verlustrisiko, falls der Immobilienwert sinkt.",
    related: ["immobilien-crowdinvesting"],
  },
  {
    term: "Zweitmarkt",
    slug: "zweitmarkt",
    definition:
      "Der Zweitmarkt (Sekundärmarkt) ist ein von manchen Plattformen angebotener Handelsplatz, auf dem Anleger ihre laufenden Investments vor Ende der Laufzeit an andere Nutzer verkaufen können. Er erhöht die Fungibilität, ist jedoch nicht garantiert: In Krisenzeiten finden sich häufig keine Käufer oder nur mit deutlichem Abschlag.",
    related: ["crowdlending", "fungibilitaet"],
  },
  {
    term: "Ausfallrate",
    slug: "ausfallrate",
    definition:
      "Die Ausfallrate gibt an, welcher Anteil der vergebenen Kredite oder finanzierten Projekte nicht vertragsgemäß zurückgezahlt wurde. Sie ist eine zentrale Kennzahl zur Risikoeinschätzung einer Crowdlending-Plattform. Historische Ausfallraten sind ein Anhaltspunkt, aber keine Garantie für die künftige Entwicklung.",
    related: ["crowdlending"],
  },
  {
    term: "Diversifikation",
    slug: "diversifikation",
    definition:
      "Diversifikation bezeichnet die Streuung des investierten Kapitals über viele verschiedene Projekte, Anlageklassen und Plattformen, um das Risiko einzelner Ausfälle zu begrenzen. Bei alternativen Investments gilt Diversifikation als wichtigstes Instrument zur Risikoreduktion, weil einzelne Totalausfälle so nur einen kleinen Teil des Portfolios treffen.",
    related: ["klumpenrisiko", "crowdlending"],
  },
  {
    term: "Klumpenrisiko",
    slug: "klumpenrisiko",
    definition:
      "Ein Klumpenrisiko entsteht, wenn ein großer Anteil des Kapitals in einer einzigen Anlage, einem Anbieter oder einer Anlageklasse konzentriert ist. Fällt diese Position aus, ist der Verlust überproportional groß. Wer etwa in mehrere Serien desselben Emittenten investiert, potenziert das Risiko statt es zu streuen.",
    related: ["diversifikation"],
  },
  {
    term: "P2P-Kredit",
    slug: "p2p-kredit",
    definition:
      "Ein P2P-Kredit (Peer-to-Peer) ist ein Kredit, den Privatpersonen über eine Online-Plattform direkt an andere Privatpersonen oder Unternehmen vergeben, ohne dass eine Bank als klassischer Kreditgeber dazwischensteht. P2P-Kredite sind eine Form des Crowdlendings und tragen dieselben Ausfall- und Plattformrisiken.",
    related: ["crowdlending"],
  },
  {
    term: "Fungibilität",
    slug: "fungibilitaet",
    definition:
      "Fungibilität beschreibt, wie leicht sich eine Anlage vor Ende der Laufzeit wieder zu Geld machen lässt. Crowdlending- und Crowdinvesting-Anlagen sind meist gering fungibel: Das Kapital ist in der Regel für die gesamte Laufzeit gebunden, ein vorzeitiger Verkauf ist selten oder nur über einen Zweitmarkt mit Abschlag möglich.",
    related: ["zweitmarkt"],
  },
  {
    term: "Abgeltungsteuer",
    slug: "abgeltungsteuer",
    definition:
      "Die Abgeltungsteuer ist die pauschale Steuer auf Kapitalerträge in Deutschland. Sie beträgt 25 % zuzüglich 5,5 % Solidaritätszuschlag auf die Steuer und gegebenenfalls Kirchensteuer. Zinsen aus Crowdlending und Nachrangdarlehen unterliegen der Abgeltungsteuer; bis zum Sparer-Pauschbetrag (1.000 € pro Person) bleiben Kapitalerträge steuerfrei.",
    related: ["sparer-pauschbetrag", "crowdlending"],
  },
  {
    term: "Sparer-Pauschbetrag",
    slug: "sparer-pauschbetrag",
    definition:
      "Der Sparer-Pauschbetrag ist der jährliche Freibetrag für Kapitalerträge in Deutschland. Er beträgt seit 2023 1.000 Euro pro Person (2.000 Euro bei gemeinsam veranlagten Ehepaaren). Bis zu diesem Betrag bleiben Zinsen, Dividenden und andere Kapitalerträge steuerfrei, sofern ein Freistellungsauftrag erteilt wurde.",
    related: ["abgeltungsteuer"],
  },
];
