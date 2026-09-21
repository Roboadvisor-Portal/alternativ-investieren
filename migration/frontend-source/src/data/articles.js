// Ratgeber-Artikel – Volltext (Blöcke). Zahlenangaben recherchiert, mit Quelle.
export const articles = [
  {
    slug: "crowdlending-vs-klassisches-sparen",
    title: "Crowdlending vs. klassisches Sparen: Chancen und Risiken im Vergleich",
    excerpt:
      "Höhere Zinschancen, aber keine Einlagensicherung: Was Crowdlending vom Sparbuch unterscheidet – mit aktuellen Marktzahlen und klarer Risiko-Einordnung.",
    category: "crowdlending",
    tags: ["Crowdlending", "Diversifikation", "Ausfallrisiken"],
    author: "Markus G",
    published: "2026-07-01",
    updated: "2026-07-01",
    readingTime: 6,
    heroImage:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt:
      "Gegenüberstellung von klassischem Sparen und Crowdlending als Netzwerkgrafik",
    answerFirst:
      "Crowdlending ist eine alternative Anlageform, bei der viele private Anleger über eine Online-Plattform gemeinsam Geld an Unternehmen oder Projekte verleihen und dafür Zinsen erhalten. Im Vergleich zum klassischen Sparbuch oder Tagesgeldkonto bietet Crowdlending deutlich höhere Zinschancen, verzichtet dafür aber vollständig auf die gesetzliche Einlagensicherung von bis zu 100.000 Euro. Fällt ein Kreditnehmer aus oder wird die Plattform insolvent, kann das eingesetzte Kapital ganz oder teilweise verloren gehen. Crowdlending eignet sich daher nur als Beimischung für Anleger, die bereits über eine sichere Basis (Tagesgeld, Festgeld, breit gestreute ETFs) verfügen und einen begrenzten Betrag höherem Risiko aussetzen möchten – nicht als Ersatz für die Notfallreserve.",
    blocks: [
      { type: "p", text: "Wer heute Geld anlegen möchte, ohne es direkt in Aktien oder ETFs zu stecken, stößt fast zwangsläufig auf Crowdlending. Beim Crowdlending leihen viele Privatanleger gemeinsam über eine Online-Plattform Geld an Unternehmen, Immobilienprojekte oder andere Kreditnehmer und erhalten dafür Zinsen. Das Prinzip ist einfach, die Unterschiede zum klassischen Sparbuch oder Tagesgeldkonto sind es nicht." },
      { type: "h2", text: "Wie groß ist der Markt wirklich?" },
      { type: "p", text: "Der deutsche Crowdinvesting-Markt hat sich in den 2010er-Jahren rasant entwickelt: Wurden 2011 gerade einmal 1,5 Millionen Euro über Crowdinvesting-Plattformen finanziert, waren es 2019 bereits 417,7 Millionen Euro – ein Wachstum um mehr als das 270-Fache innerhalb von acht Jahren. 2020 lag das Volumen bei 327,8 Millionen Euro (Quelle: Statista/crowdfunding.de). Das zeigt: Crowdlending und Crowdinvesting sind längst kein Nischenphänomen mehr, sondern ein etablierter Teil des deutschen Kapitalmarkts." },
      { type: "chart", chart: "marktvolumen" },
      { type: "h2", text: "Der zentrale Unterschied: Verzinsung gegen Sicherheit" },
      { type: "p", text: "Ein Tagesgeldkonto oder Sparbuch bei einer Bank fällt unter die gesetzliche Einlagensicherung: Bis 100.000 Euro pro Kunde und Institut sind im Falle einer Bankpleite abgesichert. Im Gegenzug ist die Verzinsung entsprechend niedrig – sie bewegt sich meist im Bereich der Inflation oder knapp darüber." },
      { type: "p", text: "Bei Crowdlending-Plattformen sieht das anders aus. Anleger vergeben direkt oder über eine Zweckgesellschaft Kredite an Unternehmen oder Projektträger. Die in Aussicht gestellten Zinsen liegen oft deutlich über dem, was Banken bieten – im Gegenzug entfällt die Einlagensicherung vollständig. Fällt der Kreditnehmer aus oder wird die Plattform selbst insolvent, kann das eingesetzte Kapital ganz oder teilweise verloren gehen." },
      { type: "h2", text: "Chancen von Crowdlending" },
      { type: "ul", items: [
        "Höhere Zinschancen als bei klassischen Bankprodukten",
        "Bereits mit kleinen Beträgen (oft ab 50 oder 100 Euro) investierbar",
        "Breite Auswahl an Projekten und Anlageklassen (Konsumkredite, Unternehmensfinanzierung, Immobilienprojekte)",
        "Transparente Projektbeschreibungen auf den meisten Plattformen",
      ]},
      { type: "h2", text: "Risiken von Crowdlending" },
      { type: "ul", items: [
        "Kein gesetzlicher Einlagenschutz wie bei Bankguthaben",
        "Ausfallrisiko des einzelnen Kreditnehmers oder Projekts",
        "Zusätzliches Plattformrisiko: Gerät der Betreiber selbst in Schieflage, sind Auszahlungen oft monatelang blockiert",
        "Geringe Fungibilität: Investiertes Geld ist meist für die gesamte Laufzeit gebunden, ein vorzeitiger Verkauf ist selten oder nur mit Abschlag möglich",
      ]},
      { type: "h2", text: "Für wen eignet sich Crowdlending?" },
      { type: "p", text: "Crowdlending eignet sich als Beimischung für Anleger, die einen Teil ihres Vermögens bereits sicher angelegt haben (Tagesgeld, Festgeld, breit gestreute ETFs) und bereit sind, mit einem begrenzten Betrag ein höheres Risiko für höhere Zinschancen einzugehen. Als alleinige Anlageform oder gar als Ersatz für eine Notfallreserve ist es ungeeignet – dafür fehlt die jederzeitige Verfügbarkeit und die Absicherung." },
      { type: "h2", text: "Fazit" },
      { type: "p", text: "Crowdlending ist kein Ersatz für das Sparbuch, sondern eine andere Anlageklasse mit eigenem Risikoprofil. Wer die Unterschiede kennt und sein Kapital entsprechend streut, kann von den höheren Zinschancen profitieren – ohne von den Risiken überrascht zu werden. Wie stark eine Diversifikation über mehrere Plattformen das Risiko senkt, zeigt unser {link:diversifikations-rechner:Diversifikations-Rechner}." },
    ],
    sources: [
      "Statista / crowdfunding.de: Entwicklung des Crowdinvesting-Volumens in Deutschland 2011–2020",
    ],
  },
  {
    slug: "plattform-insolvenz-was-passiert-mit-meinem-geld",
    title: "Was passiert mit meinem Geld bei einer Plattform-Insolvenz?",
    excerpt:
      "Zwei reale Insolvenzfälle, der typische Verfahrensablauf und was Anleger konkret tun sollten, wenn eine Plattform oder ein Emittent pleitegeht.",
    category: "crowdlending",
    tags: ["Plattform-Insolvenzen", "Ausfallrisiken", "Regulierung/BaFin"],
    author: "Markus G",
    published: "2026-07-01",
    updated: "2026-07-01",
    readingTime: 7,
    heroImage:
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Verschlossene Tür als Symbol für eine Plattform-Insolvenz",
    answerFirst:
      "Bei einer Plattform- oder Emittenten-Insolvenz wird das investierte Geld privater Anleger häufig erst nach allen anderen Gläubigern bedient – bei den weit verbreiteten Nachrangdarlehen oft gar nicht. Der Grund ist die rechtliche Konstruktion: Anleger halten nachrangige Forderungen ohne gesetzliche Einlagensicherung. Der typische Ablauf ist: Zahlungsstopp, Insolvenzantrag, Bestellung eines vorläufigen Insolvenzverwalters, fristgerechte Forderungsanmeldung und schließlich die Verwertung mit Auszahlung einer Quote, die bei nachrangigen Forderungen null betragen kann. Anleger sollten im Insolvenzfall Fristen zur Forderungsanmeldung prüfen, alle Unterlagen sichern und sich bei größeren Summen an eine spezialisierte Kanzlei oder Verbraucherzentrale wenden. Reale Fälle wie Deutsche Lichtmiete (2021) und Degag (2025) zeigen, dass Totalverluste keine theoretische Gefahr sind.",
    blocks: [
      { type: "p", text: "Die Frage klingt unangenehm, ist aber genau deshalb wichtig: Was passiert eigentlich mit meinem investierten Geld, wenn die Plattform oder das Unternehmen, dem ich es geliehen habe, insolvent geht? Zwei reale Fälle aus den vergangenen Jahren zeigen, wie unterschiedlich schwer die Folgen für Anleger sein können." },
      { type: "h2", text: "Der Fall Deutsche Lichtmiete" },
      { type: "p", text: "Die Deutsche Lichtmiete-Gruppe aus Oldenburg sammelte über Anleihen und Direktinvestments insgesamt rund 200 Millionen Euro von Privatanlegern ein. Das Geschäftsmodell: Anleger kauften Industrieleuchten, die das Unternehmen zurückmietete und nach Ablauf der Laufzeit zu einem festen Preis zurückkaufen sollte – bei einer in Aussicht gestellten Rendite von rund 5 Prozent pro Jahr. Im Januar 2021 stellte die Unternehmensgruppe Insolvenzanträge, das Amtsgericht Oldenburg ordnete vorläufige Insolvenzverfahren an. Die Warnzeichen gab es vorher: Bereits 2018 hatte die Stiftung Warentest das Modell wegen der hohen Risiken als nicht empfehlenswert eingestuft. Anleger mussten in der Folge mit erheblichen Verlusten rechnen." },
      { type: "h2", text: "Der Fall Degag" },
      { type: "p", text: "Ein aktuelleres Beispiel: Die Deutsche Grundbesitz Holding AG (Degag) meldete im Januar 2025 Insolvenz an. Rund 6.300 Anleger bangten laut Handelsblatt-Berichterstattung um Investitionen in Höhe von bis zu 282 Millionen Euro. Auch hier hatten Anleger über Jahre attraktive Zinsen erhalten – bis die fälligen Zahlungen, darunter Vertriebsprovisionen und Steuerverbindlichkeiten, nicht mehr geleistet werden konnten." },
      { type: "h2", text: "Warum ist das Geld in solchen Fällen so gefährdet?" },
      { type: "p", text: "Der entscheidende Punkt ist die rechtliche Konstruktion vieler alternativer Investments: Sie erfolgen häufig über Nachrangdarlehen oder nachrangige Anleihen. Das bedeutet, dass die Forderungen der Anleger im Insolvenzfall erst nach allen anderen Gläubigern (Banken, Lieferanten, Finanzamt) bedient werden – wenn nach der Verwertung der verbliebenen Vermögenswerte überhaupt noch etwas übrig ist. Anders als bei einem Bankguthaben gibt es keine gesetzliche Einlagensicherung, die im Hintergrund einspringt. Mehr dazu in unserem Beitrag {link:nachrangdarlehen-einfach-erklaert:Nachrangdarlehen einfach erklärt}." },
      { type: "h2", text: "Der typische Ablauf einer Plattform- oder Emittenten-Insolvenz" },
      { type: "flow", steps: [
        { title: "Zahlungsstopp", text: "Zins- oder Rückzahlungen werden ausgesetzt, oft ohne lange Vorwarnung." },
        { title: "Insolvenzantrag", text: "Das Unternehmen oder ein Gläubiger stellt Antrag beim zuständigen Amtsgericht." },
        { title: "Vorläufiger Insolvenzverwalter", text: "Ein vom Gericht bestellter Verwalter sichert die verbliebenen Vermögenswerte; Zahlungen sind nur noch mit seiner Zustimmung möglich." },
        { title: "Forderungsanmeldung", text: "Anleger müssen ihre Forderungen fristgerecht anmelden – wer das versäumt, geht in der Regel leer aus." },
        { title: "Verwertung & Quote", text: "Am Ende steht meist nur eine Quote, ein Bruchteil der Investitionssumme – bei nachrangigen Forderungen kann sie null betragen." },
      ]},
      { type: "h2", text: "Was Anleger konkret tun sollten" },
      { type: "p", text: "Bei einer Insolvenzmeldung sollten Anleger zeitnah prüfen, ob und bis wann eine Forderungsanmeldung erforderlich ist, alle Vertragsunterlagen und Zahlungsnachweise griffbereit halten und sich – insbesondere bei größeren Summen – an eine auf Kapitalanlagerecht spezialisierte Kanzlei oder eine Verbraucherzentrale wenden, statt auf eigene Faust zu handeln." },
      { type: "h2", text: "Fazit" },
      { type: "p", text: "Ein Totalverlust ist bei alternativen Investments kein theoretisches Risiko, sondern in der Praxis bereits mehrfach eingetreten. Wer investiert, sollte deshalb nie mehr Geld einsetzen, als er im schlimmsten Fall verschmerzen kann, und konsequent über mehrere Anbieter und Anlageklassen streuen." },
    ],
    sources: [
      "Amtsgericht Oldenburg / Stiftung Warentest: Deutsche Lichtmiete (Insolvenz Januar 2021)",
      "Handelsblatt: Insolvenz der Deutsche Grundbesitz Holding AG (Degag), Januar 2025",
    ],
  },
  {
    slug: "nachrangdarlehen-einfach-erklaert",
    title: "Nachrangdarlehen einfach erklärt: Diese Risiken sollten Sie kennen",
    excerpt:
      "Was ein Nachrangdarlehen ist, warum Unternehmen es nutzen und weshalb Anleger im Insolvenzfall am Ende der Kette stehen – mit aktuellem Praxisbeispiel.",
    category: "immobilien-crowdinvesting",
    tags: ["Regulierung/BaFin", "Ausfallrisiken", "Diversifikation"],
    author: "Markus G",
    published: "2026-07-01",
    updated: "2026-07-01",
    readingTime: 7,
    heroImage:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    heroAlt: "Rangfolge-Grafik als Metapher für die Nachrangigkeit im Insolvenzfall",
    answerFirst:
      "Ein Nachrangdarlehen ist ein Kredit, bei dem der Anleger im Insolvenzfall des Darlehensnehmers erst dann bedient wird, wenn alle vorrangigen Gläubiger – Finanzamt, Sozialversicherung, besicherte Banken und ungesicherte Gläubiger – vollständig befriedigt wurden. Möglich macht das ein vertraglicher Rangrücktritt, mit dem der Anleger sich freiwillig hinter andere Gläubiger einreiht. Nachrangdarlehen versprechen überdurchschnittliche Zinsen, tragen aber ein entsprechend hohes Verlustrisiko: Es gibt keine Einlagensicherung, und bei unzureichender Insolvenzmasse gehen nachrangige Anleger häufig komplett leer aus. Sie können ein legitimer Baustein einer breit gestreuten Anlagestrategie sein, eignen sich aber nicht für Anleger, die auf die Sicherheit ihres Kapitals angewiesen sind.",
    blocks: [
      { type: "p", text: "Nachrangdarlehen gehören zu den häufigsten Konstruktionen bei alternativen Investments in Immobilien, Energieprojekte oder Unternehmensfinanzierungen. Sie versprechen oft überdurchschnittliche Zinsen – genau dieser Zusammenhang zwischen hoher Rendite und hohem Risiko sollte jedem Anleger vor der Zeichnung klar sein." },
      { type: "h2", text: "Was ist ein Nachrangdarlehen?" },
      { type: "p", text: "Ein Nachrangdarlehen ist ein Kredit, bei dem der Darlehensgeber – also der Anleger – im Fall einer Insolvenz des Darlehensnehmers erst dann bedient wird, wenn alle vorrangigen Gläubiger vollständig befriedigt wurden. Möglich macht das ein sogenannter Rangrücktritt: eine vertragliche Klausel, mit der der Anleger auf seinen gleichrangigen Anspruch verzichtet und sich freiwillig hinter andere Gläubiger einreiht." },
      { type: "h2", text: "Warum nutzen Unternehmen dieses Modell?" },
      { type: "p", text: "Für Unternehmen ist das Nachrangdarlehen attraktiv, weil es bilanziell oft wie Eigenkapital wirkt, ohne dass die Anleger echte Mitspracherechte erhalten wie ein Gesellschafter. Zudem unterliegt die öffentliche Anbahnung solcher Darlehen in Deutschland dem Vermögensanlagengesetz, mit im Vergleich zu einem Börsenprospekt geringeren regulatorischen Hürden – ein Grund, warum gerade kleinere und mittlere Projektgesellschaften diese Finanzierungsform nutzen." },
      { type: "h2", text: "Ein aktuelles Beispiel aus der Praxis" },
      { type: "p", text: "Wie real das Risiko ist, zeigt der Fall der Namensschuldverschreibungen ProReal Europa 9 und 10, die Immobilienprojekte des Anbieters Soravia mitfinanzierten. Nachdem sich bei zwei größeren Projekten Probleme in Höhe von zusammen rund 47,1 Millionen Euro aufgetan hatten, wurden die Darlehensforderungen der beiden Gesellschaften im März 2025 verkauft – für lediglich 6,2 beziehungsweise 10,8 Millionen Euro. Anleger mussten laut Stiftung Warentest mit dem Verlust eines Großteils ihres eingesetzten Kapitals rechnen, während bereits zuvor, ab dem vierten Quartal 2023, Zinszahlungen für mehrere Serien ausgesetzt worden waren." },
      { type: "h2", text: "Wer wird im Insolvenzfall zuerst bedient?" },
      { type: "rank", steps: [
        { rank: "1", title: "Finanzamt & Sozialversicherung", note: "Vorrangige öffentliche Forderungen" },
        { rank: "2", title: "Banken & besicherte Gläubiger", note: "Durch Sicherheiten abgesichert" },
        { rank: "3", title: "Ungesicherte Gläubiger", note: "Lieferanten, sonstige Gläubiger" },
        { rank: "4", title: "Nachrangige Anleger (Nachrangdarlehen)", note: "Gehen oft leer aus", highlight: true },
      ]},
      { type: "h2", text: "Die wichtigsten Risikofaktoren im Überblick" },
      { type: "ul", items: [
        "Nachrangigkeit: Im Insolvenzfall werden zuerst Finanzamt, Sozialversicherungsträger und besicherte Gläubiger wie Banken bedient. Nachrangige Anleger stehen am Ende der Kette und gehen bei unzureichender Insolvenzmasse oft komplett leer aus.",
        "Keine Einlagensicherung: Anders als Bankguthaben sind Nachrangdarlehen durch keinerlei gesetzlichen Schutzmechanismus abgesichert.",
        "Eingeschränkte Informationslage: Anleger müssen sich meist auf Verkaufsprospekte und Jahresabschlüsse des Emittenten verlassen, ohne die tatsächliche Innenansicht des Projekts zu kennen.",
        "Klumpenrisiko: Wer in mehrere Serien desselben Anbieters investiert (wie bei ProReal geschehen), potenziert das Risiko statt es zu streuen.",
        "Aussetzung vor Insolvenz: Zinszahlungen werden häufig bereits Monate vor einem offiziellen Insolvenzantrag ausgesetzt – ein Warnsignal, das Anleger ernst nehmen sollten.",
      ]},
      { type: "h2", text: "Worauf Sie vor der Zeichnung achten sollten" },
      { type: "p", text: "Prüfen Sie den Verkaufsprospekt auf die tatsächliche Mittelverwendung, schauen Sie sich die letzten veröffentlichten Jahresabschlüsse des Emittenten an, und seien Sie besonders skeptisch, wenn die in Aussicht gestellte Rendite deutlich über dem branchenüblichen Niveau liegt – das ist häufig ein Hinweis auf ein entsprechend höheres Risiko, nicht auf eine besonders gute Gelegenheit." },
      { type: "h2", text: "Fazit" },
      { type: "p", text: "Nachrangdarlehen können ein legitimer Baustein einer breit gestreuten Anlagestrategie sein, sind aber keine Alternative zu klassischem Sparen und eignen sich nicht für Anleger, die auf die Sicherheit ihres Kapitals angewiesen sind. Wie sich ein Totalverlust im schlimmsten Fall auf Ihr Gesamtportfolio auswirken würde, können Sie mit unserem {link:diversifikations-rechner:Diversifikations-Rechner} überschlagen." },
    ],
    sources: [
      "Stiftung Warentest: ProReal Europa 9 und 10 (Soravia), Forderungsverkauf März 2025",
    ],
  },
];

export const ratgeberTags = [
  "Steuern",
  "Regulierung/BaFin",
  "Ausfallrisiken",
  "Plattform-Insolvenzen",
  "Diversifikation",
  "Crowdlending",
  "Immobilien-Crowdinvesting",
];
