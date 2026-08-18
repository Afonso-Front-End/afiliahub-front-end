import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Wallet, TicketPercent, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { backgroundStyle } from "@/lib/background-style";
const CARD_ICONS = [Wallet, TicketPercent, TrendingUp];
export function EconomizeCards({ section }) {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: section.cards.map((card, i) => {
            const Icon = CARD_ICONS[i] ?? Wallet;
            return (_jsxs(Link, { to: card.href, className: "rounded-3xl p-6 group hover:-translate-y-1 transition-transform block shadow-soft", style: backgroundStyle(card.background), children: [_jsx("div", { className: "size-12 rounded-2xl bg-surface/80 backdrop-blur grid place-items-center mb-4", children: _jsx(Icon, { className: "size-5 text-primary" }) }), _jsx("h3", { className: "font-display font-bold text-lg", children: card.title }), _jsx("p", { className: "text-sm text-foreground/70 mt-1.5", children: card.desc }), _jsxs("span", { className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary", children: [card.buttonText || "Explorar", " ", _jsx(ArrowRight, { className: "size-3.5 group-hover:translate-x-0.5 transition-transform" })] })] }, card.id));
        }) }));
}
