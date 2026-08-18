import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { backgroundStyle } from "@/lib/background-style";
import { cn } from "@/lib/utils";
export function SidebarPromoCard({ promo, className, }) {
    return (_jsxs("div", { className: cn("rounded-2xl p-4", className), style: backgroundStyle(promo.background), children: [_jsx("p", { className: "text-xs font-semibold text-accent-foreground/80", children: promo.label }), _jsx("p", { className: "text-sm font-bold mt-1 text-foreground", children: promo.title }), _jsx(Link, { to: promo.linkHref, className: "mt-3 text-xs font-semibold text-primary hover:underline inline-block", children: promo.linkText })] }));
}
