import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, User, Mail, Hash, Info } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import { ROLES, type RoleKey } from "@/lib/roles";

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

const iconFor = (key: string) => {
  if (key === "email") return Mail;
  if (key === "register" || key === "gradYear") return Hash;
  return User;
};

function RoleSignup() {
  const { role } = Route.useParams();
  const cfg = ROLES[role as RoleKey];
  const Icon = cfg.icon;

  const isRequestOnly = cfg.signupFields.length === 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/">
          <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
        </Link>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login/$role"
            params={{ role: cfg.key }}
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </header>

      <div className="mx-auto flex max-w-2xl flex-col px-6 pb-16">
        <div className="rounded-2xl bg-card p-8 shadow-card sm:p-10">
          <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cfg.accent} text-white shadow-glow`}>
            <Icon className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-center text-3xl font-bold tracking-tight">
            {isRequestOnly ? "Admin Access" : `${cfg.label} Access Request`}
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {isRequestOnly ? "Admin accounts are provisioned internally." : "Fill in your details to request access"}
          </p>
          <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" />

          {!isRequestOnly && (
            <>
              <form className="mt-8 space-y-5">
                {cfg.signupFields.map((f: (typeof cfg.signupFields)[number]) => {
                  const I = iconFor(f.key);
                  return (
                    <label key={f.key} className="block">
                      <span className="text-sm font-semibold">{f.label}</span>
                      <div className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                        <I className="h-4 w-4 text-muted-foreground" />
                        <input
                          type={f.type ?? "text"}
                          placeholder={f.placeholder}
                          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </label>
                  );
                })}

                <div className="flex items-start gap-2 rounded-md bg-primary/5 p-3 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {cfg.signupNote}
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
                >
                  Request Access <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          )}

          {isRequestOnly && (
            <div className="mt-8 rounded-md bg-primary/5 p-5 text-sm text-muted-foreground">
              {cfg.signupNote}
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/login" className="hover:text-primary">← Choose a different role</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
