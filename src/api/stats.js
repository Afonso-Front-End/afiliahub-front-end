import { createIsomorphicFn } from "@tanstack/react-start";
import { apiFetch } from "./client";

export const fetchTopClicks = createIsomorphicFn()
  .client(() => apiFetch("/api/stats/top-clicks"))
  .server(async () => {
    const { serverApiFetch } = await import("./server-fetch.server");
    return serverApiFetch("/api/stats/top-clicks");
  });

/** @deprecated Use fetchTopClicks */
export const loadTopClicks = fetchTopClicks;
