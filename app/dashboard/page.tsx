"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { scans, getToken, getUser, clearToken, type Scan } from "../../lib/api";

const statusColor: Record<Scan["status"], string> = {
  PENDING: "bg-gray-100 text-gray-700",
  RUNNING: "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const router = useRouter();
  const [items, setItems] = useState<Scan[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const user = getUser();

  async function refresh() {
    try {
      const list = await scans.list();
      setItems(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load scans");
    }
  }

  useEffect(() => {
    if (!getToken()) {
      router.replace("/signin");
      return;
    }
    refresh();
    const t = setInterval(refresh, 4000);
    return () => clearInterval(t);
  }, [router]);

  function logout() {
    clearToken();
    router.replace("/signin");
  }

  return (
    <div className="min-h-screen w-full bg-white tasa-orbiter-display">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">dockerguard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <a
            href="/scan/new"
            className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-900"
          >
            + New Scan
          </a>
          <button
            onClick={logout}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl mb-6 text-black">Your Scans</h2>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {!items ? (
          <p className="text-gray-500">Loading…</p>
        ) : items.length === 0 ? (
          <div className="border border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-600 mb-4">No scans yet.</p>
            <a
              href="/scan/new"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              Run your first scan
            </a>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 text-black">
                    <td className="px-4 py-3 font-mono text-xs">{s.image}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColor[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/scan/${s.id}`}
                        className="text-black font-medium hover:underline"
                      >
                        View →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
