import React, { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { AnbieterCard, fmtEuro, fmtTerm, assetLabels, StarRating, TrustpilotBadge, TierBadge } from "@/components/AnbieterCard";
import { RiskAmpel, AffiliateNotice, AdLabel } from "@/components/Trust";
import { Link } from "react-router-dom";
import { ArrowUpDown, SlidersHorizontal, ExternalLink, PackageOpen, Info } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "star_desc", label: "Sterne-Bewertung (beste zuerst)" },
  { value: "return_desc", label: "Rendite (hoch → niedrig)" },
  { value: "return_asc", label: "Rendite (niedrig → hoch)" },
  { value: "min_asc", label: "Mindestanlage (aufsteigend)" },
  { value: "min_desc", label: "Mindestanlage (absteigend)" },
];

export function ProviderComparison({ category }) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("star_desc");
  const [minFilter, setMinFilter] = useState("all");
  const [regFilter, setRegFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get("/providers", { params: category ? { category } : {} })
      .then((res) => active && setProviders(res.data))
      .catch(() => active && setProviders([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [category]);

  const filtered = useMemo(() => {
    let list = [...providers];
    if (minFilter !== "all") {
      const cap = Number(minFilter);
      list = list.filter((p) => (p.min_investment ?? Infinity) <= cap);
    }
    if (regFilter === "bafin") list = list.filter((p) => p.bafin_regulated);
    if (regFilter === "ecsp") list = list.filter((p) => !p.bafin_regulated);
    if (riskFilter !== "all") list = list.filter((p) => p.risk_level === riskFilter);

    const num = (v, d) => (v == null ? d : v);
    switch (sort) {
      case "return_desc": list.sort((a, b) => num(b.return_max, -1) - num(a.return_max, -1)); break;
      case "return_asc": list.sort((a, b) => num(a.return_min, 999) - num(b.return_min, 999)); break;
      case "min_asc": list.sort((a, b) => num(a.min_investment, Infinity) - num(b.min_investment, Infinity)); break;
      case "min_desc": list.sort((a, b) => num(b.min_investment, -1) - num(a.min_investment, -1)); break;
      case "rating_desc": list.sort((a, b) => num(b.star_rating, -1) - num(a.star_rating, -1)); break;
      case "star_desc": list.sort((a, b) => num(b.star_rating, -1) - num(a.star_rating, -1)); break;
      default: break;
    }
    return list;
  }, [providers, sort, minFilter, regFilter, riskFilter]);

  return (
    <div data-testid="provider-comparison">
      <AffiliateNotice className="mb-4" />
      <Link to="/wie-wir-bewerten/" data-testid="comparison-methodology-link" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cta hover:text-cta-hover">
        <Info className="h-4 w-4" aria-hidden="true" /> Wie bewerten wir? Unsere Bewertungsmethodik</Link>

      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-petrol-dark">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filter &amp; Sortierung
        </div>
        <FilterSelect testid="filter-sort" icon={<ArrowUpDown className="h-3.5 w-3.5" />} label="Sortieren" value={sort} onChange={setSort} options={sortOptions} />
        <FilterSelect testid="filter-min-investment" label="Mindestanlage" value={minFilter} onChange={setMinFilter} options={[
          { value: "all", label: "Alle" }, { value: "50", label: "bis 50 €" }, { value: "100", label: "bis 100 €" }, { value: "500", label: "bis 500 €" },
        ]} />
        <FilterSelect testid="filter-regulation" label="Regulierung" value={regFilter} onChange={setRegFilter} options={[
          { value: "all", label: "Alle" }, { value: "bafin", label: "BaFin / reguliert" }, { value: "ecsp", label: "EU-ECSP / VermAnlG" },
        ]} />
        <FilterSelect testid="filter-risk" label="Risiko" value={riskFilter} onChange={setRiskFilter} options={[
          { value: "all", label: "Alle" }, { value: "green", label: "Gering" }, { value: "yellow", label: "Moderat" }, { value: "orange", label: "Erhöht" }, { value: "red", label: "Hoch" },
        ]} />
      </div>

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-400">Anbieter werden geladen…</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center" data-testid="providers-empty">
          <PackageOpen className="h-8 w-8 text-slate-300" aria-hidden="true" />
          <p className="text-sm font-semibold text-slate-500">Noch keine Anbieter für diese Auswahl</p>
          <p className="max-w-sm text-xs text-slate-400">
            Das Partnernetzwerk wird redaktionell befüllt. Die Vergleichsstruktur (Karten, Filter, Sortierung)
            ist bereits vollständig angelegt – es müssen später nur noch Anbieter-Datensätze ergänzt werden.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block" data-testid="provider-table">
            <table className="w-full text-sm">
              <thead className="bg-sand text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Anbieter</th>
                  <th className="px-4 py-3 font-semibold">Anlageklasse</th>
                  <th className="px-4 py-3 font-semibold">Rendite p.a.</th>
                  <th className="px-4 py-3 font-semibold">Mindestanlage</th>
                  <th className="px-4 py-3 font-semibold">Laufzeit</th>
                  <th className="px-4 py-3 font-semibold">Regulierung</th>
                  <th className="px-4 py-3 font-semibold">Risiko</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} data-testid={`provider-row-${p.id}`} className="hover:bg-sand/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 font-semibold text-petrol-dark">
                        <Link to={`/anbieter/${p.slug}`} className="hover:text-cta">{p.name}</Link>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <StarRating value={p.star_rating} size="h-3 w-3" />
                        <span className="num text-[11px] text-slate-500">{p.star_rating?.toFixed(1)}</span>
                      </div>
                      <div className="mt-1"><TrustpilotBadge score={p.trustpilot_score} count={p.trustpilot_count} url={p.trustpilot_url} /></div>
                    </td>
                    <td className="px-4 py-3 text-xs">{p.asset_classes.map((a) => assetLabels[a] || a).join(", ")}</td>
                    <td className="num px-4 py-3 font-semibold">{p.return_min != null ? `${p.return_min}\u2013${p.return_max} %` : "–"}</td>
                    <td className="num px-4 py-3">{fmtEuro(p.min_investment)}</td>
                    <td className="num px-4 py-3">{fmtTerm(p.term_min_months, p.term_max_months)}</td>
                    <td className="px-4 py-3"><TierBadge tier={p.regulation_tier} /></td>
                    <td className="px-4 py-3"><RiskAmpel level={p.risk_level} /></td>
                    <td className="px-4 py-3">
                      <a href={p.affiliate_url || "#"} target="_blank" rel="sponsored noopener noreferrer" data-testid={`provider-cta-button-${p.id}`} className="inline-flex items-center gap-1 rounded-lg bg-cta px-3 py-1.5 text-xs font-semibold text-white hover:bg-cta-hover">
                        Zum Anbieter <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                      <span className="mt-0.5 block text-[9px] text-slate-400"><AdLabel /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
            {filtered.map((p) => <AnbieterCard key={p.id} provider={p} />)}
          </div>
        </>
      )}
    </div>
  );
}

function FilterSelect({ testid, label, value, onChange, options, icon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger data-testid={testid} className="h-9 w-44 text-xs">
          <span className="flex items-center gap-1.5">{icon}<SelectValue /></span>
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
