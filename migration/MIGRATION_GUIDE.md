# Migrations-/Übergabe-Anleitung — alternativ-investieren.com

> **Für den Builder-Agenten im NEUEN Next.js-Projekt.**
> Dieses Repo enthält ein fertiges, getestetes Projekt, das aktuell als **React (CRA) + FastAPI + MongoDB** gebaut ist.
> Ziel: **1:1 auf Next.js (App Router, SSR/SSG/ISR) + FastAPI + MongoDB** neu aufbauen** – gleicher Inhalt, gleiches Design, gleiches Admin-CMS.
> Grund für den Umzug: echtes serverseitig vorgerendertes HTML für SEO/GEO + automatische Aktualisierung bei jeder Veröffentlichung (ISR / on-demand revalidate).

---

## 0. Was in diesem Paket liegt
```
migration/
  MIGRATION_GUIDE.md          <- diese Datei
  START_HERE_PROMPT.md        <- der Prompt, den der Nutzer eingegeben hat
  data/
    articles.json             <- 3 Artikel (Blog) aus MongoDB
    providers.json            <- 9 Anbieter aus MongoDB
    media.json                <- Referenzen der KI-generierten Bilder (Object Storage)
  backend-source/
    server.py                 <- komplettes FastAPI-Backend (fast unverändert übernehmbar)
    seed_articles.py          <- Seed/Migration der 3 Artikel
    requirements.txt
  frontend-source/            <- komplette bestehende React-Quelle als DESIGN- & INHALTS-REFERENZ
    src/ ...                  <- Seiten, Komponenten, Daten (JS)
    public/ ...               <- robots.txt, sitemap.xml, llms.txt
    tailwind.config.js
  design/
    design_guidelines.json
```

## 1. Zielarchitektur (Next.js)
- **Frontend:** Next.js **App Router** (Server Components), TypeScript oder JS (wie im farmnext-Template vorgegeben).
- **Backend:** FastAPI (aus `backend-source/server.py` übernehmen) unter `/api`.
- **DB:** MongoDB (dieselben Collections: `articles`, `providers`, `media`, `users`).
- **Rendering-Strategie (wichtig, das ist der ganze Grund des Umzugs):**
  - Öffentliche Inhaltsseiten als **SSG mit ISR** oder **SSR** rendern, sodass **vollständiges HTML** ausgeliefert wird.
  - Beim Veröffentlichen/Bearbeiten im Admin: **on-demand Revalidation** der betroffenen Route(n) auslösen (`revalidatePath`/`revalidateTag`), damit neue/geänderte Artikel automatisch als vorgerendertes HTML live gehen.
  - `generateMetadata` je Seite für Title/Description/OpenGraph.
  - JSON-LD (Article, FAQPage, BreadcrumbList, Organization, WebSite) serverseitig ins HTML rendern.

## 2. Datenmodell (MongoDB) — unverändert übernehmen
### Collection `articles` (siehe data/articles.json)
Felder: `id`(uuid), `slug`, `title`, `excerpt`, `metaTitle`, `metaDescription`, `category`
(`crowdlending` | `immobilien-crowdinvesting`), `tags[]`, `author`, `published`(YYYY-MM-DD),
`updated`, `readingTime`(int), `status`(`published`|`draft`), `heroImage`, `heroAlt`,
`answerFirst`, `blocks[]`, `sources[]`, `created_at`, `updated_at`.

**`blocks[]`** ist ein Array typisierter Blöcke (Block-basiertes CMS):
- `{type:"p", text}` — Absatz. Inline-Links im Format `{link:slug:Anzeigetext}` → auf `/ratgeber/{slug}`.
- `{type:"h2", text}` / `{type:"h3", text}` — Überschriften.
- `{type:"ul", items:[...]}` — Aufzählung.
- `{type:"chart", chart:"marktvolumen"}` — eingebettetes Diagramm (Recharts).
- `{type:"flow", steps:[{title,text}]}` — Ablauf-Grafik.
- `{type:"rank", steps:[{rank,title,note,highlight}]}` — Rangfolge-Grafik.

