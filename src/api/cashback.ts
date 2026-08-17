import type { CashbackActivation } from "@/types/user";
import { apiFetch } from "./client";

export async function fetchCashbackActivations() {
  return apiFetch<{ activations: CashbackActivation[] }>("/api/cashback/activations");
}

export async function setCashbackActivation(data: { storeName: string; active: boolean }) {
  return apiFetch<{ activation: CashbackActivation }>("/api/cashback/activations", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function trackAffiliateClick(data: {
  storeName: string;
  productName: string;
  productId?: string;
  baseUrl: string;
}) {
  return apiFetch<{ clickId: string; redirectUrl: string; trackingEnabled: boolean }>(
    "/api/cashback/click",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}
