import type { QueryClient } from "@tanstack/react-query";
import { loadSiteContent } from "@/api/cms";

export const SITE_CONTENT_QUERY_KEY = ["site-content"] as const;

export const siteContentQueryOptions = {
  queryKey: SITE_CONTENT_QUERY_KEY,
  queryFn: () => loadSiteContent(),
  staleTime: 0,
  gcTime: 0,
  refetchOnMount: "always" as const,
  refetchOnWindowFocus: true,
};

export async function reloadSiteContentFromServer(queryClient: QueryClient) {
  await queryClient.fetchQuery(siteContentQueryOptions);
}
