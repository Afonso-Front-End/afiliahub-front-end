import { createServerFn } from "@tanstack/react-start";
import type { CmsContentResponse, SectionContentMap, SectionId } from "@/types/cms";
import { apiFetch } from "./client";

/** Sempre lê o conteúdo publicado via API → MongoDB. */
export const loadSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const { serverApiFetch } = await import("./server-fetch.server");
  return serverApiFetch<CmsContentResponse>("/api/cms/content");
});

export async function fetchSiteContent() {
  return loadSiteContent();
}

export async function setStoreOnline({
  online,
  password,
}: {
  online: boolean;
  password: string;
}) {
  return apiFetch<{ storeOnline: boolean }>("/api/cms/settings/store-online", {
    method: "PUT",
    body: JSON.stringify({ online, password }),
  });
}

export const fetchSection = createServerFn({ method: "GET" })
  .validator((data: { sectionId: string }) => data)
  .handler(async ({ data }) => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch<SectionContentMap[SectionId]>(`/api/cms/sections/${data.sectionId}`);
  });

export async function saveSection({
  data,
}: {
  data: { sectionId: string; data: Record<string, unknown> };
}) {
  return apiFetch<SectionContentMap[SectionId]>(`/api/cms/sections/${data.sectionId}`, {
    method: "PUT",
    body: JSON.stringify(data.data),
  });
}

export async function uploadCmsImage({
  data,
}: {
  data: { fileName: string; base64: string };
}) {
  return apiFetch<{ url: string }>("/api/cms/upload", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
