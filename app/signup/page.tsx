"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, setToken, setUser } from "../../lib/api";

const fields = [
  { name: "name", label: "Full name", type: "text", placeholder: "Jane Doe" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "••••••••",
  },
] as const;

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await auth.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setToken(res.token);
      setUser(res.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
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
              Create your account
            </h1>
            <p className="mt-2 text-[13px] text-muted">
              Start scanning images in under a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-dim"
                >
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-fg transition-colors placeholder:text-dim focus:border-muted focus:outline-none"
                  required
                />
              </div>
            ))}

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
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-8 border-t border-line pt-6 text-center text-[13px] text-muted">
            Already have an account?{" "}
            <Link href="/signin" className="text-fg hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
