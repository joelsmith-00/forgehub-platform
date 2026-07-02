import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

function StubPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-ink text-ink-foreground">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">FORGE</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">{title}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{body}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-muted-foreground">This section is coming soon.</p>
      </section>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — FORGE" }] }),
  component: () => <StubPage title="About FORGE" body="Building tomorrow, together." />,
});
