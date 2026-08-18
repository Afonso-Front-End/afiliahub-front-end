import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
export function CashbackHowItWorks({ pageContent }) {
    return (_jsxs("section", { className: "bg-surface rounded-3xl p-6 md:p-8 shadow-soft", children: [_jsx("h2", { className: "font-display font-bold text-2xl mb-6", children: pageContent.howItWorksTitle }), _jsx("div", { className: "grid md:grid-cols-3 gap-6", children: pageContent.howItWorks.map((item) => (_jsxs("div", { className: "relative", children: [_jsx("span", { className: "font-display font-extrabold text-4xl text-primary/20", children: item.step }), _jsx("h3", { className: "font-display font-bold text-lg mt-1", children: item.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: item.desc })] }, item.id))) }), _jsxs(Link, { to: "/produtos", className: "mt-8 inline-flex items-center gap-2 bg-gradient-cta text-primary-foreground rounded-2xl px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.01] transition-transform", children: [pageContent.ctaText, _jsx(ArrowRight, { className: "size-4" })] })] }));
}
