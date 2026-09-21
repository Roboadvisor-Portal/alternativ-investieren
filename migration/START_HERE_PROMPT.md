# So startest du das neue Projekt

## Schritt 1
Klicke in DIESEM Projekt oben im Chat auf **„Save to Github"** und lege ein Repository an
(z. B. `alternativ-investieren`). Merke dir die Repo-URL.

## Schritt 2
Starte einen **neuen „Full Stack App"-Job** und füge als allererste Nachricht exakt den folgenden Text ein
(die Repo-URL am Ende durch deine echte URL ersetzen):

---

**PROMPT ZUM KOPIEREN:**

> Baue eine **Next.js-App (App Router, mit serverseitigem Rendering / SSG + ISR)** mit **FastAPI-Backend** und **MongoDB** – dieselbe technische Basis wie mein bestehendes Portal.
>
> Es handelt sich um den **Neuaufbau eines bereits fertigen Projekts** (deutsche Informations- und Vergleichsseite für alternative Investments, `alternativ-investieren.com`). Alle Inhalte, das Datenmodell, das Backend, das Design und ein Admin-CMS existieren bereits und liegen als vollständiges Übergabepaket im Ordner **`migration/`** in diesem GitHub-Repo:
>
> **`<HIER DEINE GITHUB-REPO-URL EINFÜGEN>`**
>
> Bitte lies zuerst **`migration/MIGRATION_GUIDE.md`** vollständig – dort steht Schritt für Schritt, was zu bauen ist (Zielarchitektur, Datenmodell, alle API-Routen, alle Seiten, Design-Tokens, SEO/GEO-Anforderungen, rechtliche Pflichten).
>
> Wichtig:
> - Übernimm das **FastAPI-Backend** aus `migration/backend-source/` weitgehend unverändert (Auth, Anbieter-CRUD, Artikel-CRUD, KI-Bildgenerierung, dynamische sitemap.xml).
> - Importiere die Inhalte aus `migration/data/` (`articles.json`, `providers.json`) in MongoDB.
> - Baue das Frontend als **Next.js** neu, exakt nach dem Design und den Inhalten in `migration/frontend-source/` (gleiche Seiten, gleiche Texte, gleiches Farb-/Schriftkonzept).
> - Sorge dafür, dass öffentliche Seiten **vollständig serverseitig als HTML** ausgeliefert werden und dass **beim Veröffentlichen/Bearbeiten eines Artikels im Admin automatisch die betroffene Seite neu vorgerendert wird** (on-demand Revalidation).
> - Das **Admin-Dashboard-Login** soll über **Emergent Google Login** laufen und **ausschließlich für die E-Mail `managerprofi8@googlemail.com`** freigeschaltet sein (Allowlist – alle anderen Google-Accounts werden abgewiesen). Kein Passwort-Login. Details siehe `migration/MIGRATION_GUIDE.md`, Abschnitt 7.
>
> Beginne damit, mir eine kurze Umsetzungs-Reihenfolge zu bestätigen, und baue dann los.

---

## Schritt 3
Der Agent im neuen Projekt liest das Paket und baut alles nach. Wenn er Fragen stellt,
kannst du dich auf die `MIGRATION_GUIDE.md` beziehen – dort ist alles dokumentiert.

## Hinweis zu den Bildern
Die KI-generierten Beitragsbilder liegen im Emergent-Speicher des ALTEN Projekts.
Im neuen Projekt werden sie bei Bedarf einfach neu generiert (die Funktion dafür wird mitgebaut).
Externe Bilder (Unsplash-Links) funktionieren sofort weiter.