### Collection `providers` (siehe data/providers.json)
Felder u.a.: `id`, `slug`, `name`, `asset_classes[]`, `stars`(0–5, halbe erlaubt),
`trustpilot_score`, `trustpilot_count`, `tier`(1=EU-Lizenz+Entschädigung, 2=ECSP, 3=unreguliert),
`min_investment`, `expected_return`, `term`, `regulation`, `affiliate_url`, `review_text`,
`pros[]`, `cons[]`, `is_example`.
> **Regeln:** Sterne (redaktionell) und Trustpilot (extern) **niemals verrechnen/zusammenführen**.
> Anbieter ohne belastbare Trustpilot-Basis (z.B. Fintown, LetsInvest) **kein** „0/–"-Badge geben.

### Statische Inhaltsdaten (aus frontend-source/src/data übernehmen)
- `providerDetails.js` → **`providerDetails`** (lange redaktionelle Detailtexte je Anbieter)
  und **`providerFaqs`** (4 Fragen/Antworten je Anbieter, für FAQPage-Schema) und `tierLabels`.
- `glossary.js`, `categories.js`, `rechnerContent.js` → Glossar, Kategorie-Hubs, Rechner-Begleittexte.
  Diese können als statische Datenmodule in Next.js bleiben (oder später ins CMS).

## 3. Backend-API (aus backend-source/server.py — 1:1 übernehmbar)
Alle Routen mit Prefix `/api`:
- **Auth (JWT/Passwort):** `POST /api/auth/login`, `GET /api/auth/me`. Admin wird beim Startup geseedet
  aus ENV `ADMIN_EMAIL` / `ADMIN_PASSWORD` (bcrypt). Bearer-Token im Header.
- **Anbieter:** `GET /api/providers` (public, optional `?category=`),
  `POST/PUT/DELETE /api/providers[/{id}]` (admin).
- **Artikel:** `GET /api/articles` (public, nur published), `GET /api/articles/{slug}` (public),
  `GET /api/admin/articles` (admin, inkl. drafts), `POST/PUT/DELETE /api/articles[/{id}]` (admin).
- **KI-Bild:** `POST /api/admin/generate-image` {prompt} (admin) → Gemini Nano Banana über
  **EMERGENT_LLM_KEY** → **Emergent Object Storage** → gibt `{media_path}` zurück.
- **Media:** `GET /api/media/{path}` (public) — liefert das gespeicherte Bild aus Object Storage.
- **Sitemap:** `GET /api/sitemap.xml` — dynamisch aus Mongo (statische Routen + Artikel + Anbieter).
- **Startup:** seedet 9 Anbieter + migriert 3 Artikel (idempotent nach `slug`) + initialisiert Object Storage.

> In Next.js kannst du entweder dieses FastAPI-Backend unverändert weiterverwenden (empfohlen, farmnext-Template)
> ODER Teile als Next.js Route Handler nachbauen. **Empfehlung: FastAPI behalten**, nur das Frontend neu bauen.
> Für sitemap.xml zusätzlich einen Next.js `app/sitemap.ts` oder eine Route nutzen, damit sie unter der Root-Domain liegt.

## 4. Öffentliche Seiten/Routen (nachbauen)
`/` (Home), `/crowdlending/`, `/immobilien-crowdinvesting/` (Kategorie-Hubs),
`/anbieter/[slug]` (Anbieter-Detail **mit FAQ + FAQPage-Schema**),
`/ratgeber/` (Blog-Liste, dynamisch aus /api/articles), `/ratgeber/[slug]` (Artikel, blocks rendern),
`/glossar/` (mit Hash-Deeplinks), `/rechner/` + `/rechner/rendite-szenario-rechner`,
`/rechner/diversifikations-rechner`, `/rechner/steuer-rechner-kapitalertraege` (mit ~700-Wort-Begleittexten + FAQ-Schema),
`/downloads/`, `/wie-wir-bewerten/` (Bewertungsmethodik), `/risikohinweise/`, `/ueber-uns/`,
`/impressum/`, `/datenschutz/`.
Admin (JWT-geschützt): `/admin/login`, `/admin` (Anbieter-Verwaltung), `/admin/artikel` (Blog-CMS mit vollem Block-Editor + KI-Bild).

