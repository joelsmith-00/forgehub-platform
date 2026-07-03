import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock, Mail, Eye } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import heroImg from "@/assets/hero-forge.jpg";
import { ROLES, type RoleKey } from "@/lib/roles";

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

function RoleLogin() {
  const { role } = Route.useParams();
  const cfg = ROLES[role as RoleKey];
  const Icon = cfg.icon;
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink text-ink-foreground lg:block">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-ink/80 to-transparent" />
        <div className="relative flex h-full flex-col p-10">
          <Link to="/">
            <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
          </Link>
          <div className="mt-auto">
            <div className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${cfg.accent} px-4 py-2`}>
              <Icon className="h-4 w-4 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">{cfg.label} Portal</span>
            </div>
            <h2 className="mt-6 max-w-md text-4xl font-black leading-tight">{cfg.tagline}</h2>
            <p className="mt-3 max-w-md text-sm text-white/70">{cfg.description}</p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { t: "Secure Access", d: "Enterprise-grade security" },
                { t: "Seamless", d: "One place for everything" },
                { t: "Connected", d: "Real-time updates" },
              ].map((f) => (
                <div key={f.t} className="rounded-lg bg-white/5 p-3">
                  <div className="text-xs font-semibold text-primary">{f.t}</div>
                  <div className="mt-0.5 text-[10px] text-white/60">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-background px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link to="/">
              <img src={forgeLogo.url} alt="FORGE" className="h-9 w-auto" />
            </Link>
          </div>

          <div className="rounded-2xl bg-card p-8 shadow-card sm:p-10">
            <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cfg.accent} text-white shadow-glow`}>
              <Icon className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-center text-3xl font-bold tracking-tight">Welcome Back!</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Sign in as <span className="font-semibold text-foreground">{cfg.label}</span> to continue
            </p>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" />

            <form className="mt-8 space-y-5">
              <Field label={cfg.idField.label} icon={Mail} placeholder={cfg.idField.placeholder} />
              <div>
                <Field
                  label="Password"
                  icon={Lock}
                  placeholder="Enter your password"
                  type="password"
                  trailing={<Eye className="h-4 w-4" />}
                />
                <div className="mt-2 text-right">
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate({ to: "/dashboard/$role", params: { role: cfg.key } })}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {cfg.key !== "admin" && (
              <>
                <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  or continue with
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Google", "Microsoft", "Apple"].map((p) => (
                    <button
                      key={p}
                      className="rounded-md border border-border py-2.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {cfg.signupFields.length > 0 ? (
                <>
                  Don't have an account?{" "}
                  <Link
                    to="/signup/$role"
                    params={{ role: cfg.key }}
                    className="font-semibold text-primary hover:underline"
                  >
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

function Field({
  label,
  icon: Icon,
  trailing,
  ...props
}: {
  label: string;
  icon: React.ElementType;
  trailing?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input
          {...props}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {trailing && <span className="text-muted-foreground">{trailing}</span>}
      </div>
    </label>
  );
}
