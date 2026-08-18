import { createServerFn } from "@tanstack/react-start";
export const loadTopClicks = createServerFn({ method: "GET" }).handler(async () => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch("/api/stats/top-clicks");
});
export async function fetchTopClicks() {
    return loadTopClicks();
}
