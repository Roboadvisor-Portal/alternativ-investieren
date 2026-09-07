# Auth Testing — Emergent Google Auth (geplant, Teil 2)

Entscheidung des Nutzers: Emergent-managed Google Auth fürs Admin-Panel (nur E-Mail-Allowlist für Redaktion).

## Flow (Referenz für Umsetzung)
1. Frontend Login-Button: `window.location.href = "https://auth.emergentagent.com/?redirect=" + encodeURIComponent(window.location.origin + "/admin")`
   REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
2. Rücksprung: `/admin#session_id=...` → AppRouter erkennt `useLocation().hash` synchron → AuthCallback.
3. Backend `GET /api/auth/session` mit Header `X-Session-ID` → ruft `https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data` auf, speichert session_token in `user_sessions` (7 Tage, tz-aware), setzt httpOnly-Cookie (secure, samesite=none, path=/).
4. `GET /api/auth/me`: session_token aus Cookie ODER Bearer; Ablauf prüfen; nur Allowlist-E-Mail = admin.
5. Provider-CRUD & künftige Blog-CRUD über dieselbe Auth schützen.

## Test (Playbright): Cookie `session_token` setzen (secure, httpOnly, sameSite=None), dann /admin laden.
## Allowlist: ADMIN_EMAIL aus backend/.env (aktuell admin@alternativ-investieren.com).