## 5. Design (aus tailwind.config.js / design/)
- Schrift: Headings **"Cabinet Grotesk"** (Fallback Manrope), Zahlen/Mono **"JetBrains Mono"**.
- Farben: `petrol` #133E46 (dark #0B252C, light #1D5B67), Hintergrund `sand` #F7F8F6,
  CTA `#C2610C` (hover #A14E07), Ampel-Farben grün/gelb/rot für Risiko.
- Ruhiger, seriöser Magazin-/Fachportal-Stil (DACH-Privatanleger), **kein** reißerischer Krypto-Look.
- Framer Motion für dezente Animationen, Recharts für Diagramme, lucide-react Icons, shadcn/ui Komponenten.

## 6. SEO/GEO (Kern des Projekts)
- Pro Seite serverseitige Metadaten + Canonical + OpenGraph (`generateMetadata`).
- JSON-LD serverseitig: Article (Ratgeber), FAQPage (Anbieter + Rechner), BreadcrumbList, Organization, WebSite.
- `public/robots.txt` (Sitemap-Zeile), dynamische `sitemap.xml`, `public/llms.txt` (aus frontend-source/public übernehmen).
- Antwort-zuerst-Struktur (`answerFirst`) je Artikel/Rechner beibehalten.
- **ISR/Revalidate bei Publish**: nach `POST/PUT` eines Artikels die Route `/ratgeber/[slug]` und `/ratgeber` revalidieren.

## 7. Integrationen & ENV
- **JWT/Passwort-Admin** (bestehend). ENV: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`.
- **Emergent Universal Key** für KI-Bilder: ENV `EMERGENT_LLM_KEY`; Bibliothek `emergentintegrations`
  (`pip install emergentintegrations --extra-index-url https://d33sy5i8bnduwe.cloudfront.net/simple/`),
  Modell `gemini-3.1-flash-image-preview`, Ausgabe → **Emergent Object Storage** (public serve via `/api/media`).
- **MongoDB**: ENV `MONGO_URL`, `DB_NAME`.
- Frontend-URL für API im Next.js über `NEXT_PUBLIC_*` bzw. serverseitig direkt Backend/Mongo.
- **Optional/Backlog (vom Nutzer gewünscht, war noch offen):** Emergent-managed **Google Auth** fürs Admin
  (statt/zusätzlich zu JWT), Allowlist auf die Nutzer-E-Mail.

## 8. Rechtliche/redaktionelle Pflichten (unbedingt erhalten)
- Affiliate sichtbar als „Werbung/Partnerlink" kennzeichnen; CTA-Links `rel="sponsored"`.
- Risikohinweis + Verweis auf `/risikohinweise/` auf Anbieterprofilen; Risikobanner im Footer.
- Renditen nur historisch/modellhaft, nie als Versprechen.
- Anbieterdaten Stand ~September 2026, vor Veröffentlichung gegenprüfen (interne CMS-Notiz NICHT öffentlich zeigen).
- Externe Autor-Links auf der Über-uns-Seite (Talkmarkets, Stocktwits, Publish0X, Focus.de, Sharewise) mit `rel="noopener noreferrer"`, neues Tab.

## 9. Datenimport im neuen Projekt
1. FastAPI-Backend aus `backend-source/` übernehmen (server.py, seed_articles.py, requirements.txt).
2. `data/articles.json` und `data/providers.json` in MongoDB importieren (oder Startup-Seed nutzen; er ist idempotent).
   `media.json` sind nur Referenzen — die KI-Bilder liegen im Emergent Object Storage und werden über `/api/media/{path}` bedient;
   bei Bedarf im neuen Projekt neu generieren.
3. `providerDetails`, `providerFaqs`, `glossary`, `categories`, `rechnerContent` aus `frontend-source/src/data` übernehmen.
4. Alle Seiten/Komponenten aus `frontend-source/src` als Vorlage in Next.js nachbauen (Design & Texte 1:1).

## 10. Testzugang
- Admin-Login: `admin@alternativ-investieren.com` / `AltInvest2026!Admin` (im neuen Projekt über ENV neu setzen).
