const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("dg_token");
}

export function setToken(token: string) {
  localStorage.setItem("dg_token", token);
}

export function clearToken() {
  localStorage.removeItem("dg_token");
}

export function getUser(): { id: number; name?: string; email?: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("dg_user");
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user: object) {
  localStorage.setItem("dg_user", JSON.stringify(user));
}

export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

// --- Typed helpers ---

export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";

export interface Vulnerability {
  id: string;
  vulnerabilityId: string;
  pkgName: string;
  installedVersion: string;
  fixedVersion: string | null;
  severity: Severity;
  title: string | null;
  description: string | null;
}

export interface Scan {
  id: string;
  image: string;
  status: "PENDING" | "RUNNING" | "DONE" | "FAILED";
  errorMessage: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  vulnerabilities?: Vulnerability[];
}

export const auth = {
  signup: (body: { name: string; email: string; password: string }) =>
    api<{ token: string; user: { id: number; name?: string; email?: string } }>(
      "/api/signup",
      { method: "POST", body: JSON.stringify(body) },
    ),
  login: (body: { email: string; password: string }) =>
    api<{ token: string; user: { id: number; name?: string; email?: string } }>(
      "/api/login",
      { method: "POST", body: JSON.stringify(body) },
    ),
};

export const scans = {
  create: (image: string) =>
    api<{ scanId: string; status: string }>("/api/scan", {
      method: "POST",
      body: JSON.stringify({ image }),
    }),
  get: (id: string) => api<Scan>(`/api/scan/${id}`),
  list: () => api<Scan[]>("/api/scan"),
};
