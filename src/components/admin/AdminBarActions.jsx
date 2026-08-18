import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
const buttonClass = "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors inline-flex items-center shrink-0 whitespace-nowrap";
const STORE_BUTTON_LABELS = {
    loading: { compact: "…", full: "A atualizar…" },
    on: { compact: "Online", full: "Loja: Online" },
    off: { compact: "Offline", full: "Loja: Offline" },
};
function storeButtonLabel(toggling, storeOnline, compact) {
    const state = toggling ? "loading" : storeOnline ? "on" : "off";
    const labels = STORE_BUTTON_LABELS[state];
    return compact ? labels.compact : labels.full;
}
export function AdminBarStoreOnlineButton({ storeOnline, toggling, onToggle, compact, }) {
    return (_jsx("button", { type: "button", onClick: onToggle, disabled: toggling, className: cn(buttonClass, storeOnline ? "bg-background text-foreground" : "bg-amber-300 text-amber-950", toggling && "opacity-60"), children: storeButtonLabel(toggling, storeOnline, compact) }));
}
function AdminBarNavLinks({ active, onLogout, }) {
    return (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/admin/configuracoes", className: cn(buttonClass, active === "configuracoes"
                    ? "bg-background text-foreground"
                    : "bg-background/15 hover:bg-background/25"), children: "Configura\u00E7\u00F5es" }), _jsx(Link, { to: "/admin/config-apis", className: cn(buttonClass, active === "config-apis"
                    ? "bg-background text-foreground"
                    : "bg-background/15 hover:bg-background/25"), children: "Config APIs" }), _jsx(Link, { to: "/admin/edit/$section", params: { section: "stores" }, className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Editar lojas" }), active !== "preview" && (_jsx(Link, { to: "/admin", className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Preview do site" })), _jsx(Link, { to: "/", className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Ver site" }), _jsx("button", { type: "button", onClick: onLogout, className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Sair" })] }));
}
export function AdminBarActions({ active, storeOnline, toggling, onRefresh, onStoreToggle, onLogout, }) {
    return (_jsxs(_Fragment, { children: [onRefresh && (_jsx("button", { type: "button", onClick: onRefresh, className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Atualizar preview" })), _jsx(AdminBarStoreOnlineButton, { storeOnline: storeOnline, toggling: toggling, onToggle: onStoreToggle }), _jsx(AdminBarNavLinks, { active: active, onLogout: onLogout })] }));
}
