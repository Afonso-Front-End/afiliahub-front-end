import { createServerFn } from "@tanstack/react-start";
import { apiFetch } from "./client";
export async function registerUser(data) {
    return apiFetch("/api/user-auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
export async function verifyUserEmail(data) {
    return apiFetch("/api/user-auth/verify-email", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
export async function resendVerificationCode(data) {
    return apiFetch("/api/user-auth/resend-code", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
export async function loginUser(data) {
    return apiFetch("/api/user-auth/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
export async function logoutUser() {
    return apiFetch("/api/user-auth/logout", { method: "POST" });
}
export const getUserSession = createServerFn({ method: "GET" }).handler(async () => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch("/api/user-auth/session");
});
