import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("ai_cookie_consent")) setVisible(true);
  }, []);

  const decide = (value) => {
    localStorage.setItem("ai_cookie_consent", value);
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div
      data-testid="cookie-consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
        <p className="flex-1 text-xs leading-relaxed text-slate-600">
          Wir verwenden nur technisch notwendige Cookies. Optionale Cookies für Statistik und
          Affiliate-Tracking setzen wir ausschließlich mit Ihrer Einwilligung.{" "}
          <Link to="/datenschutz/" className="font-semibold text-cta underline">Mehr in der Datenschutzerklärung</Link>.
        </p>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <button
            data-testid="cookie-decline"
            onClick={() => decide("necessary")}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:flex-none"
          >
            Nur notwendige
          </button>
          <button
            data-testid="cookie-accept"
            onClick={() => decide("all")}
            className="flex-1 rounded-lg bg-cta px-4 py-2 text-xs font-semibold text-white hover:bg-cta-hover sm:flex-none"
          >
            Alle akzeptieren
          </button>
        </div>
        <button onClick={() => decide("necessary")} aria-label="Schließen" className="absolute right-3 top-3 text-slate-400 sm:static">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
