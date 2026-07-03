import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Users,
  CalendarDays,
  Lightbulb,
  ShieldCheck,
  Rocket,
  BadgeCheck,
  UserRound,
  Trophy,
  LineChart,
  Award,
  Headphones,
  Flame,
  UsersRound,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/hero-forge.jpg";
import aboutImg from "@/assets/about-building.jpg";
import { ROLE_LIST } from "@/lib/roles";
import { Quote, Sparkles, MousePointerClick, UserPlus, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FORGE Innovation & Ventures — Build Ideas. Shape Futures." },
      {
        name: "description",
        content:
          "FORGE is a unified platform for students, staff, alumni and administrators to collaborate, learn, innovate and build a better future together.",
      },
      { property: "og:title", content: "FORGE Innovation & Ventures" },
      {
        property: "og:description",
        content: "Igniting innovation, empowering ventures.",
      },
    ],
  }),
  component: Landing,
});

const stats = [
  { icon: Users, value: "5000+", label: "Active Students" },
  { icon: UserRound, value: "300+", label: "Staff Members" },
  { icon: UsersRound, value: "1500+", label: "Alumni Connected" },
  { icon: CalendarDays, value: "100+", label: "Events Organized" },
  { icon: Trophy, value: "50+", label: "Awards Won" },
];

const features = [
  {
    icon: BarChart3,
    title: "Academic Excellence",
    body: "Track attendance, marks, assignments and performance.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Development",
    body: "Monitor progress, set goals and unlock your full potential.",
  },
  {
    icon: Users,
    title: "Collaboration",
    body: "Connect with peers, mentors and faculty seamlessly.",
  },
  {
    icon: CalendarDays,
    title: "Events & Activities",
    body: "Discover, participate and organize exciting events.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    body: "Share ideas, build projects and innovate for a better tomorrow.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    body: "Enterprise-grade security to protect your data and privacy.",
  },
];

const aboutPillars = [
  { icon: Rocket, title: "Innovation Driven", body: "Encouraging new ideas" },
  { icon: BadgeCheck, title: "Future Ready", body: "Preparing leaders of tomorrow" },
  { icon: Users, title: "Stronger Together", body: "A community that grows together" },
];

