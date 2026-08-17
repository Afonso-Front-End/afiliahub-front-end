import { createServerFn } from "@tanstack/react-start";
import { apiFetch } from "./client";

type AdminUser = { email: string; name: string };

export async function adminLogin({ data }: { data: { email: string; password: string } }) {
  return apiFetch<{ user: AdminUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function adminLogout() {
  return apiFetch<{ ok: boolean }>("/api/auth/logout", { method: "POST" });
}

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { serverApiFetch } = await import("./server-fetch.server");
  return serverApiFetch<{ user: AdminUser } | null>("/api/auth/session");
});
