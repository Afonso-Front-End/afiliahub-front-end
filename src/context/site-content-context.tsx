import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { SiteContentLoadingShell } from "@/components/SiteContentLoadingShell";
import { setStoreOnline as setStoreOnlineApi } from "@/api/cms";
import {
  reloadSiteContentFromServer,
  siteContentQueryOptions,
} from "@/lib/site-content-query";
import type { SiteContent } from "@/types/cms";

type SiteContentContextValue = {
  content: SiteContent;
  storeOnline: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
  toggleStoreOnline: (online: boolean, password: string) => Promise<void>;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function createStoreOnlineToggle(queryClient: QueryClient) {
  return async (online: boolean, password: string) => {
    await setStoreOnlineApi({ online, password });
    await reloadSiteContentFromServer(queryClient);
    await queryClient.invalidateQueries({ queryKey: ["system-config"] });
  };
}

function buildSiteContentValue(
  data: { storeOnline: boolean; content: SiteContent },
  isLoading: boolean,
  queryClient: QueryClient,
): SiteContentContextValue {
  return {
    content: data.content,
    storeOnline: data.storeOnline,
    isLoading,
    refresh: () => reloadSiteContentFromServer(queryClient),
    toggleStoreOnline: createStoreOnlineToggle(queryClient),
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data, isPending, isFetching } = useQuery(siteContentQueryOptions);

  const value = useMemo(() => {
    if (!data) return null;
    return buildSiteContentValue(data, isPending || isFetching, queryClient);
  }, [data, isPending, isFetching, queryClient]);

  if (!value) {
    return <SiteContentLoadingShell />;
  }

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used within SiteContentProvider");
  return ctx;
}
