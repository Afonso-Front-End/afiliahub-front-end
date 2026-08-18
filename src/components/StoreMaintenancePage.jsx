import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
export function StoreMaintenancePage() {
    return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md text-center space-y-4", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "AfiliaHub" }), _jsx("h1", { className: "font-display font-bold text-3xl", children: "Loja temporariamente offline" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Estamos a preparar novidades. Volte em breve ou entre em contacto connosco se precisar de ajuda." }), _jsx(Link, { to: "/admin/login", className: "inline-flex rounded-2xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors", children: "\u00C1rea de administrador" })] }) }));
}
