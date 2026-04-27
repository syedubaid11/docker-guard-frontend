"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { scans, getToken } from "../../../lib/api";

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
    <div className="min-h-screen w-full bg-white tasa-orbiter-display text-black">
      <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <a href="/dashboard" className="text-2xl font-bold">dockerguard</a>
        <a href="/dashboard" className="text-sm text-gray-600 hover:text-black">← Back</a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-4xl mb-2">New Scan</h2>
        <p className="text-gray-600 mb-8">
          Enter a Docker image reference to scan for vulnerabilities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Image
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="alpine:3.18  or  ghcr.io/org/repo:tag"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-mono text-sm"
              required
            />
          </div>

          <div className="flex gap-2 flex-wrap pt-2">
            {["alpine:3.18", "nginx:latest", "node:20-alpine", "python:3.12"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setImage(s)}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded font-mono"
              >
                {s}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !image.trim()}
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-60 mt-4"
          >
            {loading ? "Starting…" : "Start Scan"}
          </button>
        </form>
      </main>
    </div>
  );
}
