import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Layout";

export default function NotFound() {
  return (
    <>
      <Seo title="Seite nicht gefunden | Alternativ Investieren" description="Diese Seite wurde nicht gefunden." path="/404" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="num font-heading text-6xl font-extrabold text-petrol-dark">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-petrol-dark">Seite nicht gefunden</h1>
        <p className="mt-2 max-w-md text-slate-500">Die aufgerufene Seite existiert nicht oder wurde verschoben.</p>
        <Link to="/" className="mt-6 rounded-lg bg-cta px-5 py-3 text-sm font-semibold text-white hover:bg-cta-hover">Zur Startseite</Link>
      </Container>
    </>
  );
}
