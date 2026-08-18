import { jsx as _jsx } from "react/jsx-runtime";
import { useRouterState } from "@tanstack/react-router";
import { StoreMaintenancePage } from "@/components/StoreMaintenancePage";
import { useAdminSession } from "@/hooks/use-admin-session";
import { useSiteContent } from "@/context/site-content-context";
import { gateBypassed, visitorMayBrowse } from "@/lib/store-public-access";
export function StorePublicGate({ children }) {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const { storeOnline, isLoading } = useSiteContent();
    const isAdminRoute = pathname.startsWith("/admin");
    const { isAdmin, ready } = useAdminSession(!isAdminRoute);
    if (gateBypassed(isAdminRoute, isLoading, ready))
        return children;
    if (visitorMayBrowse(storeOnline, isAdmin))
        return children;
    return _jsx(StoreMaintenancePage, {});
}
