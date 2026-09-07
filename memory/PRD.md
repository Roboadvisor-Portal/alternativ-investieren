# PRD — alternativ-investieren.com

## Original Problem Statement
Deutschsprachiges Aufklärungs- und Vergleichsportal zu alternativen Investmentformen (Crowdlending/P2P, Immobilien-Crowdinvesting) für private Anleger im DACH-Raum. Redaktionell hochwertige Aufklärung + Anbieter-Vergleich mit Affiliate-Monetarisierung. Performance-/SEO-/GEO-optimiert. Anbieterliste wird später über Platzhalterstruktur befüllt.

## Architecture
- Frontend: React (CRA/craco), react-router-dom v7, TailwindCSS, shadcn/ui, recharts, framer-motion, react-helmet-async (SEO/JSON-LD).
- Backend: FastAPI + MongoDB (motor). JWT admin auth (Bearer token, bcrypt). Provider CRUD.
- Auth: single admin (no public registration), token in localStorage (key `ai_admin_token`).

## User Personas
- Privatanleger DACH (informierend, vergleichend).
- Redaktion/Admin (pflegt Anbieter-Datensätze über /admin).

## Core Requirements (static)
- Sitemap komplett: /, /crowdlending/, /immobilien-crowdinvesting/, /rechner/ (+3 Rechner), /ratgeber/ (+Artikel), /glossar/, /risikohinweise/, /ueber-uns/, /downloads/, /impressum/, /datenschutz/.
- Kategorie-Hub 8-Sektionen-Aufbau. Anbieter-Vergleich mit Filter/Sort-Framework + Platzhalterstruktur.
- 3 Rechner (frontend-only). Rechtliche Pflichthinweise, Werbekennzeichnung, Affiliate-Transparenz.
- SEO (Meta, canonical, sitemap.xml, robots.txt, Schema.org) + GEO (llms.txt, answer-first, Glossar, FAQ, Tabellen, semantische H-Hierarchie).

## Implemented (2026-07 / build date)
- ✅ Alle Seiten der Sitemap inkl. Routing, sticky Header mit Dropdowns + Cmd+K-Suche, Footer, Cookie-Consent.
- ✅ Petrol/Anthrazit-Design, Risiko-Ampel, Trust-Badges, Charts (Marktvolumen, Renditevergleich).
- ✅ Kategorie-Hubs (crowdlending, immobilien-crowdinvesting) mit allen 8 Sektionen, FAQPage+Breadcrumb Schema.
- ✅ AnbieterCard + ProviderComparison (Desktop-Tabelle / Mobile-Stack) mit Filter (Mindestanlage, Regulierung, Risiko) + Sortierung. Backend seed: 3 Beispiel-Anbieter (is_example).
- ✅ 3 Rechner: Rendite-Szenario (3 Szenarien), Diversifikation (HHI/Klumpenrisiko), Steuer DACH (DE/AT/CH). Methodik-Box + Pflicht-Disclaimer.
- ✅ 3 Volltext-Ratgeber-Artikel (recherchierte Zahlen), Autoren-Box (Markus G), Quellenverzeichnis, Article Schema.
- ✅ 17 Glossar-Begriffe mit Alphabet-Filter, DefinedTermSet Schema.
- ✅ Impressum (Xolo Go OÜ, Markus Gildemeister, Tallinn), Datenschutz (DSGVO), Risikohinweise, Über uns, Downloads.
- ✅ Admin-Panel (/admin/login, /admin) mit Anbieter-CRUD, automatischer Rendite-Disclaimer-Baustein.
- ✅ SEO/GEO: robots.txt (KI-Crawler erlaubt), llms.txt, sitemap.xml, canonical/OG/JSON-LD, answer-first Absätze.
- ✅ Getestet: 100% Backend + Frontend (iteration_1.json).

## Backlog / Remaining
- P1: Echte Anbieter-Datensätze über Admin einpflegen (Partnernetzwerk).
- P1: react-snap/Pre-Rendering beim Deployment (in Preview entfernt wegen cookie-Dependency-Konflikt mit react-router 7; SEO derzeit via helmet + in-bundle content).
- P2: Analytics/Affiliate-Tracking nach Consent aktivieren.
- P2: Auth-Hardening (Brute-Force-Lockout, explizite CORS-Origins in Produktion).
- P2: Download-Dateien (Checklisten/PDF) erstellen und verlinken.

## Anbieter-Vergleich (erledigt)
- 9 reale Anbieter geseedet (5 Crowdlending, 4 Immobilien) mit Sterne-Bewertung, Trustpilot, 3-Stufen-Regulierungs-Badge.
- AnbieterCard erweitert, Sortierung nach Sternen, Detailseiten /anbieter/{slug} mit Volltext, Seite /wie-wir-bewerten/.
- Admin-Formular um star_rating/trustpilot/regulation_tier/slug erweitert.

## Teil 2 — Status
- ✅ (2026-09-07) Anbieter-Detailseiten: FAQ (4 Fragen/Anbieter, risikoorientiert) + Schema.org FAQPage JSON-LD je Anbieter. providerFaqs in providerDetails.js.
- ✅ (2026-09-07) Blog-CMS (Option A – dynamisch aus MongoDB): 3 Launch-Artikel nach Mongo migriert (seed_articles.py, idempotent), Article-Modell + CRUD (/api/articles, /api/admin/articles), SEO-Felder (metaTitle/metaDescription/status). Öffentliche Ratgeber-Seiten + Home + Suche laden dynamisch aus Mongo -> neue/geänderte Artikel sofort live ohne Rebuild.
- ✅ (2026-09-07) Admin-Artikelverwaltung /admin/artikel: voller Block-Editor (Absatz/H2/H3/Liste/Chart/Flow/Rank, reorder), Status Entwurf/Veröffentlicht, Quellen, Tags.
- ✅ (2026-09-07) KI-Beitragsbilder: POST /api/admin/generate-image (Gemini Nano Banana via EMERGENT_LLM_KEY) -> Emergent Object Storage -> /api/media/{path} (public). EMERGENT_LLM_KEY in backend/.env.
- ✅ (2026-09-07) Dynamische sitemap.xml unter /api/sitemap.xml (statische Routen + Artikel + Anbieter), robots.txt zeigt darauf. Aktualisiert sich bei jedem Publish.
- ✅ Getestet: iteration_2.json 100% Backend + Frontend.

## Deployment-Hinweis (mit Nutzer geklärt, 2026-09-07)
- Emergent unterstützt KEINEN webhook-/programmatisch ausgelösten Rebuild+Deploy und KEIN Build-Time-SSG/Prerendering (Client-SPA). Ingress leitet Nicht-/api-Routen fest ans Frontend -> kein Dynamic Rendering aus FastAPI.
- Entscheidung: Option A (dynamisch aus Mongo). Für "vollständig vorgerendertes HTML das sich auto-aktualisiert" wäre Next.js/externes Hosting (Vercel/Netlify) nötig (Option C, offen).

## Offen / Backlog
- P0 (offen): Emergent-managed Google Auth fürs Admin (Playbook + /app/auth_testing.md). Aktuell weiter JWT/Passwort-Login (bewusst beibehalten).
- P1 (offen, mit Nutzer zu klären): Option C – Next.js/SSR-Umzug für echtes Prerender + Webhook-Rebuild. Datenmodell/CMS bewusst entkoppelt (Mongo = Source-of-Truth), damit Umzug ohne CMS-Neubau möglich.
- P2: Admin-Bearbeitung der Anbieter-Detail-Volltexte (aktuell in providerDetails.js statisch).
