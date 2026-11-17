"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { scans, getToken, getUser, clearToken, type Scan } from "../../lib/api";

const statusTone: Record<Scan["status"], string> = {
  PENDING: "border-line-strong text-dim",
  RUNNING: "border-line-strong text-fg",
  DONE: "border-line-strong text-muted",
  FAILED: "border-[#3a2020] text-[#ff8080]",
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
    <div className="min-h-screen w-full bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-[15px] font-medium tracking-tight">
            dockerguard<span className="text-dim">.</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-[13px] text-dim sm:inline">
              {user?.email}
            </span>
            <Link
              href="/scan/new"
              className="rounded-md bg-fg px-3.5 py-2 text-[13px] font-medium text-black transition-colors hover:bg-white"
            >
              New scan
            </Link>
            <button
              onClick={logout}
              className="rounded-md border border-line-strong px-3.5 py-2 text-[13px] text-muted transition-colors hover:border-dim hover:text-fg"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-2xl font-medium tracking-[-0.02em]">Your scans</h1>
        <p className="mt-2 text-[13px] text-muted">
          Every image you have submitted, newest first.
        </p>

        {error && (
          <p className="mt-8 rounded-md border border-[#3a2020] bg-[#150d0d] px-3.5 py-2.5 text-[13px] text-[#ff8080]">
            {error}
          </p>
        )}

        {!items ? (
          <p className="mt-12 font-mono text-[12px] uppercase tracking-[0.16em] text-dim">
            Loading…
          </p>
        ) : items.length === 0 ? (
          <div className="mt-12 rounded-md border border-dashed border-line-strong px-6 py-16 text-center">
            <p className="text-[14px] text-muted">No scans yet.</p>
            <Link
              href="/scan/new"
              className="mt-6 inline-block rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white"
            >
              Run your first scan
            </Link>
          </div>
        ) : (
          <div className="mt-12 overflow-x-auto rounded-md border border-line">
            <table className="w-full min-w-xl text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-5 py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-dim">
                    Image
                  </th>
                  <th className="px-5 py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-dim">
                    Status
                  </th>
                  <th className="px-5 py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-dim">
                    Created
                  </th>
                  <th className="px-5 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-line/70 transition-colors last:border-b-0 hover:bg-white/2"
                  >
                    <td className="px-5 py-4 font-mono text-[12px] text-fg">
                      {s.image}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${statusTone[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-muted">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/scan/${s.id}`}
                        className="text-[13px] text-muted transition-colors hover:text-fg"
                      >
                        View →
                      </Link>
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
