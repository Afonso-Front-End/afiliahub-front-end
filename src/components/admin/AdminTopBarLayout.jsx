import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2, MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AdminBarActions, AdminBarStoreOnlineButton } from "@/components/admin/AdminBarActions";
import { cn } from "@/lib/utils";
const buttonClass = "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors inline-flex items-center shrink-0 whitespace-nowrap";
function AdminSaveFeedback({ message }) {
    return (_jsxs("span", { role: "status", "aria-live": "polite", className: "inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 animate-in fade-in duration-300 max-w-[14rem] truncate", children: [_jsx(CheckCircle2, { className: "size-3.5 shrink-0" }), message] }));
}
function AdminMobileQuickActions({ storeOnline, toggling, onRefresh, onStoreToggle, }) {
    return (_jsxs("div", { className: "flex gap-2 overflow-x-auto pb-0.5 -mx-1 px-1 scrollbar-none", children: [_jsx(AdminBarStoreOnlineButton, { storeOnline: storeOnline, toggling: toggling, onToggle: onStoreToggle, compact: true }), onRefresh && (_jsx("button", { type: "button", onClick: onRefresh, className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Atualizar" })), _jsx(Link, { to: "/", className: cn(buttonClass, "bg-background/15 hover:bg-background/25"), children: "Ver site" })] }));
}
function AdminTopBarMobileHeader({ title, subtitle, menuOpen, onMenuToggle, }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-3 w-full min-w-0", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "font-semibold text-sm truncate", children: title }), _jsx("p", { className: "text-xs opacity-80 truncate", children: subtitle })] }), _jsx("button", { type: "button", onClick: onMenuToggle, className: "size-9 shrink-0 grid place-items-center rounded-full bg-background/15 hover:bg-background/25", "aria-label": menuOpen ? "Fechar menu admin" : "Abrir menu admin", "aria-expanded": menuOpen, children: _jsx(MoreHorizontal, { className: "size-4" }) })] }));
}
export function AdminTopBarDesktop({ title, subtitle, active, saveFeedback, storeOnline, toggling, onRefresh, onStoreToggle, onLogout, }) {
    return (_jsxs("div", { className: "hidden md:flex items-center justify-between gap-3 w-full min-w-0", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-semibold text-sm truncate", children: title }), _jsx("p", { className: "text-xs opacity-80 truncate", children: subtitle })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2 shrink-0", children: [saveFeedback && _jsx(AdminSaveFeedback, { message: saveFeedback }), _jsx(AdminBarActions, { active: active, storeOnline: storeOnline, toggling: toggling, onRefresh: onRefresh, onStoreToggle: onStoreToggle, onLogout: onLogout })] })] }));
}
export function AdminTopBarMobile({ title, subtitle, active, saveFeedback, menuOpen, onMenuToggle, storeOnline, toggling, onRefresh, onStoreToggle, onLogout, }) {
    return (_jsxs("div", { className: "md:hidden flex flex-col gap-2 w-full", children: [_jsx(AdminTopBarMobileHeader, { title: title, subtitle: subtitle, menuOpen: menuOpen, onMenuToggle: onMenuToggle }), saveFeedback && (_jsxs("span", { role: "status", className: "inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 w-full", children: [_jsx(CheckCircle2, { className: "size-3.5 shrink-0" }), _jsx("span", { className: "truncate", children: saveFeedback })] })), _jsx(AdminMobileQuickActions, { storeOnline: storeOnline, toggling: toggling, onRefresh: onRefresh, onStoreToggle: onStoreToggle }), menuOpen && (_jsx("div", { className: "flex flex-wrap gap-2 w-full pt-2 border-t border-background/10", children: _jsx(AdminBarActions, { active: active, storeOnline: storeOnline, toggling: toggling, onLogout: onLogout, onStoreToggle: onStoreToggle }) }))] }));
}
