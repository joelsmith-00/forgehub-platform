import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/features")({
  head: () => ({ meta: [{ title: "Features — FORGE" }] }),
  component: () => (
    <div className="min-h-screen bg-background">
      <section className="relative bg-ink text-ink-foreground">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Everything You Need</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">Features</h1>
          <p className="mt-4 max-w-2xl text-white/70">All the tools you need to succeed.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 text-muted-foreground">Coming soon.</section>
      <Footer />
    </div>
  ),
});
