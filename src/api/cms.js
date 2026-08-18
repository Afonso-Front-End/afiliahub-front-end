import { createServerFn } from "@tanstack/react-start";
import { apiFetch } from "./client";
/** Sempre lê o conteúdo publicado via API → MongoDB. */
export const loadSiteContent = createServerFn({ method: "GET" }).handler(async () => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch("/api/cms/content");
});
export async function fetchSiteContent() {
    return loadSiteContent();
}
export async function setStoreOnline({ online, password, }) {
    return apiFetch("/api/cms/settings/store-online", {
        method: "PUT",
        body: JSON.stringify({ online, password }),
    });
}
export const fetchSection = createServerFn({ method: "GET" })
    .validator((data) => data)
    .handler(async ({ data }) => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch(`/api/cms/sections/${data.sectionId}`);
});
export async function saveSection({ data, }) {
    return apiFetch(`/api/cms/sections/${data.sectionId}`, {
        method: "PUT",
        body: JSON.stringify(data.data),
    });
}
export async function uploadCmsImage({ data, }) {
    return apiFetch("/api/cms/upload", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
