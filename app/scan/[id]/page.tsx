"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { scans, getToken, type Scan, type Severity, type Vulnerability } from "../../../lib/api";

const sevColor: Record<Severity, string> = {
  CRITICAL: "border-[#3a2020] bg-[#150d0d] text-[#ff8080]",
  HIGH: "border-[#3a2a18] bg-[#140f09] text-[#ffb578]",
  MEDIUM: "border-[#33301a] bg-[#12110a] text-[#e6d179]",
  LOW: "border-[#1f2b3a] bg-[#0b0f15] text-[#8fb8e8]",
  UNKNOWN: "border-line-strong bg-surface text-dim",
};

const sevDot: Record<Severity, string> = {
  CRITICAL: "bg-[#ff8080]",
  HIGH: "bg-[#ffb578]",
  MEDIUM: "bg-[#e6d179]",
  LOW: "bg-[#8fb8e8]",
  UNKNOWN: "bg-dim",
};

function buildAiSummary(scan: Scan): string {
  const vulns = scan.vulnerabilities ?? [];
  if (vulns.length === 0)
    return `The image ${scan.image} passed with no known vulnerabilities detected. It appears safe to deploy based on this scan.`;

  const counts = vulns.reduce(
    (acc, v) => {
      const sev = (v.severity?.toUpperCase() as Severity) ?? "UNKNOWN";
      acc[sev] = (acc[sev] ?? 0) + 1;
      return acc;
    },
    {} as Record<Severity, number>,
  );

  const criticals = vulns
    .filter((v) => (v.severity?.toUpperCase() as Severity) === "CRITICAL")
    .slice(0, 3);

  const riskLevel =
    (counts.CRITICAL ?? 0) > 0
      ? "critical risk"
      : (counts.HIGH ?? 0) > 0
        ? "high risk"
        : (counts.MEDIUM ?? 0) > 0
          ? "moderate risk"
          : "low risk";

  const parts: string[] = [
    `The image ${scan.image} has been scanned and is classified as ${riskLevel}.`,
    `A total of ${vulns.length} vulnerabilit${vulns.length === 1 ? "y was" : "ies were"} found:`,
    [
      counts.CRITICAL ? `${counts.CRITICAL} Critical` : "",
      counts.HIGH ? `${counts.HIGH} High` : "",
      counts.MEDIUM ? `${counts.MEDIUM} Medium` : "",
      counts.LOW ? `${counts.LOW} Low` : "",
    ]
      .filter(Boolean)
      .join(", ") + ".",
  ];

  if (criticals.length > 0) {
    parts.push(
      `The most severe issues include ${criticals.map((v) => `${v.vulnerabilityId} in ${v.pkgName}`).join(", ")}.`,
    );
    parts.push(
      "Immediate action is recommended: upgrade affected packages or switch to a more recent base image.",
    );
  } else if ((counts.HIGH ?? 0) > 0) {
    parts.push(
      "While no critical vulnerabilities were found, high-severity issues are present and should be remediated before production deployment.",
    );
  } else {
    parts.push(
      "No critical or high vulnerabilities were detected. Review medium and low findings as part of your regular maintenance cycle.",
    );
  }

  return parts.join(" ");
}

function newsItemsFromScan(vulns: Vulnerability[]) {
  const ordered = [...vulns].sort((a, b) => {
    const order: Record<string, number> = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2,
      LOW: 3,
      UNKNOWN: 4,
    };
    return (
      (order[(a.severity?.toUpperCase() ?? "UNKNOWN")] ?? 4) -
      (order[(b.severity?.toUpperCase() ?? "UNKNOWN")] ?? 4)
    );
  });
  return ordered.slice(0, 5);
}

