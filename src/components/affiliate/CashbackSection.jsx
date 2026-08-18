import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Wallet, TicketPercent, TrendingUp, ArrowRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import { openTrackedAffiliateUrl } from "@/lib/affiliate-link";
import { backgroundStyle } from "@/lib/background-style";
const CARD_ICONS = [Wallet, TicketPercent, TrendingUp];
function CashbackCardsGrid({ section }) {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: section.cards.map((card, i) => {
            const Icon = CARD_ICONS[i] ?? Wallet;
            return (_jsxs(Link, { to: card.href, className: "rounded-3xl p-6 group hover:-translate-y-1 transition-transform block", style: backgroundStyle(card.background), children: [_jsx("div", { className: "size-12 rounded-2xl bg-surface/80 backdrop-blur grid place-items-center mb-4", children: _jsx(Icon, { className: "size-5 text-primary" }) }), _jsx("h3", { className: "font-display font-bold text-lg", children: card.title }), _jsx("p", { className: "text-sm text-foreground/70 mt-1.5", children: card.desc }), _jsxs("span", { className: "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary", children: [card.buttonText || "Explorar", " ", _jsx(ArrowRight, { className: "size-3.5 group-hover:translate-x-0.5 transition-transform" })] })] }, card.id));
        }) }));
}
function CashbackCouponsStrip({ coupons, onCouponClick, }) {
    return (_jsxs("div", { className: "bg-surface rounded-3xl p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [_jsx("div", { className: "size-9 rounded-xl bg-gradient-cta grid place-items-center", children: _jsx(Zap, { className: "size-4 text-primary-foreground", fill: "currentColor" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold", children: coupons.title }), _jsx("p", { className: "text-[10px] text-muted-foreground", children: coupons.subtitle })] })] }), _jsx("div", { className: "flex flex-wrap gap-2 flex-1 min-w-0", children: coupons.items.map((c) => (_jsxs("button", { onClick: () => onCouponClick(c), className: "inline-flex items-center gap-2 bg-muted hover:bg-accent rounded-full px-3 py-1.5 text-xs font-semibold transition-colors", children: [_jsx("span", { className: "text-primary font-mono", children: c.code }), _jsxs("span", { className: "text-muted-foreground", children: ["\u00B7 ", c.discount] })] }, c.id))) }), _jsx(Link, { to: coupons.linkHref, className: "text-xs font-semibold text-primary hover:underline w-full sm:w-auto text-center sm:text-left shrink-0", children: coupons.linkText })] }));
}
export function CashbackSection() {
    const { notify } = useMarketplace();
    const { content } = useSiteContent();
    const section = content.cashback;
    const coupons = content["featured-coupons"];
    return (_jsxs("section", { id: "cashback", className: "mt-10 scroll-mt-28", children: [_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-5", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl", children: section.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: section.subtitle })] }), _jsxs(Link, { to: "/cashback", className: "inline-flex items-center gap-1.5 text-sm font-semibold bg-surface px-4 py-2 rounded-full shadow-soft hover:shadow-card transition-shadow", children: [section.buttonText, _jsx(ArrowRight, { className: "size-3.5" })] })] }), _jsx(CashbackCardsGrid, { section: section }), _jsx(CashbackCouponsStrip, { coupons: coupons, onCouponClick: (coupon) => {
                    const url = coupon.affiliateUrl?.trim();
                    if (url) {
                        void openTrackedAffiliateUrl({
                            storeName: "Marketplace",
                            productName: `Cupom ${coupon.code}`,
                            url,
                        }, notify);
                        return;
                    }
                    notify(`Cupom ${coupon.code}: acesse a página Cupons para copiar`);
                } })] }));
}
