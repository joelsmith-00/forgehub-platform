import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Lock, User, ShieldCheck, Users, Rocket } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — FORGE" },
      { name: "description", content: "Join FORGE and be part of the innovation." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
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

      <div className="mx-auto flex max-w-2xl flex-col px-6 pb-16">
        <div className="rounded-2xl bg-card p-8 shadow-card sm:p-10">
          <h1 className="text-center text-3xl font-bold tracking-tight">Create Your Account</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Join us and be part of the innovation</p>
          <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" />

          <form className="mt-8 space-y-5">
            <Field label="Full Name" icon={User} placeholder="Enter your full name" />
            <Field label="Email Address" icon={Mail} type="email" placeholder="Enter your email address" />
            <div>
              <Field label="Password" icon={Lock} type="password" placeholder="Create a password" />
              <p className="mt-1.5 text-xs text-muted-foreground">
                At least 8 characters with a combination of letters, numbers & symbols
              </p>
            </div>
            <Field label="Confirm Password" icon={Lock} type="password" placeholder="Confirm your password" />

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="mt-0.5 accent-[oklch(0.68_0.22_40)]" />
              <span>
                I agree to the <a className="font-semibold text-primary">Terms of Service</a> and{" "}
                <a className="font-semibold text-primary">Privacy Policy</a>
              </span>
            </label>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
            >
              Sign Up <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or sign up with
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
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl bg-card p-6 shadow-card sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Trusted Platform", d: "Built with security and privacy at the core." },
            { icon: Users, t: "Community Driven", d: "Connect, collaborate and grow together." },
            { icon: Rocket, t: "Future Ready", d: "Innovate today for a better tomorrow." },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                <f.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{f.t}</div>
                <div className="text-xs text-muted-foreground">{f.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon: React.ElementType;
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
      </div>
    </label>
  );
}
