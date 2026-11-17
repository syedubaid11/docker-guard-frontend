"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { scans, getToken } from "../../../lib/api";

const suggestions = ["alpine:3.18", "nginx:latest", "node:20-alpine", "python:3.12"];

export default function NewScan() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) router.replace("/signin");
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { scanId } = await scans.create(image.trim());
      router.push(`/scan/${scanId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start scan");
      setLoading(false);
    }
  }

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
            ← Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
          New scan
        </p>
        <h1 className="mt-6 text-2xl font-medium tracking-[-0.02em]">
          Which image should we check?
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          Enter any public or private registry reference. Scanning starts
          immediately.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label
              htmlFor="image"
              className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
            >
              Image
            </label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="alpine:3.18"
              className="w-full rounded-md border border-line-strong bg-surface px-3.5 py-3 font-mono text-sm text-fg transition-colors placeholder:text-dim focus:border-muted focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setImage(s)}
                className="rounded-md border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                {s}
              </button>
            ))}
          </div>

          {error && (
            <p className="rounded-md border border-[#3a2020] bg-[#150d0d] px-3.5 py-2.5 text-[13px] text-[#ff8080]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !image.trim()}
            className="w-full rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white disabled:opacity-40"
          >
            {loading ? "Starting…" : "Start scan"}
          </button>
        </form>
      </main>
    </div>
  );
}
