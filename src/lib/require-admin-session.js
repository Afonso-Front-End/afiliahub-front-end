import { redirect } from "@tanstack/react-router";
import { getAdminSession } from "@/api/auth";

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw redirect({ to: "/admin/login" });
  }
  return session;
}

export async function redirectIfAdminSession() {
  const session = await getAdminSession();
  if (session) {
    throw redirect({ to: "/admin" });
  }
}
