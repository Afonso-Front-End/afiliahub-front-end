import { jsx as _jsx } from "react/jsx-runtime";
import { useRouterState } from "@tanstack/react-router";
import { useSiteContent } from "@/context/site-content-context";
export function StoreOfflineBanner() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const { storeOnline } = useSiteContent();
    if (storeOnline || pathname.startsWith("/admin"))
        return null;
    return (_jsx("div", { className: "bg-amber-500 text-amber-950 border-b border-amber-600/20", children: _jsx("div", { className: "max-w-[1440px] mx-auto px-4 py-2 text-center text-xs font-semibold", children: "Loja offline para visitantes. S\u00F3 administradores com sess\u00E3o ativa veem o site." }) }));
}
