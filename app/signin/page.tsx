"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, setToken, setUser } from "../../lib/api";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await auth.login({
        email: formData.email,
        password: formData.password,
      });
      setToken(res.token);
      setUser(res.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-bg text-fg">
      <div
        aria-hidden
        className="grid-backdrop pointer-events-none fixed inset-0 z-0"
      />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <Link href="/" className="text-[15px] font-medium tracking-tight">
              dockerguard<span className="text-dim">.</span>
            </Link>
            <h1 className="mt-8 text-2xl font-medium tracking-[-0.02em]">
              Welcome back
            </h1>
            <p className="mt-2 text-[13px] text-muted">
              Sign in to run and review scans.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-md border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors placeholder:text-dim focus:border-muted focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-md border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors placeholder:text-dim focus:border-muted focus:outline-none"
                required
              />
            </div>

            {error && (
              <p className="rounded-md border border-[#3a2020] bg-[#150d0d] px-3.5 py-2.5 text-[13px] text-[#ff8080]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 border-t border-line pt-6 text-center text-[13px] text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-fg hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
