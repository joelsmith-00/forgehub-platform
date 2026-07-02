import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import heroImg from "@/assets/hero-forge.jpg";
import { ROLE_LIST } from "@/lib/roles";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — FORGE" },
      { name: "description", content: "Choose your role to sign in to FORGE." },
    ],
  }),
  component: RolePicker,
});

function RolePicker() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
      <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/95 via-ink/90 to-ink" />

      <div className="relative mx-auto flex max-w-6xl flex-col px-6 py-10">
        <header className="flex items-center justify-between">
          <Link to="/">
            <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-white/70 hover:text-primary">
            ← Back to Home
          </Link>
        </header>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Welcome to FORGE</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">
            Choose Your <span className="text-flame-gradient">Role</span>
          </h1>
          <p className="mt-4 text-base text-white/70">
            Select how you'd like to sign in. Each role gets its own dedicated experience.
          </p>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE_LIST.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.key}
                to="/login/$role"
                params={{ role: r.key }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-white/10"
              >
                <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${r.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-60`} />
                <div className={`relative grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${r.accent} text-white shadow-glow`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-5 text-xl font-bold">{r.label}</h3>
                <p className="relative mt-1 text-xs text-white/60">{r.tagline}</p>
                <p className="relative mt-4 text-sm leading-relaxed text-white/75">{r.description}</p>
                <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Sign in as {r.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mx-auto mt-12 text-sm text-white/60">
          New to FORGE?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Request access
          </Link>
        </p>
      </div>
    </div>
  );
}
