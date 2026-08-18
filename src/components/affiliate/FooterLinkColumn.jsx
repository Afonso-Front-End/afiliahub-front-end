import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
export function FooterLinkColumn({ title, links, }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-sm mb-3", children: title }), _jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: links.map((link) => (_jsx("li", { children: _jsx(Link, { to: link.to, className: "hover:text-foreground transition-colors", children: link.label }) }, link.label))) })] }));
}