export default function ScanDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [scan, setScan] = useState<Scan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Severity | "ALL">("ALL");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/signin");
      return;
    }

    let stopped = false;
    async function poll() {
      try {
        const s = await scans.get(params.id);
        if (stopped) return;
        setScan(s);
        if (s.status === "DONE" || s.status === "FAILED") return;
        setTimeout(poll, 3000);
      } catch (err) {
        if (stopped) return;
        setError(err instanceof Error ? err.message : "Failed to load scan");
      }
    }
    poll();
    return () => {
      stopped = true;
    };
  }, [params.id, router]);

  function handleGenerateSummary() {
    if (!scan) return;
    setSummaryLoading(true);
    setShowSummary(true);
    // Simulate a brief "thinking" delay for UX
    setTimeout(() => {
      setSummary(buildAiSummary(scan));
      setSummaryLoading(false);
    }, 900);
  }

  const counts = (scan?.vulnerabilities ?? []).reduce(
    (acc, v) => {
      const sev = (v.severity?.toUpperCase() as Severity) ?? "UNKNOWN";
      acc[sev] = (acc[sev] ?? 0) + 1;
      return acc;
    },
    {} as Record<Severity, number>,
  );

  const filtered = (scan?.vulnerabilities ?? []).filter(
    (v) => filter === "ALL" || (v.severity?.toUpperCase() as Severity) === filter,
  );

  const newsItems = scan?.status === "DONE" ? newsItemsFromScan(scan.vulnerabilities ?? []) : [];

  return (
    <div className="min-h-screen w-full bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/dashboard" className="text-[15px] font-medium tracking-tight">
            dockerguard<span className="text-dim">.</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-[13px] text-muted transition-colors hover:text-fg"
          >
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        {error && (
          <p className="mb-8 rounded-md border border-[#3a2020] bg-[#150d0d] px-3.5 py-2.5 text-[13px] text-[#ff8080]">
            {error}
          </p>
        )}

        {!scan ? (
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-dim">
            Loading…
          </p>
        ) : (
          <>
            {/* Image header */}
            <div className="border-b border-line pb-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
                Image
              </p>
              <h1 className="mt-4 font-mono text-xl break-all">{scan.image}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                <span
                  className={`rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                    scan.status === "FAILED"
                      ? "border-[#3a2020] text-[#ff8080]"
                      : "border-line-strong text-muted"
                  }`}
                >
                  {scan.status}
                </span>
                <span className="text-dim">
                  Started {new Date(scan.createdAt).toLocaleString()}
                </span>
                {scan.completedAt && (
                  <span className="text-dim">
                    Completed {new Date(scan.completedAt).toLocaleString()}
                  </span>
                )}
              </div>
              {scan.errorMessage && (
                <p className="mt-5 rounded-md border border-[#3a2020] bg-[#150d0d] px-3.5 py-2.5 text-[13px] text-[#ff8080]">
                  {scan.errorMessage}
                </p>
              )}
            </div>

            {scan.status !== "DONE" && scan.status !== "FAILED" && (
              <div className="mt-12 rounded-md border border-dashed border-line-strong px-6 py-16 text-center">
                <p className="text-[14px] text-muted">
                  Scan in progress — this page refreshes itself.
                </p>
              </div>
            )}

            {scan.status === "DONE" && (
              <>
                {/* Severity summary */}
                <div className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-5">
                  {(["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"] as Severity[]).map((sev) => (
                    <div key={sev} className="bg-bg p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                        {sev}
                      </p>
                      <p className="mt-3 text-2xl font-medium tracking-tight">
                        {counts[sev] ?? 0}
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI summary + advisories */}
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-md border border-line bg-surface p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                        AI summary
                      </h2>
                      {!showSummary && (
                        <button
                          onClick={handleGenerateSummary}
                          className="rounded-md border border-line-strong px-2.5 py-1.5 text-[12px] text-muted transition-colors hover:border-dim hover:text-fg"
                        >
                          Generate
                        </button>
                      )}
                    </div>

                    {!showSummary && (
                      <p className="text-[13px] leading-relaxed text-muted">
                        Generate a risk assessment of this image based on the
                        detected vulnerabilities, with remediation guidance.
                      </p>
                    )}

                    {showSummary && summaryLoading && (
                      <div className="flex items-center gap-2.5 py-3 text-[13px] text-dim">
                        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-dim border-t-transparent" />
                        Analysing scan results…
                      </div>
                    )}

                    {showSummary && !summaryLoading && summary && (
                      <>
                        <p className="text-[13px] leading-relaxed text-muted">
                          {summary}
                        </p>
                        <button
                          onClick={() => {
                            setShowSummary(false);
                            setSummary(null);
                          }}
                          className="mt-4 text-[12px] text-dim transition-colors hover:text-fg"
                        >
                          Dismiss
                        </button>
                      </>
                    )}
                  </div>

                  <div className="rounded-md border border-line bg-surface p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                        Top advisories
                      </h2>
                      <span className="font-mono text-[11px] text-dim">
                        from this scan
                      </span>
                    </div>

                    {newsItems.length === 0 ? (
                      <p className="text-[13px] text-muted">
                        No vulnerabilities to report.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {newsItems.map((v) => {
                          const sev = (v.severity?.toUpperCase() as Severity) ?? "UNKNOWN";
                          return (
                            <li key={v.id} className="flex items-start gap-3">
                              <span
                                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${sevDot[sev]}`}
                              />
                              <div className="min-w-0 flex-1">
                                <a
                                  href={`https://nvd.nist.gov/vuln/detail/${v.vulnerabilityId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-[12px] text-fg hover:underline"
                                >
                                  {v.vulnerabilityId}
                                </a>
                                <p className="truncate text-[12px] text-muted">
                                  {v.title ?? `Affects ${v.pkgName} ${v.installedVersion}`}
                                </p>
                                {v.fixedVersion && (
                                  <p className="mt-1 font-mono text-[11px] text-dim">
                                    Fix → {v.fixedVersion}
                                  </p>
                                )}
                              </div>
                              <span
                                className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${sevColor[sev]}`}
                              >
                                {sev}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Filters */}
                <div className="mt-12 flex flex-wrap gap-2">
                  {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                        filter === f
                          ? "border-fg bg-fg text-black"
                          : "border-line text-muted hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Vulnerability table */}
                {filtered.length === 0 ? (
                  <div className="mt-6 rounded-md border border-dashed border-line-strong px-6 py-16 text-center">
                    <p className="text-[14px] text-muted">
                      No vulnerabilities in this view.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 overflow-x-auto rounded-md border border-line">
                    <table className="w-full min-w-3xl text-left">
                      <thead>
                        <tr className="border-b border-line">
                          {["CVE", "Package", "Installed", "Fixed in", "Severity"].map((h) => (
                            <th
                              key={h}
                              className="px-5 py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-dim"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((v) => {
                          const sev = (v.severity?.toUpperCase() as Severity) ?? "UNKNOWN";
                          return (
                            <tr
                              key={v.id}
                              className="border-b border-line/70 transition-colors last:border-b-0 hover:bg-white/2"
                            >
                              <td className="px-5 py-4">
                                <a
                                  href={`https://nvd.nist.gov/vuln/detail/${v.vulnerabilityId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-[12px] text-fg hover:underline"
                                >
                                  {v.vulnerabilityId}
                                </a>
                              </td>
                              <td className="px-5 py-4 font-mono text-[12px] text-muted">
                                {v.pkgName}
                              </td>
                              <td className="px-5 py-4 font-mono text-[12px] text-muted">
                                {v.installedVersion}
                              </td>
                              <td className="px-5 py-4 font-mono text-[12px] text-muted">
                                {v.fixedVersion ?? "—"}
                              </td>
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-block rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${sevColor[sev]}`}
                                >
                                  {sev}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
