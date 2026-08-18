import { apiFetch } from "./client";
export async function fetchSystemConfig() {
    return apiFetch("/api/admin/system-config");
}
export async function saveSystemConfig(data) {
    return apiFetch("/api/admin/system-config", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}
