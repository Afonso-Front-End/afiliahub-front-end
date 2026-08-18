import { redirect } from "@tanstack/react-router";
import { getUserSession } from "@/api/user-auth";

export async function requireUserSession() {
  const session = await getUserSession();
  if (!session?.user) {
    throw redirect({ to: "/conta/entrar" });
  }
  return session;
}

export async function redirectIfUserSession() {
  const session = await getUserSession();
  if (session?.user) {
    throw redirect({ to: "/conta" });
  }
}
