export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  // Session expired or unauthenticated — kick the user back to login.
  if (res.status === 401 && typeof window !== "undefined") {
    const next = window.location.pathname + window.location.search;
    window.location.assign(`/auth/login?next=${encodeURIComponent(next)}`);
    throw new Error("Sessão expirada.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `Request failed: ${res.status}`,
    );
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
