import { createServerFn } from "@tanstack/react-start";
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
export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch("/api/auth/session");
});
