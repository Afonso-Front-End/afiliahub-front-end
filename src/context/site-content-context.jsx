import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteContentLoadingShell } from "@/components/SiteContentLoadingShell";
import { setStoreOnline as setStoreOnlineApi } from "@/api/cms";
import { reloadSiteContentFromServer, siteContentQueryOptions, } from "@/lib/site-content-query";
const SiteContentContext = createContext(null);
function createStoreOnlineToggle(queryClient) {
    return async (online, password) => {
        await setStoreOnlineApi({ online, password });
        await reloadSiteContentFromServer(queryClient);
        await queryClient.invalidateQueries({ queryKey: ["system-config"] });
    };
}
function buildSiteContentValue(data, isLoading, queryClient) {
    return {
        content: data.content,
        storeOnline: data.storeOnline,
        isLoading,
        refresh: () => reloadSiteContentFromServer(queryClient),
        toggleStoreOnline: createStoreOnlineToggle(queryClient),
    };
}
export function SiteContentProvider({ children }) {
    const queryClient = useQueryClient();
    const { data, isPending, isFetching } = useQuery(siteContentQueryOptions);
    const value = useMemo(() => {
        if (!data)
            return null;
        return buildSiteContentValue(data, isPending || isFetching, queryClient);
    }, [data, isPending, isFetching, queryClient]);
    if (!value) {
        return _jsx(SiteContentLoadingShell, {});
    }
    return (_jsx(SiteContentContext.Provider, { value: value, children: children }));
}
export function useSiteContent() {
    const ctx = useContext(SiteContentContext);
    if (!ctx)
        throw new Error("useSiteContent must be used within SiteContentProvider");
    return ctx;
}
