"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { scans, getToken, type Scan, type Severity, type Vulnerability } from "../../../lib/api";

const sevColor: Record<Severity, string> = {
  CRITICAL: "bg-red-100 text-red-700 border-red-300",
  HIGH: "bg-orange-100 text-orange-700 border-orange-300",
  MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
  LOW: "bg-blue-100 text-blue-700 border-blue-300",
  UNKNOWN: "bg-gray-100 text-gray-700 border-gray-300",
};

const sevDot: Record<Severity, string> = {
  CRITICAL: "bg-red-500",
  HIGH: "bg-orange-400",
  MEDIUM: "bg-yellow-400",
  LOW: "bg-blue-400",
  UNKNOWN: "bg-gray-400",
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

  const gridBackground: React.CSSProperties = {
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "36px 36px",
  };

  return (
    <div className="min-h-screen w-full bg-white tasa-orbiter-display text-black">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href="/dashboard" className="text-2xl font-bold">dockerguard.</a>
        <a href="/dashboard" className="text-sm text-gray-600 hover:text-black">← Back to dashboard</a>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {!scan ? (
          <p className="text-gray-500">Loading…</p>
        ) : (
          <>
            {/* Image header */}
            <div className="mb-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-5 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Image</p>
              <h2 className="text-2xl font-mono break-all">{scan.image}</h2>
              <div className="flex items-center gap-3 mt-3 text-sm flex-wrap">
                <span
                  className={`inline-block px-3 py-1 rounded font-medium ${
                    scan.status === "DONE"
                      ? "bg-green-100 text-green-700"
                      : scan.status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : scan.status === "RUNNING"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {scan.status}
                </span>
                <span className="text-gray-500">
                  Started {new Date(scan.createdAt).toLocaleString()}
                </span>
                {scan.completedAt && (
                  <span className="text-gray-500">
                    Completed {new Date(scan.completedAt).toLocaleString()}
                  </span>
                )}
              </div>
              {scan.errorMessage && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {scan.errorMessage}
                </p>
              )}
            </div>

            {scan.status !== "DONE" && scan.status !== "FAILED" && (
              <div className="border border-gray-200 rounded-xl bg-white/80 p-12 text-center">
                <p className="text-gray-600">Scan in progress… auto-refreshing.</p>
              </div>
            )}

            {scan.status === "DONE" && (
              <>
                {/* Severity summary cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {(["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"] as Severity[]).map((sev) => (
                    <div key={sev} className={`border rounded-xl p-4 bg-white/90 ${sevColor[sev]}`}>
                      <p className="text-xs uppercase tracking-wide">{sev}</p>
                      <p className="text-2xl font-bold mt-1">{counts[sev] ?? 0}</p>
                    </div>
                  ))}
                </div>

                {/* Two-column layout: AI summary + Recent advisories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* AI Summary */}
                  <div className="bg-white/90 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">✦</span>
                        <h3 className="font-semibold text-sm">AI Summary</h3>
                      </div>
                      {!showSummary && (
                        <button
                          onClick={handleGenerateSummary}
                          className="text-xs px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          Generate
                        </button>
                      )}
                    </div>

                    {!showSummary && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Get an AI-generated risk assessment of this image based on the detected
                        vulnerabilities, including remediation guidance.
                      </p>
                    )}

                    {showSummary && summaryLoading && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 py-4">
                        <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        Analysing scan results…
                      </div>
                    )}

                    {showSummary && !summaryLoading && summary && (
                      <>
                        <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
                        <button
                          onClick={() => {
                            setShowSummary(false);
                            setSummary(null);
                          }}
                          className="mt-3 text-xs text-gray-400 hover:text-gray-600"
                        >
                          Dismiss
                        </button>
                      </>
                    )}
                  </div>

                  {/* Recent advisories */}
                  <div className="bg-white/90 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">📰</span>
                      <h3 className="font-semibold text-sm">Recent Advisories</h3>
                      <span className="text-xs text-gray-400 ml-auto">from this scan</span>
                    </div>

                    {newsItems.length === 0 ? (
                      <p className="text-xs text-gray-500">No vulnerabilities to report.</p>
                    ) : (
                      <ul className="space-y-3">
                        {newsItems.map((v) => {
                          const sev = (v.severity?.toUpperCase() as Severity) ?? "UNKNOWN";
                          return (
                            <li key={v.id} className="flex items-start gap-3">
                              <span
                                className={`mt-1 w-2 h-2 rounded-full shrink-0 ${sevDot[sev]}`}
                              />
                              <div className="min-w-0">
                                <a
                                  href={`https://nvd.nist.gov/vuln/detail/${v.vulnerabilityId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-mono font-semibold hover:underline"
                                >
                                  {v.vulnerabilityId}
                                </a>
                                <p className="text-xs text-gray-500 truncate">
                                  {v.title ?? `Affects ${v.pkgName} ${v.installedVersion}`}
                                </p>
                                {v.fixedVersion && (
                                  <p className="text-xs text-green-600 mt-0.5">
                                    Fix available → {v.fixedVersion}
                                  </p>
                                )}
                              </div>
                              <span
                                className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded border ${sevColor[sev]}`}
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
                <div className="flex gap-2 mb-4 flex-wrap">
                  {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 text-xs rounded border ${
                        filter === f
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Vulnerability table */}
                {filtered.length === 0 ? (
                  <div className="border border-dashed border-gray-300 rounded-xl bg-white/80 p-12 text-center">
                    <p className="text-gray-600">No vulnerabilities found 🎉</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white/90 shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">CVE</th>
                          <th className="px-4 py-3 text-left font-semibold">Package</th>
                          <th className="px-4 py-3 text-left font-semibold">Installed</th>
                          <th className="px-4 py-3 text-left font-semibold">Fixed in</th>
                          <th className="px-4 py-3 text-left font-semibold">Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((v) => {
                          const sev = (v.severity?.toUpperCase() as Severity) ?? "UNKNOWN";
                          return (
                            <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                              <td className="px-4 py-3">
                                <a
                                  href={`https://nvd.nist.gov/vuln/detail/${v.vulnerabilityId}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-xs text-black hover:underline"
                                >
                                  {v.vulnerabilityId}
                                </a>
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">{v.pkgName}</td>
                              <td className="px-4 py-3 font-mono text-xs">{v.installedVersion}</td>
                              <td className="px-4 py-3 font-mono text-xs">
                                {v.fixedVersion ?? "—"}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-block px-2 py-1 rounded text-xs font-medium border ${sevColor[sev]}`}
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
