import { loadSiteContent } from "@/api/cms";
export const SITE_CONTENT_QUERY_KEY = ["site-content"];
export const siteContentQueryOptions = {
    queryKey: SITE_CONTENT_QUERY_KEY,
    queryFn: () => loadSiteContent(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
};
export async function reloadSiteContentFromServer(queryClient) {
    await queryClient.fetchQuery(siteContentQueryOptions);
}
