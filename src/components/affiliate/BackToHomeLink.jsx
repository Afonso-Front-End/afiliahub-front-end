import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
export function BackToHomeLink() {
    return (_jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors", children: [_jsx(ArrowLeft, { className: "size-4" }), "Voltar ao in\u00EDcio"] }));
}
