import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumbs" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3 text-slate-300" aria-hidden="true" />}
            {i < items.length - 1 ? (
              <Link to={it.path} className="hover:text-petrol">{it.name}</Link>
            ) : (
              <span className="font-semibold text-slate-700" aria-current="page">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
