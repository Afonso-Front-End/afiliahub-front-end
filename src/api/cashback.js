import { apiFetch } from "./client";
export async function fetchCashbackActivations() {
    return apiFetch("/api/cashback/activations");
}
export async function setCashbackActivation(data) {
    return apiFetch("/api/cashback/activations", {
        method: "PUT",
        body: JSON.stringify(data),
    });
}
export async function trackAffiliateClick(data) {
    return apiFetch("/api/cashback/click", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