const benefits = [
  { icon: UserRound, title: "Personalized Dashboard", body: "Get a customized view of your progress." },
  { icon: LineChart, title: "Performance Insights", body: "Understand your strengths and improve." },
  { icon: Users, title: "Career & Mentorship", body: "Connect with mentors and explore opportunities." },
  { icon: Award, title: "Certificates & Badges", body: "Earn rewards and showcase your achievements." },
  { icon: Trophy, title: "Leaderboard", body: "Compete, climb ranks and be motivated." },
  { icon: Headphones, title: "24/7 Support", body: "We're here to help you every step of the way." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <Navbar />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-40 lg:grid-cols-2 lg:pb-24 lg:pt-44">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Igniting Innovation,<br />Empowering Ventures
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              BUILD IDEAS.
              <br />
              <span className="text-flame-gradient">SHAPE FUTURES.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              FORGE Innovation & Ventures is a unified platform for students, staff, alumni and administrators
              to collaborate, learn, innovate and build a better future together.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Sign In <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-primary hover:text-primary"
              >
                Sign Up <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-white/60">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Everything You Need</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">All the Tools You Need to Succeed</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-primary" />
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-sm font-bold">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLE SELECTION */}
      <section id="roles" className="relative overflow-hidden bg-ink py-24 text-ink-foreground">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(circle at 15% 20%, oklch(0.68 0.22 40 / 0.35), transparent 40%), radial-gradient(circle at 85% 80%, oklch(0.55 0.18 30 / 0.3), transparent 45%)",
        }} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Built For Everyone On Campus
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Choose Your <span className="text-flame-gradient">Journey</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Four tailored experiences. One connected platform. Pick the role that fits you and jump right in.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROLE_LIST.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.key}
                  to="/login/$role"
                  params={{ role: r.key }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1.5 hover:border-primary/40 hover:bg-white/[0.06]"
                >
                  <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${r.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-70`} />
                  <div className={`relative grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${r.accent} text-white shadow-glow`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="relative mt-5 text-xl font-bold">{r.label}</h3>
                  <p className="relative mt-1 text-xs uppercase tracking-wider text-primary/90">{r.tagline}</p>
                  <p className="relative mt-4 text-sm leading-relaxed text-white/70">{r.description}</p>
                  <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Get Started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">How It Works</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">Get Started in 3 Simple Steps</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-primary" />
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
            {[
              { step: "01", icon: MousePointerClick, t: "Pick Your Role", d: "Select whether you're a student, staff member, alumni or admin." },
              { step: "02", icon: UserPlus, t: "Request Access", d: "Fill in a quick form. Admin reviews and approves your account." },
              { step: "03", icon: Zap, t: "Start Building", d: "Dive into your personalized dashboard and unlock everything FORGE offers." },
            ].map((s) => (
              <div key={s.step} className="relative text-center">
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-background ring-4 ring-primary/10">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-xs font-black tracking-widest text-primary">STEP {s.step}</div>
                <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Voices From FORGE</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">Loved by the Community</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-primary" />
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "FORGE turned scattered college life into one clean dashboard. I finally see everything in one place.",
                n: "Priya S.",
                r: "3rd Year, CSE",
              },
              {
                q: "Uploading marks and tracking student performance used to take hours. Now it's a few clicks.",
                n: "Dr. Ravi Kumar",
                r: "Assistant Professor",
              },
              {
                q: "Being able to mentor students from anywhere in the world? That's what alumni networking should feel like.",
                n: "Aisha Menon",
                r: "Alumni, Batch 2019",
              },
            ].map((t) => (
              <figure key={t.n} className="relative rounded-2xl bg-card p-8 shadow-card">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
                <blockquote className="text-sm leading-relaxed text-foreground">"{t.q}"</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="text-sm font-bold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About FORGE</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Building Tomorrow.
              <br />
              Together.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              FORGE Innovation & Ventures is more than a platform — it's a community that fosters creativity,
              collaboration and continuous growth. Join us in shaping a future driven by innovation and excellence.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={aboutImg}
              alt="FORGE campus building at dusk"
              width={1400}
              height={900}
              loading="lazy"
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute right-6 top-1/2 w-64 -translate-y-1/2 space-y-3 rounded-xl bg-ink/90 p-5 text-ink-foreground backdrop-blur">
              {aboutPillars.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-white/60">{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-background pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Join FORGE?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Unlock Opportunities, Achieve More</h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex flex-col">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold">{b.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-12">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-primary">
              <Flame className="h-7 w-7" />
            </div>
            <div className="min-w-0 text-primary-foreground">
              <h3 className="text-xl font-bold">Be a Part of the Innovation Revolution</h3>
              <p className="text-sm text-primary-foreground/85">
                Together, let's ignite ideas, empower ventures and build a better tomorrow.
              </p>
            </div>
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-bold text-primary transition-transform hover:scale-[1.02]"
          >
            Get Started Today <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= Partners strip ================= */}
      <section className="border-y border-border/60 bg-secondary/40 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Trusted by 30+ institutions & industry partners
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
            {["FORGE Labs", "InnovateX", "EduSpark", "NexaAI", "Skyline", "Verdant"].map((p) => (
              <div key={p} className="text-center text-sm font-black tracking-tight text-muted-foreground/80 transition-colors hover:text-primary">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Numbers that matter ================= */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Impact in numbers
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              A campus that <span className="text-flame-gradient">delivers results</span>
            </h2>
            <p className="mt-4 text-white/60">
              From placements to publications, our community moves fast — and takes everyone with it.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "94%", v: "Placement rate", d: "Class of 2025 across 4 departments" },
              { k: "1.2K", v: "Active projects", d: "Live student & alumni collaborations" },
              { k: "320+", v: "Industry mentors", d: "From FAANG, ISRO, DRDO and startups" },
              { k: "18M", v: "Scholarships awarded", d: "Merit and need-based funding" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-4xl font-black text-flame-gradient">{s.k}</div>
                <div className="mt-2 text-sm font-bold">{s.v}</div>
                <div className="mt-1 text-xs text-white/50">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Frequently asked
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Everything you need to know
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {[
              { q: "Who can create a FORGE account?", a: "Students, staff, alumni and administrators of the institution. Each role has its own tailored dashboard and permissions." },
              { q: "Is my data secure?", a: "Yes. FORGE runs on enterprise-grade infrastructure with role-based access control, encrypted transit and audited storage." },
              { q: "How do I get access as an alumni?", a: "Choose Alumni on the sign-up page, verify your graduation details and our team will approve your request within 24 hours." },
              { q: "Can staff import marks from Excel?", a: "Yes. Staff dashboards support bulk upload for marks, attendance and student records with validation and rollback." },
              { q: "Does FORGE support mobile devices?", a: "Every dashboard is fully responsive — designed to work beautifully on phones, tablets and desktops." },
            ].map((f, i) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5 transition-all open:shadow-card" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold">
                  {f.q}
                  <ArrowRight className="h-4 w-4 transition-transform group-open:rotate-90 text-primary" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
