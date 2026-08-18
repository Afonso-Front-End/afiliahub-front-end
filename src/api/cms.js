import { createIsomorphicFn } from "@tanstack/react-start";
import { apiFetch } from "./client";

export const fetchSiteContent = createIsomorphicFn()
  .client(() => apiFetch("/api/cms/content"))
  .server(async () => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch("/api/cms/content");
  });

/** @deprecated Use fetchSiteContent */
export const loadSiteContent = fetchSiteContent;

export async function setStoreOnline({ online, password }) {
  return apiFetch("/api/cms/settings/store-online", {
    method: "PUT",
    body: JSON.stringify({ online, password }),
  });
}

export async function fetchSection(sectionId) {
  return apiFetch(`/api/cms/sections/${sectionId}`);
}

export async function saveSection({ data }) {
  return apiFetch(`/api/cms/sections/${data.sectionId}`, {
    method: "PUT",
    body: JSON.stringify(data.data),
  });
}

export async function uploadCmsImage({ data }) {
  return apiFetch("/api/cms/upload", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
