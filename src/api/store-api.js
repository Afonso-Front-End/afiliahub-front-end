import { apiFetch } from "./client";
export async function fetchStoreApiConfigs() {
    return apiFetch("/api/admin/store-apis");
}
export async function saveStoreApiConfig(storeName, data) {
    return apiFetch(`/api/admin/store-apis/${encodeURIComponent(storeName)}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}
