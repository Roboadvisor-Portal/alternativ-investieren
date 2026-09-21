// Begleitende SEO/GEO-Texte für die Rechner-Seiten.
// Inline-Links im Markdown-Stil: [Label](/pfad). Fett: **text**.

export const rechnerContent = {
  rendite: {
    heading: "Alles Wissenswerte zum Rendite-Szenario-Rechner",
    answer:
      "Der Rendite-Szenario-Rechner berechnet modellhaft, wie sich ein Anlagebetrag über eine gewählte Laufzeit entwickeln könnte – und zwar in drei Szenarien: konservativ, realistisch und optimistisch. Grundlage ist die Zinseszins-Formel Endkapital = Anlagebetrag × (1 + Zinssatz)^Jahre. Statt einer einzelnen, scheinbar präzisen Prognose zeigt das Werkzeug bewusst eine Bandbreite, weil künftige Erträge bei Crowdlending und Immobilien-Crowdinvesting nicht sicher vorhersehbar sind. Alle Ergebnisse sind Modellrechnungen und keine Zusicherung.",
    sections: [
      {
        h2: "Wie funktioniert der Rendite-Szenario-Rechner?",
        paragraphs: [
          "Sie geben drei Werte ein: den **Anlagebetrag**, die **Anlagedauer** in Jahren und die **Anlageklasse**. Für jede Anlageklasse sind drei jährliche Zinssätze hinterlegt – ein konservativer, ein realistischer und ein optimistischer. Der Rechner wendet diese Sätze über die gesamte Laufzeit als jährlichen Zinseszins an und zeigt Ihnen für jedes Szenario das voraussichtliche Endkapital sowie den kumulierten Wertzuwachs. Die Linien im Diagramm veranschaulichen, wie stark sich schon kleine Unterschiede im Zinssatz über die Jahre auf das Ergebnis auswirken.",
          "Die hinterlegten Bandbreiten orientieren sich an historischen Erfahrungswerten der jeweiligen Anlageklasse und werden redaktionell gepflegt. Für [Crowdlending](/crowdlending/) liegen die Spannen naturgemäß höher als für besicherte Anlagen, für [Immobilien-Crowdinvesting](/immobilien-crowdinvesting/) etwas enger. Wichtig: Es handelt sich um Orientierungswerte, nicht um garantierte oder erwartete Renditen.",
        ],
      },
      {
        h2: "Warum drei Szenarien statt einer einzelnen Prognose?",
        paragraphs: [
          "Eine punktgenaue Renditeprognose würde eine Sicherheit vortäuschen, die es bei alternativen Investments nicht gibt. Kreditausfälle, Projektverzögerungen und das allgemeine Zinsumfeld sorgen dafür, dass die tatsächliche Rendite deutlich vom Idealfall abweichen kann. Das Drei-Szenarien-Modell macht diese Unsicherheit sichtbar: Das konservative Szenario zeigt, was übrig bleibt, wenn viel schiefgeht; das optimistische, was maximal drin ist; das realistische bildet den wahrscheinlicheren Mittelweg ab.",
          "Diese Darstellung ist auch rechtlich sauberer. Formulierungen wie „erwarten Sie X Prozent Rendite“ sind bei riskanten Kapitalanlagen problematisch. Deshalb sprechen wir konsequent von **Modellrechnungen** und historischen Bandbreiten – ein Grundsatz, den Sie auch in unseren [Risikohinweisen](/risikohinweise/) wiederfinden.",
        ],
      },
      {
        h2: "Welche Faktoren beeinflussen Ihre tatsächliche Rendite?",
        paragraphs: [
          "Der Rechner bildet den Idealfall ohne Störungen ab. In der Praxis mindern mehrere Faktoren das Ergebnis: An erster Stelle stehen **Kreditausfälle**. Schon eine Ausfallquote von wenigen Prozent kann einen zweistelligen Bruttozins auf eine einstellige Nettorendite drücken. Warum das so gefährlich ist, erklärt unser Ratgeber [Crowdlending vs. klassisches Sparen](/ratgeber/crowdlending-vs-klassisches-sparen).",
          "Hinzu kommen **Steuern** auf Kapitalerträge, **Plattformgebühren**, mögliche **Währungsrisiken** bei ausländischen Anbietern und der sogenannte Cash-Drag – Geld, das zwischen Rückzahlung und Wiederanlage unverzinst liegt. Wie stark die Steuer Ihre Nettorendite beeinflusst, können Sie mit unserem [Steuer-Rechner Kapitalerträge](/rechner/steuer-rechner-kapitalertraege) überschlagen. Und wie sich ein einzelner Totalausfall auf Ihr Gesamtergebnis auswirkt, zeigt der [Diversifikations-Rechner](/rechner/diversifikations-rechner).",
        ],
      },
      {
        h2: "Bedeutung und Nutzen: Wofür ist der Rechner gut?",
        paragraphs: [
          "Der eigentliche Nutzen liegt nicht in der exakten Zahl am Ende, sondern im **Gefühl für Größenordnungen**. Sie erkennen sofort, welchen Unterschied ein zusätzliches Anlagejahr macht, wie stark der Zinseszinseffekt bei langen Laufzeiten wirkt und wie weit optimistisches und konservatives Szenario auseinanderliegen. Genau diese Spannweite ist die wichtigste Erkenntnis: Sie ist ein Maß für das Risiko, das Sie eingehen.",
          "Für Einsteiger eignet sich der Rechner als Realitätscheck vor der ersten Investition. Erfahrene Anleger nutzen ihn, um verschiedene Laufzeiten und Anlageklassen schnell gegeneinander abzuwägen. In beiden Fällen gilt: Das konservative Szenario sollte immer der Maßstab sein, an dem Sie prüfen, ob eine Anlage auch dann noch zu Ihren Zielen passt, wenn es schlechter läuft als erhofft.",
        ],
      },
      {
        h2: "So interpretieren Sie das Ergebnis richtig",
        paragraphs: [
          "Nehmen Sie das optimistische Szenario niemals als Planungsgrundlage – es ist der günstigste denkbare Verlauf, nicht der wahrscheinliche. Planen Sie stattdessen mit dem konservativen Wert und betrachten Sie alles darüber als Bonus. Berücksichtigen Sie außerdem, dass der Rechner Ausfälle und Steuern nicht abzieht: Ihre reale Nettorendite liegt in der Praxis meist unterhalb des realistischen Szenarios.",
          "Ergänzen Sie die Zahlen um qualitative Prüfungen: Wie seriös ist der Anbieter, wie hoch sind die historischen Ausfallraten, und wie gut ist Ihr Kapital gestreut? Fachbegriffe wie [Ausfallrate](/glossar/#ausfallrate), [Diversifikation](/glossar/#diversifikation) oder [Nachrangdarlehen](/glossar/#nachrangdarlehen) erklären wir kompakt in unserem [Glossar](/glossar/).",
        ],
      },
    ],
    faq: [
      { q: "Ist das Ergebnis des Rendite-Rechners eine verbindliche Prognose?", a: "Nein. Der Rechner liefert eine vereinfachte Modellrechnung auf Basis historischer Bandbreiten. Er berücksichtigt keine Ausfälle, Steuern oder Gebühren und stellt keine Zusicherung oder Anlageberatung dar. Die tatsächliche Rendite kann erheblich abweichen, bis hin zum Totalverlust." },
      { q: "Warum zeigt der Rechner drei Szenarien?", a: "Weil künftige Erträge bei alternativen Investments nicht sicher vorhersehbar sind. Die drei Szenarien (konservativ, realistisch, optimistisch) machen die Bandbreite und damit das Risiko sichtbar, statt eine trügerische Punktgenauigkeit vorzutäuschen." },
      { q: "Welchen Wert sollte ich meiner Planung zugrunde legen?", a: "Orientieren Sie sich am konservativen Szenario. Es zeigt, was übrig bleibt, wenn vieles ungünstig verläuft. Alles darüber sollten Sie als möglichen Zusatzertrag, nicht als Planungsgröße betrachten." },
      { q: "Berücksichtigt der Rechner Steuern und Kreditausfälle?", a: "Nein, beides ist bewusst ausgeklammert, um die reine Zinseszins-Wirkung zu zeigen. Für die Steuer nutzen Sie den Steuer-Rechner Kapitalerträge, für das Ausfallrisiko den Diversifikations-Rechner." },
    ],
  },

  diversifikation: {
    heading: "Alles Wissenswerte zum Diversifikations-Rechner",
    answer:
      "Der Diversifikations-Rechner zeigt, wie stark Ihr geplantes Portfolio auf einzelne Positionen konzentriert ist – und damit, wie hoch Ihr Klumpenrisiko ausfällt. Sie tragen Ihre geplante Aufteilung über mehrere Plattformen oder Projekte ein; das Werkzeug berechnet daraus den Anteil der größten Position und den Herfindahl-Hirschman-Index (HHI) und stuft das Konzentrationsrisiko in einer Ampel von grün bis rot ein. So erkennen Sie auf einen Blick, ob Ihr Kapital breit gestreut oder gefährlich gebündelt ist.",
    sections: [
      {
        h2: "Wie funktioniert der Diversifikations-Rechner?",
        paragraphs: [
          "Sie fügen für jede geplante Anlage eine Position mit Name und Betrag hinzu. Der Rechner ermittelt daraus zwei Kennzahlen: den **prozentualen Anteil der größten Einzelposition** und den **Herfindahl-Hirschman-Index (HHI)**, die Summe der quadrierten Anteile aller Positionen. Ein HHI nahe 0 steht für eine breite Streuung, ein Wert nahe 1 bedeutet, dass praktisch das gesamte Kapital in einer einzigen Position steckt.",
          "Aus diesen Kennzahlen leitet das Werkzeug eine Risiko-Ampel ab und gibt eine allgemeine Handlungsempfehlung. Das Tortendiagramm visualisiert die Verteilung zusätzlich, sodass Sie Ungleichgewichte sofort sehen. Sie können Positionen jederzeit hinzufügen, anpassen oder entfernen und beobachten, wie sich die Kennzahlen verändern.",
        ],
      },
      {
        h2: "Was ist Klumpenrisiko – und warum ist es so gefährlich?",
        paragraphs: [
          "Ein [Klumpenrisiko](/glossar/#klumpenrisiko) entsteht, wenn ein großer Teil des Kapitals in wenigen Positionen konzentriert ist. Fällt eine dieser Positionen aus, ist der Verlust überproportional groß. Bei alternativen Investments ist das besonders relevant, weil ein einzelner [Ausfall](/glossar/#ausfallrate) hier häufig einen Totalverlust der betroffenen Position bedeutet – anders als etwa bei einem breit gestreuten Aktienfonds.",
          "Ein reales Beispiel liefert unser Ratgeber [Nachrangdarlehen einfach erklärt](/ratgeber/nachrangdarlehen-einfach-erklaert): Anleger, die in mehrere Serien desselben Emittenten investierten, potenzierten ihr Risiko, statt es zu streuen. Genau solche versteckten Konzentrationen macht der Rechner sichtbar.",
        ],
      },
      {
        h2: "Bedeutung und Nutzen für Ihre Anlagestrategie",
        paragraphs: [
          "Diversifikation gilt als das wirksamste Instrument zur Risikobegrenzung bei alternativen Investments – wichtiger als die Auswahl des vermeintlich besten Einzelprojekts. Der Rechner übersetzt dieses abstrakte Prinzip in konkrete Zahlen: Statt „ich sollte streuen“ sehen Sie schwarz auf weiß, dass beispielsweise 80 % Ihres Kapitals auf einer einzigen Plattform liegen und die Ampel deshalb auf Rot springt.",
          "Der Nutzen ist doppelt: Vor einer Investition hilft das Werkzeug bei der Planung einer ausgewogenen Aufteilung. Bei einem bestehenden Portfolio deckt es Konzentrationen auf, die man im Alltag leicht übersieht – etwa wenn über die Zeit immer wieder in denselben Anbieter investiert wurde. Grundlagen dazu vertieft unser Ratgeber [Crowdlending vs. klassisches Sparen](/ratgeber/crowdlending-vs-klassisches-sparen).",
        ],
      },
      {
        h2: "Wie viele Positionen sind sinnvoll?",
        paragraphs: [
          "Eine allgemeingültige Zahl gibt es nicht, aber die Faustregel lautet: lieber viele kleine als wenige große Beträge. Beim [Crowdlending](/crowdlending/) mit Mindestanlagen ab 25 Euro sind Portfolios aus mehreren Hundert Krediten üblich und sinnvoll. Beim [Immobilien-Crowdinvesting](/immobilien-crowdinvesting/) mit höheren Mindestbeträgen ist eine Streuung über zumindest zehn bis zwanzig verschiedene Projekte, Anbieter und Regionen ein realistisches Ziel.",
          "Entscheidend ist nicht nur die Anzahl, sondern auch die Vielfalt der Risikoquellen: verschiedene Kreditarten, verschiedene Plattformen und – wo sinnvoll – verschiedene Länder. Zwei Kredite desselben Emittenten sind trotz zweier Positionen kaum eine echte Streuung.",
        ],
      },
      {
        h2: "Grenzen des Rechners",
        paragraphs: [
          "Der Rechner misst ausschließlich die betragsmäßige Konzentration. Er bewertet nicht die Qualität oder Korrelation der einzelnen Anlagen. Zwei Positionen können betragsmäßig gut gestreut sein und trotzdem stark korreliert – etwa zwei Immobilienprojekte in derselben Stadt, die gemeinsam von einem lokalen Markteinbruch betroffen wären. Die Ampel-Schwellen sind allgemeine Orientierungswerte und keine individuelle Empfehlung.",
          "Nutzen Sie das Ergebnis daher als Ausgangspunkt, nicht als abschließendes Urteil. Ergänzen Sie es um eine inhaltliche Prüfung jedes Anbieters und behalten Sie das Zinsumfeld im Blick, das mehrere Projekte gleichzeitig treffen kann.",
        ],
      },
    ],
    faq: [
      { q: "Was ist der Herfindahl-Hirschman-Index (HHI)?", a: "Der HHI ist die Summe der quadrierten Anteile aller Positionen eines Portfolios. Er reicht von nahe 0 (sehr breit gestreut) bis 1 (gesamtes Kapital in einer einzigen Position). Je niedriger der Wert, desto besser ist Ihr Kapital diversifiziert." },
      { q: "Ab wann ist mein Klumpenrisiko zu hoch?", a: "Als grobe Orientierung: Die Ampel springt auf Gelb ab einem Anteil der größten Position von rund 25 % oder einem HHI von 0,2, auf Orange ab 40 %/0,3 und auf Rot ab 60 %/0,5. Das sind allgemeine Richtwerte, keine individuelle Empfehlung." },
      { q: "Reicht es, mein Geld auf zwei Plattformen zu verteilen?", a: "Meist nicht. Echte Diversifikation entsteht durch viele Positionen über verschiedene Kreditarten, Anbieter und Regionen. Zwei große Positionen senken das Klumpenrisiko nur begrenzt, besonders wenn sie ähnlichen Risiken ausgesetzt sind." },
      { q: "Berücksichtigt der Rechner die Qualität der Anlagen?", a: "Nein. Er misst nur die betragsmäßige Konzentration, nicht die Bonität oder Korrelation der Anlagen. Eine inhaltliche Prüfung jedes Anbieters bleibt zusätzlich notwendig." },
    ],
  },

  steuer: {
    heading: "Alles Wissenswerte zum Steuer-Rechner Kapitalerträge",
    answer:
      "Der Steuer-Rechner Kapitalerträge berechnet vereinfacht, wie viel Steuer auf Zinserträge aus Crowdlending, P2P-Krediten und Nachrangdarlehen anfällt und wie viel netto übrig bleibt. Für Deutschland berücksichtigt er die Abgeltungsteuer von 25 %, den Solidaritätszuschlag, die optionale Kirchensteuer sowie den Sparer-Pauschbetrag. Für Österreich rechnet er mit der KESt von 27,5 %, für die Schweiz mit dem persönlichen Einkommensteuersatz. So sehen Sie sofort Ihre Steuerlast und Ihre Nettorendite – die einzige Zahl, die für den Vermögensaufbau wirklich zählt.",
    sections: [
      {
        h2: "Wie funktioniert der Steuer-Rechner Kapitalerträge?",
        paragraphs: [
          "Sie wählen zunächst das Land (Deutschland, Österreich oder Schweiz) und geben Ihren jährlichen **Bruttozinsertrag** ein. In Deutschland können Sie zusätzlich angeben, ob Sie zusammenveranlagt sind und ob Sie kirchensteuerpflichtig sind. Der Rechner zieht zunächst den [Sparer-Pauschbetrag](/glossar/#sparer-pauschbetrag) ab, wendet dann die [Abgeltungsteuer](/glossar/#abgeltungsteuer) an und ergänzt Solidaritätszuschlag sowie gegebenenfalls Kirchensteuer.",
          "Als Ergebnis sehen Sie eine transparente Aufschlüsselung jedes Steuerbestandteils, die gesamte Steuerlast, die effektive Steuerquote und Ihren Netto-Ertrag. So wird nachvollziehbar, wie sich die einzelnen Komponenten zusammensetzen – statt nur eine pauschale Endzahl zu liefern.",
        ],
      },
      {
        h2: "Abgeltungsteuer, Soli und Kirchensteuer in Deutschland",
        paragraphs: [
          "In Deutschland unterliegen Kapitalerträge grundsätzlich der Abgeltungsteuer von **25 %**. Darauf wird der **Solidaritätszuschlag** von 5,5 % der Steuer erhoben – das entspricht rund 1,375 % des Ertrags. Kirchenmitglieder zahlen zusätzlich **8 oder 9 % Kirchensteuer** auf die Abgeltungsteuer, abhängig vom Bundesland. In der Summe ergibt sich eine Belastung von rund 26,4 % bis knapp 28 % des steuerpflichtigen Ertrags.",
          "Zinsen aus Crowdlending und Nachrangdarlehen zählen steuerlich zu den Einkünften aus Kapitalvermögen. Bei inländischen Plattformen wird die Steuer teils automatisch abgeführt; bei ausländischen Anbietern müssen Sie die Erträge in der Regel selbst in der Steuererklärung (Anlage KAP) angeben. Hintergründe zu den Anlageformen finden Sie auf unseren Seiten zu [Crowdlending](/crowdlending/) und [Immobilien-Crowdinvesting](/immobilien-crowdinvesting/).",
        ],
      },
      {
        h2: "Sparer-Pauschbetrag und Freistellungsauftrag",
        paragraphs: [
          "Jeder Person steht in Deutschland ein jährlicher Sparer-Pauschbetrag von **1.000 Euro** zu (2.000 Euro bei zusammenveranlagten Ehepaaren). Bis zu diesem Betrag bleiben Kapitalerträge steuerfrei. Der Rechner berücksichtigt diesen Freibetrag automatisch. Damit Ihre Bank oder Plattform den Freibetrag berücksichtigt, müssen Sie einen **Freistellungsauftrag** erteilen – sonst wird die Steuer zunächst einbehalten und Sie müssen sie über die Steuererklärung zurückholen.",
          "Wer mehrere Depots oder Plattformen nutzt, kann den Pauschbetrag aufteilen. Wichtig ist, die Summe aller Freistellungsaufträge nicht über 1.000 Euro (bzw. 2.000 Euro) hinaus zu vergeben.",
        ],
      },
      {
        h2: "Österreich und Schweiz im Vergleich",
        paragraphs: [
          "In **Österreich** gilt eine Kapitalertragsteuer (KESt) von **27,5 %**. Einen dem deutschen Sparer-Pauschbetrag vergleichbaren Freibetrag gibt es nicht, weshalb der volle Ertrag besteuert wird. In der **Schweiz** existiert keine Abgeltungsteuer: Zinserträge werden als Einkommen zum persönlichen Grenzsteuersatz versteuert. Die einbehaltene Verrechnungssteuer von 35 % ist bei korrekter Deklaration rückforderbar.",
          "Der Rechner bildet diese Unterschiede ab, sodass Anleger im gesamten DACH-Raum eine erste Orientierung erhalten. Für die Schweiz geben Sie Ihren individuellen Grenzsteuersatz an, da dieser je nach Kanton, Gemeinde und Einkommen stark variiert.",
        ],
      },
      {
        h2: "Bedeutung und Nutzen: Warum Sie in Netto denken sollten",
        paragraphs: [
          "Viele Anleger vergleichen Angebote anhand des beworbenen Bruttozinses. Entscheidend für den Vermögensaufbau ist jedoch der Betrag, der nach Steuern übrig bleibt. Der Rechner macht diesen Unterschied sichtbar und hilft Ihnen, Angebote realistisch zu vergleichen. In Kombination mit dem [Rendite-Szenario-Rechner](/rechner/rendite-szenario-rechner) und dem [Diversifikations-Rechner](/rechner/diversifikations-rechner) erhalten Sie ein vollständiges Bild aus Renditechance, Steuerlast und Risiko.",
          "Beachten Sie: Der Rechner ist eine vereinfachte Orientierungshilfe und ersetzt keine Steuerberatung. Individuelle Aspekte wie die Günstigerprüfung, die Verrechnung von Verlusten aus anderen Kapitalanlagen oder ausländische Quellensteuern bleiben unberücksichtigt. Details zu den steuerlichen Grundbegriffen finden Sie im [Glossar](/glossar/).",
        ],
      },
    ],
    faq: [
      { q: "Wie hoch ist die Steuer auf Crowdlending-Zinsen in Deutschland?", a: "In Deutschland fallen 25 % Abgeltungsteuer zzgl. 5,5 % Solidaritätszuschlag und ggf. 8–9 % Kirchensteuer an. Bis zum Sparer-Pauschbetrag von 1.000 Euro pro Person (2.000 Euro bei Ehepaaren) bleiben Kapitalerträge steuerfrei." },
      { q: "Was ist der Sparer-Pauschbetrag?", a: "Der Sparer-Pauschbetrag ist ein jährlicher Freibetrag für Kapitalerträge von 1.000 Euro pro Person bzw. 2.000 Euro bei zusammenveranlagten Ehepaaren. Bis zu dieser Höhe bleiben Zinsen und andere Kapitalerträge steuerfrei, sofern ein Freistellungsauftrag erteilt wurde." },
      { q: "Muss ich Zinsen von ausländischen Plattformen selbst versteuern?", a: "In der Regel ja. Bei ausländischen Anbietern wird die deutsche Abgeltungsteuer meist nicht automatisch abgeführt. Sie müssen die Erträge dann in der Anlage KAP Ihrer Steuererklärung angeben." },
      { q: "Ersetzt der Steuer-Rechner eine Steuerberatung?", a: "Nein. Der Rechner liefert eine vereinfachte Orientierung. Individuelle Faktoren wie Günstigerprüfung, Verlustverrechnung oder ausländische Quellensteuer werden nicht berücksichtigt. Für verbindliche Auskünfte wenden Sie sich an eine Steuerberatung." },
    ],
  },
};
