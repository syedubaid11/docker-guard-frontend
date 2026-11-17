import Link from "next/link";
import { allBreakages } from "../lib/constants";
import Footer from "@/components/Footer";

const feed = allBreakages.slice(0, 10);

const severityTone: Record<string, string> = {
  Critical: "text-fg",
  High: "text-muted",
  Medium: "text-dim",
};

const capabilities = [
  {
    n: "01",
    title: "Multi-engine scanning",
    body: "Trivy, Grype and Snyk run against every image. One reconciled result, no conflicting reports.",
  },
  {
    n: "02",
    title: "AI triage",
    body: "Findings are ranked by real exposure in your image, not by raw severity score alone.",
  },
  {
    n: "03",
    title: "Continuous watch",
    body: "Images you have already scanned are re-checked as new advisories land.",
  },
  {
    n: "04",
    title: "Pipeline API",
    body: "The same scan behind a single HTTP call, ready to gate a build in CI.",
  },
];

const steps = [
  { n: "1", title: "Paste image", body: "Any public or private registry reference." },
  { n: "2", title: "Scan", body: "Engines run in parallel in the cloud." },
  { n: "3", title: "Triage", body: "Results are deduplicated and ranked." },
  { n: "4", title: "Act", body: "Read the fix, not the JSON." },
];

const today = [
  "Install and maintain three scanners locally",
  "Reconcile conflicting output by hand",
  "Read thousands of lines of raw JSON",
  "Wait on slow, brittle CI integrations",
];

const instead = [
  "One hosted scan, nothing to install",
  "Deduplicated findings from every engine",
  "Plain-language explanation and fix",
  "A single API call inside your pipeline",
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none fixed inset-0 z-0"
      />

      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-[15px] font-medium tracking-tight">
            dockerguard<span className="text-dim">.</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-md px-3.5 py-2 text-[13px] text-muted transition-colors hover:text-fg"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-fg px-3.5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-white"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="grid gap-16 py-24 lg:grid-cols-[1.4fr_0.85fr] lg:gap-20 lg:py-32">
          <div>
            <Label>Container security</Label>
            <h1 className="mt-7 text-[clamp(2.25rem,4.6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
              Ship images without
              <br className="hidden sm:block" /> the vulnerabilities.
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted">
              Paste a Docker image. dockerguard scans it across every major
              engine and returns one prioritised, readable report.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white"
              >
                Start scanning
              </Link>
              <Link
                href="/signin"
                className="rounded-md border border-line-strong px-5 py-2.5 text-sm text-fg transition-colors hover:border-dim hover:bg-white/[0.03]"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              <span>No install</span>
              <span aria-hidden>/</span>
              <span>No config</span>
              <span aria-hidden>/</span>
              <span>Results in seconds</span>
            </div>
          </div>

          {/* Live feed */}
          <aside className="lg:pt-2">
            <div className="overflow-hidden rounded-md border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                  Recent breakages
                </span>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                  Live
                </span>
              </div>

              <div className="ticker">
                <div className="ticker-track">
                  {[...feed, ...feed].map((breakage, index) => (
                    <div
                      key={`${breakage.id}-${index}`}
                      className="flex items-center justify-between gap-4 border-b border-line/70 px-5 py-3.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[13px] text-fg/90">
                          {breakage.name}
                        </p>
                        <p className="mt-1 truncate font-mono text-[11px] text-dim">
                          {breakage.id}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] ${
                          severityTone[breakage.severity] ?? "text-dim"
                        }`}
                      >
                        {breakage.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/signin"
                className="block border-t border-line px-5 py-3.5 text-center text-[13px] text-muted transition-colors hover:bg-white/[0.03] hover:text-fg"
              >
                View all issues
              </Link>
            </div>
          </aside>
        </section>

        {/* Capabilities */}
        <section className="border-t border-line py-20">
          <Label>What you get</Label>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.n} className="bg-bg p-6 sm:p-7">
                <span className="font-mono text-[11px] text-dim">{c.n}</span>
                <h3 className="mt-5 text-[15px] font-medium tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-line py-20">
          <Label>How it works</Label>
          <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="bg-bg p-6 sm:p-7">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] text-muted">
                  {s.n}
                </span>
                <h3 className="mt-5 text-[15px] font-medium tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Comparison */}
        <section className="border-t border-line py-20">
          <Label>Why bother</Label>
          <h2 className="mt-7 max-w-lg text-3xl font-medium leading-tight tracking-[-0.025em]">
            Docker scanning is a tooling problem before it is a security one.
          </h2>

          <div className="mt-14 grid gap-px bg-line md:grid-cols-2">
            <div className="bg-bg p-7 md:pr-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                Today
              </p>
              <ul className="mt-6 space-y-3.5">
                {today.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-muted"
                  >
                    <span aria-hidden className="text-dim">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-bg p-7 md:pl-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                With dockerguard
              </p>
              <ul className="mt-6 space-y-3.5">
                {instead.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-fg"
                  >
                    <span aria-hidden className="text-dim">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-line py-24">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.025em]">
                Scan your first image in under a minute.
              </h2>
              <p className="mt-4 text-[15px] text-muted">
                No credit card, no agent, no local setup.
              </p>
            </div>
            <Link
              href="/signup"
              className="shrink-0 rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white"
            >
              Get started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
