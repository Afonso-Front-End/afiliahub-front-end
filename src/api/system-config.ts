import type { SafeSystemConfig, SystemConfigView } from "@/types/system-config";
import { apiFetch } from "./client";

export async function fetchSystemConfig() {
  return apiFetch<SystemConfigView>("/api/admin/system-config");
}

export async function saveSystemConfig(data: SafeSystemConfig) {
  return apiFetch<SystemConfigView>("/api/admin/system-config", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
