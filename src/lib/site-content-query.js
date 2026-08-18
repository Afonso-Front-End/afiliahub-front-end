import { fetchSiteContent } from "@/api/cms";

export const SITE_CONTENT_QUERY_KEY = ["site-content"];

export const siteContentQueryOptions = {
  queryKey: SITE_CONTENT_QUERY_KEY,
  queryFn: () => fetchSiteContent(),
  staleTime: 0,
  gcTime: 0,
  refetchOnMount: "always",
  refetchOnWindowFocus: true,
};

export function patchSiteContentSection(queryClient, sectionId, sectionData) {
  queryClient.setQueryData(SITE_CONTENT_QUERY_KEY, (current) => {
    if (!current) {
      return current;
    }

    return {
      ...current,
      content: {
        ...current.content,
        [sectionId]: sectionData,
      },
    };
  });
}

export async function reloadSiteContentFromServer(queryClient) {
  await queryClient.invalidateQueries({ queryKey: SITE_CONTENT_QUERY_KEY });
  return queryClient.fetchQuery(siteContentQueryOptions);
}
