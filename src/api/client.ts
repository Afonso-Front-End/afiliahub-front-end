import { parseApiJsonResponse } from "./parse-response";

function getApiBase() {
  if (typeof window !== "undefined") return "";
  return import.meta.env.VITE_API_URL ?? "http://localhost:4000";
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${getApiBase()}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  return parseApiJsonResponse<T>(res);
}
