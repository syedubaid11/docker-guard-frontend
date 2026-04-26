"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { scans, getToken, type Scan, type Severity } from "../../../lib/api";

const sevColor: Record<Severity, string> = {
  CRITICAL: "bg-red-100 text-red-700 border-red-300",
  HIGH: "bg-orange-100 text-orange-700 border-orange-300",
  MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
  LOW: "bg-blue-100 text-blue-700 border-blue-300",
  UNKNOWN: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function ScanDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [scan, setScan] = useState<Scan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Severity | "ALL">("ALL");

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

  return (
    <div className="min-h-screen w-full bg-white tasa-orbiter-display">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href="/dashboard" className="text-2xl font-bold">Docker Guard</a>
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
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-1">Image</p>
              <h2 className="text-3xl font-mono break-all">{scan.image}</h2>
              <div className="flex items-center gap-3 mt-3 text-sm">
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
              </div>
              {scan.errorMessage && (
                <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {scan.errorMessage}
                </p>
              )}
            </div>

            {scan.status !== "DONE" && scan.status !== "FAILED" && (
              <div className="border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600">Scan in progress… auto-refreshing.</p>
              </div>
            )}

            {scan.status === "DONE" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {(["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"] as Severity[]).map(
                    (sev) => (
                      <div
                        key={sev}
                        className={`border rounded-lg p-4 ${sevColor[sev]}`}
                      >
                        <p className="text-xs uppercase tracking-wide">{sev}</p>
                        <p className="text-2xl font-bold mt-1">{counts[sev] ?? 0}</p>
                      </div>
                    ),
                  )}
                </div>

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

                {filtered.length === 0 ? (
                  <div className="border border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <p className="text-gray-600">No vulnerabilities found 🎉</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
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
                            <tr key={v.id} className="border-b border-gray-100">
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
