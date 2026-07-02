import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Lock, Eye } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.asset.json";
import heroImg from "@/assets/hero-forge.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — FORGE" },
      { name: "description", content: "Sign in to your FORGE account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden overflow-hidden bg-ink text-ink-foreground lg:block">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 to-transparent" />
        <div className="relative p-10">
          <Link to="/" className="inline-block">
            <img src={forgeLogo.url} alt="FORGE" className="h-10 w-auto" />
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-4 bg-black/50 p-6 backdrop-blur">
          {[
            { t: "Secure Access", d: "Your data is protected with enterprise-grade security." },
            { t: "Seamless Experience", d: "Access all features and resources in one place." },
            { t: "Always Connected", d: "Stay updated with real-time notifications and insights." },
          ].map((f) => (
            <div key={f.t} className="rounded-lg bg-white/5 p-4">
              <div className="text-sm font-semibold text-primary">{f.t}</div>
              <div className="mt-1 text-xs text-white/60">{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center bg-background px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <img src={forgeLogo.url} alt="FORGE" className="h-9 w-auto" />
          </div>
          <div className="rounded-2xl bg-card p-8 shadow-card sm:p-10">
            <h1 className="text-center text-3xl font-bold tracking-tight">Welcome Back!</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to your account to continue</p>
            <div className="mx-auto mt-3 h-0.5 w-10 bg-primary" />

            <form className="mt-8 space-y-5">
              <Field label="Email Address" icon={Mail} placeholder="Enter your email address" type="email" />
              <div>
                <Field label="Password" icon={Lock} placeholder="Enter your password" type="password" trailing={<Eye className="h-4 w-4" />} />
                <div className="mt-2 text-right">
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01]"
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </button>
            </form>

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

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
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
