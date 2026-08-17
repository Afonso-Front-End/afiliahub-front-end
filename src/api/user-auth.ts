import { createServerFn } from "@tanstack/react-start";
import type { PublicUser } from "@/types/user";
import { apiFetch } from "./client";

export async function registerUser(data: { email: string; password: string; name: string }) {
  return apiFetch<{ email: string; message: string }>("/api/user-auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyUserEmail(data: { email: string; code: string }) {
  return apiFetch<{ user: PublicUser }>("/api/user-auth/verify-email", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function resendVerificationCode(data: { email: string }) {
  return apiFetch<{ message: string }>("/api/user-auth/resend-code", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: { email: string; password: string }) {
  return apiFetch<{ user: PublicUser }>("/api/user-auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logoutUser() {
  return apiFetch<{ ok: boolean }>("/api/user-auth/logout", { method: "POST" });
}

export const getUserSession = createServerFn({ method: "GET" }).handler(async () => {
  const { serverApiFetch } = await import("./server-fetch.server");
  return serverApiFetch<{ user: PublicUser } | null>("/api/user-auth/session");
});
