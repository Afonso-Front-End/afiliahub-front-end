import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StoreApiCard } from "@/components/admin/StoreApiCard";
import { ADMIN_SHELL_MAIN_NARROW_CLASS } from "@/lib/admin-layout";
import { requireAdminSession } from "@/lib/require-admin-session";
import { fetchStoreApiConfigs } from "@/api/store-api";
import { cn } from "@/lib/utils";
export const Route = createFileRoute("/admin/config-apis")({
    ssr: false,
    beforeLoad: async () => {
        return requireAdminSession();
    },
    component: AdminConfigApisPage,
});
function AdminConfigApisPage() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saveFeedback, setSaveFeedback] = useState(null);
    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchStoreApiConfigs();
            setStores(data.stores);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao carregar.");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load();
    }, []);
    const showSaveFeedback = (message) => {
        setSaveFeedback(message);
        window.setTimeout(() => setSaveFeedback((current) => (current === message ? null : current)), 3000);
    };
    return (_jsxs(AdminShell, { active: "config-apis", title: "Config Admin APIs", subtitle: "Credenciais e rastreio por marketplace (loja real)", saveFeedback: saveFeedback, mainClassName: cn(ADMIN_SHELL_MAIN_NARROW_CLASS, "max-w-4xl"), children: [_jsx("div", { className: "rounded-3xl bg-surface border border-border p-6 shadow-soft", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "size-11 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow shrink-0", children: _jsx(Settings2, { className: "size-5 text-primary-foreground" }) }), _jsxs("div", { children: [_jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl", children: "Config Admin APIs" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-2xl", children: "Configure os IDs de afiliado, par\u00E2metros de rastreio e URLs de postback de cada loja." })] })] }) }), loading && _jsx("p", { className: "text-sm text-muted-foreground", children: "A carregar lojas\u2026" }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), stores.map((store) => (_jsx(StoreApiCard, { initial: store, onSaved: load, onSaveSuccess: showSaveFeedback }, store.storeName)))] }));
}
