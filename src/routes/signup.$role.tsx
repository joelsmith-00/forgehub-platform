import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, User, Mail, Hash, Info, Lock, Phone, Building2 } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import { ROLES, type RoleKey, type SignupField } from "@/lib/roles";
import { signup } from "@/lib/auth";

export const Route = createFileRoute("/signup/$role")({
  parseParams: (p) => {
    const role = p.role as RoleKey;
    if (!(role in ROLES)) throw notFound();
    return { role };
  },
  head: ({ params }) => ({
    meta: [{ title: `${ROLES[params.role as RoleKey].label} Sign Up — FORGE` }],
  }),
  component: RoleSignup,
});

const iconFor = (key: SignupField["key"]) => {
  if (key === "email") return Mail;
  if (key === "phone") return Phone;
  if (key === "register" || key === "staffId" || key === "gradYear") return Hash;
  if (key === "department" || key === "company") return Building2;
  if (key === "password") return Lock;
  return User;
};

function RoleSignup() {
  const { role } = Route.useParams();
  const cfg = ROLES[role as RoleKey];
  const Icon = cfg.icon;
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isRequestOnly = cfg.signupFields.length === 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = signup({
      role: cfg.key,
      name: values.name || "",
      register: values.register,
      staffId: values.staffId,
      department: values.department,
      email: values.email,
      phone: values.phone,
      gradYear: values.gradYear,
      company: values.company,
      password: values.password || "",
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate({ to: "/dashboard/$role", params: { role: cfg.key } });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/">
          <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
        </Link>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login/$role" params={{ role: cfg.key }} className="font-semibold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </header>

      <div className="mx-auto flex max-w-2xl flex-col px-6 pb-16">
        <div className="animate-fade-in rounded-2xl bg-card p-8 shadow-card sm:p-10">
          <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cfg.accent} text-white shadow-glow`}>
            <Icon className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-center text-3xl font-bold tracking-tight">
            {isRequestOnly ? "Admin Access" : `Create ${cfg.label} Account`}
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {isRequestOnly ? "Admin accounts are provisioned internally." : "Fill your details — your account is created instantly."}
          </p>
          <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" />

          {!isRequestOnly && (
            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                {cfg.signupFields.map((f) => {
                  const I = iconFor(f.key);
                  const full = f.key === "name" || f.key === "password";
                  return (
                    <label key={f.key} className={`block ${full ? "sm:col-span-2" : ""}`}>
                      <span className="text-sm font-semibold">{f.label}</span>
                      <div className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                        <I className="h-4 w-4 text-muted-foreground" />
                        <input
                          type={f.type ?? "text"}
                          placeholder={f.placeholder}
                          required
                          value={values[f.key] ?? ""}
                          onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="flex items-start gap-2 rounded-md bg-primary/5 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {cfg.signupNote}
              </div>

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-70"
              >
                {submitting ? "Creating…" : (<>Create Account <ArrowRight className="h-4 w-4" /></>)}
              </button>
            </form>
          )}

          {isRequestOnly && (
            <div className="mt-8 rounded-md bg-primary/5 p-5 text-sm text-muted-foreground">
              {cfg.signupNote}
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/signup" className="hover:text-primary">← Choose a different role</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
