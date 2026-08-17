import type { StoreApiConfig } from "@/types/user";
import { apiFetch } from "./client";

export async function fetchStoreApiConfigs() {
  return apiFetch<{ stores: StoreApiConfig[] }>("/api/admin/store-apis");
}

export async function saveStoreApiConfig(
  storeName: string,
  data: Omit<StoreApiConfig, "storeName" | "postbackUrl" | "updatedAt">,
) {
  return apiFetch<{ config: StoreApiConfig }>(
    `/api/admin/store-apis/${encodeURIComponent(storeName)}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
}
