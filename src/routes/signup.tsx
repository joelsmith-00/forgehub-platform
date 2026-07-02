import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import { ROLE_LIST } from "@/lib/roles";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — FORGE" },
      { name: "description", content: "Request access to FORGE by choosing your role." },
    ],
  }),
  component: RoleSignupPicker,
});

function RoleSignupPicker() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/">
          <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
        </Link>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Join FORGE</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Request Access to <span className="text-flame-gradient">FORGE</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Choose your role — we'll guide you through the right sign-up flow.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {ROLE_LIST.map((r) => {
            const Icon = r.icon;
            return (
              <Link
                key={r.key}
                to="/signup/$role"
                params={{ role: r.key }}
                className="group flex items-start gap-4 rounded-2xl bg-card p-6 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${r.accent} text-white shadow-glow`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold">{r.label}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
