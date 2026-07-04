import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import heroImg from "@/assets/hero-forge.jpg";
import { ROLES, type RoleKey } from "@/lib/roles";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login/$role")({
  parseParams: (p) => {
    const role = p.role as RoleKey;
    if (!(role in ROLES)) throw notFound();
    return { role };
  },
  head: ({ params }) => {
    const cfg = ROLES[params.role as RoleKey];
    return {
      meta: [
        { title: `${cfg.label} Sign In — FORGE` },
        { name: "description", content: `Sign in to your FORGE ${cfg.label} account.` },
      ],
    };
  },
  component: RoleLogin,
});

const DEMO: Partial<Record<RoleKey, { id: string; pwd: string }>> = {
  student: { id: "23AIDS001", pwd: "student123" },
  staff: { id: "STF001", pwd: "staff123" },
  alumni: { id: "priya@forge.edu", pwd: "alumni123" },
  admin: { id: "forgeadmin", pwd: "forge@admin2026" },
};

function RoleLogin() {
  const { role } = Route.useParams();
  const cfg = ROLES[role as RoleKey];
  const Icon = cfg.icon;
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = login(cfg.key, identifier, password);
    if (!result.ok) return setError(result.error);
    navigate({ to: "/dashboard/$role", params: { role: cfg.key } });
  };

  const fillDemo = () => {
    const d = DEMO[cfg.key];
    if (!d) return;
    setIdentifier(d.id);
    setPassword(d.pwd);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink text-ink-foreground lg:block">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/80 to-transparent" />
        <div className="relative flex h-full flex-col p-10">
          <Link to="/"><img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" /></Link>
          <div className="mt-auto">
            <div className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${cfg.accent} px-4 py-2`}>
              <Icon className="h-4 w-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{cfg.label} Portal</span>
            </div>
            <h2 className="mt-6 max-w-md text-4xl font-black leading-tight animate-fade-in">{cfg.tagline}</h2>
            <p className="mt-3 max-w-md text-sm text-white/70">{cfg.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-background px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link to="/"><img src={forgeLogo.url} alt="FORGE" className="h-9 w-auto" /></Link>
          </div>

          <div className="animate-fade-in rounded-2xl bg-card p-8 shadow-card sm:p-10">
            <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cfg.accent} text-white shadow-glow`}>
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-center text-3xl font-bold tracking-tight">Welcome Back!</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Sign in as <span className="font-semibold text-foreground">{cfg.label}</span> to continue
            </p>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" />

            <form className="mt-8 space-y-5" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-sm font-semibold">{cfg.idField.label}</span>
                <div className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <input
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={cfg.idField.placeholder}
                    required
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-semibold">Password</span>
                <div className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </button>

              {DEMO[cfg.key] && (
                <button
                  type="button"
                  onClick={fillDemo}
                  className="w-full rounded-md border border-dashed border-primary/50 py-2.5 text-xs font-semibold text-primary hover:bg-primary/5"
                >
                  Use demo {cfg.label.toLowerCase()} credentials
                </button>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {cfg.signupFields.length > 0 ? (
                <>
                  Don't have an account?{" "}
                  <Link to="/signup/$role" params={{ role: cfg.key }} className="font-semibold text-primary hover:underline">
                    Create New Account
                  </Link>
                </>
              ) : (
                <>Not an admin? <Link to="/login" className="font-semibold text-primary hover:underline">Choose a different role</Link></>
              )}
            </p>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              <Link to="/login" className="hover:text-primary">← Choose a different role</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
