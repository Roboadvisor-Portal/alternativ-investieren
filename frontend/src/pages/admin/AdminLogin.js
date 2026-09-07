import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Seo } from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user !== false) navigate("/admin");
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) navigate("/admin");
    else setError(res.error);
  };

  return (
    <>
      <Seo title="Redaktions-Login | Alternativ Investieren" description="Interner Login für die Anbieter-Verwaltung." path="/admin/login" />
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-petrol text-white"><Lock className="h-6 w-6" aria-hidden="true" /></span>
          <h1 className="mt-4 text-center font-heading text-2xl font-bold text-petrol-dark">Redaktions-Login</h1>
          <p className="mt-1 text-center text-sm text-slate-500">Anbieter-Verwaltung</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">E-Mail</label>
              <Input data-testid="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Passwort</label>
              <Input data-testid="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            {error && <p data-testid="login-error" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
            <Button data-testid="login-submit" type="submit" disabled={loading} className="w-full gap-2 bg-cta hover:bg-cta-hover">
              <LogIn className="h-4 w-4" /> {loading ? "Anmelden…" : "Anmelden"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
