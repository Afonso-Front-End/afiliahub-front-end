import { apiFetch } from "./client";

export async function adminLogin({ data }) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function adminLogout() {
  return apiFetch("/api/auth/logout", { method: "POST" });
}

export async function getAdminSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return await apiFetch("/api/auth/session");
  } catch {
    return null;
  }
}
