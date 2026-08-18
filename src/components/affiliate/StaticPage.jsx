import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
export function StaticPage({ title, description, children, }) {
    return (_jsxs("article", { className: "bg-surface rounded-3xl p-6 md:p-10 shadow-soft", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6", children: [_jsx(ArrowLeft, { className: "size-4" }), "Voltar ao in\u00EDcio"] }), _jsxs("header", { className: "mb-8", children: [_jsx("h1", { className: "font-display font-extrabold text-3xl md:text-4xl tracking-tight", children: title }), description && (_jsx("p", { className: "text-muted-foreground mt-2 max-w-2xl", children: description }))] }), _jsx("div", { className: "prose prose-sm max-w-none text-foreground/90 space-y-4 [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1", children: children })] }));
}
