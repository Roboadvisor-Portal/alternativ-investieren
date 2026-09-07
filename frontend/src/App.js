import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";

import Home from "@/pages/Home";
import CategoryHub from "@/pages/CategoryHub";
import RechnerHub from "@/pages/RechnerHub";
import RenditeRechner from "@/pages/rechner/RenditeRechner";
import DiversifikationRechner from "@/pages/rechner/DiversifikationRechner";
import SteuerRechner from "@/pages/rechner/SteuerRechner";
import RatgeberList from "@/pages/RatgeberList";
import RatgeberArticle from "@/pages/RatgeberArticle";
import Glossar from "@/pages/Glossar";
import WieWirBewerten from "@/pages/WieWirBewerten";
import AnbieterDetail from "@/pages/AnbieterDetail";
import Risikohinweise from "@/pages/Risikohinweise";
import UeberUns from "@/pages/UeberUns";
import Downloads from "@/pages/Downloads";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminArticles from "@/pages/admin/AdminArticles";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crowdlending/" element={<CategoryHub slug="crowdlending" />} />
            <Route path="/crowdlending" element={<CategoryHub slug="crowdlending" />} />
            <Route path="/immobilien-crowdinvesting/" element={<CategoryHub slug="immobilien-crowdinvesting" />} />
            <Route path="/immobilien-crowdinvesting" element={<CategoryHub slug="immobilien-crowdinvesting" />} />
            <Route path="/rechner/" element={<RechnerHub />} />
            <Route path="/rechner" element={<RechnerHub />} />
            <Route path="/rechner/rendite-szenario-rechner" element={<RenditeRechner />} />
            <Route path="/rechner/diversifikations-rechner" element={<DiversifikationRechner />} />
            <Route path="/rechner/steuer-rechner-kapitalertraege" element={<SteuerRechner />} />
            <Route path="/ratgeber/" element={<RatgeberList />} />
            <Route path="/ratgeber" element={<RatgeberList />} />
            <Route path="/ratgeber/:slug" element={<RatgeberArticle />} />
            <Route path="/glossar/" element={<Glossar />} />
            <Route path="/glossar" element={<Glossar />} />
            <Route path="/wie-wir-bewerten/" element={<WieWirBewerten />} />
            <Route path="/anbieter/:slug" element={<AnbieterDetail />} />
            <Route path="/risikohinweise/" element={<Risikohinweise />} />
            <Route path="/ueber-uns/" element={<UeberUns />} />
            <Route path="/downloads/" element={<Downloads />} />
            <Route path="/impressum/" element={<Impressum />} />
            <Route path="/datenschutz/" element={<Datenschutz />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/artikel" element={<AdminArticles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;
