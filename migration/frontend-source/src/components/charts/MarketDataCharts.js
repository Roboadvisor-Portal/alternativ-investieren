import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, LineChart, Line, Legend,
} from "recharts";

const marktData = [
  { jahr: "2011", wert: 1.5 },
  { jahr: "2012", wert: 5.2 },
  { jahr: "2013", wert: 17.4 },
  { jahr: "2014", wert: 24 },
  { jahr: "2015", wert: 68.1 },
  { jahr: "2016", wert: 74.5 },
  { jahr: "2017", wert: 198.7 },
  { jahr: "2018", wert: 305.2 },
  { jahr: "2019", wert: 417.7 },
  { jahr: "2020", wert: 327.8 },
];

export function MarktvolumenChart() {
  return (
    <figure className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" data-testid="chart-marktvolumen">
      <figcaption className="mb-1 font-heading text-lg font-bold text-petrol-dark">
        Entwicklung des Crowdinvesting-Volumens in Deutschland
      </figcaption>
      <p className="mb-4 text-xs text-slate-500">2011–2020, in Mio. € · Quelle: Statista / crowdfunding.de</p>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={marktData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="jahr" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v) => [`${v} Mio. €`, "Volumen"]}
              contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
            />
            <Bar dataKey="wert" radius={[6, 6, 0, 0]}>
              {marktData.map((d, i) => (
                <Cell key={i} fill={d.jahr === "2019" ? "#C2610C" : "#133E46"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

const yieldData = [
  { name: "Tagesgeld", von: 1.5, bis: 3.5 },
  { name: "Festgeld", von: 2, bis: 3.8 },
  { name: "Crowdlending", von: 4, bis: 10 },
  { name: "Immobilien-CI", von: 4, bis: 8 },
];

export function RenditeVergleichChart() {
  const data = yieldData.map((d) => ({ name: d.name, min: d.von, spanne: d.bis - d.von }));
  return (
    <div className="h-72 w-full" data-testid="chart-rendite-vergleich">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} unit="%" />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} width={92} />
          <Tooltip
            formatter={(v, n, p) => [`${p.payload.min}\u2013${(p.payload.min + p.payload.spanne).toFixed(1)} % p.a.`, "Spanne (historisch)"]}
            contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }}
          />
          <Bar dataKey="min" stackId="a" fill="transparent" />
          <Bar dataKey="spanne" stackId="a" radius={[0, 6, 6, 0]} fill="#1D5B67" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
