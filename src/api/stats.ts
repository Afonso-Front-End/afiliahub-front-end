import { createServerFn } from "@tanstack/react-start";
import { apiFetch } from "./client";

export type ClickRankingSummary = {
  totalClicks: number;
  topClicks: number;
  rankedCount: number;
  items: Array<{ productId: string; clicks: number }>;
};

export const loadTopClicks = createServerFn({ method: "GET" }).handler(async () => {
  const { serverApiFetch } = await import("./server-fetch.server");
  return serverApiFetch<ClickRankingSummary>("/api/stats/top-clicks");
});

export async function fetchTopClicks() {
  return loadTopClicks();
}
