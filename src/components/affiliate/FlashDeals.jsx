import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Zap, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSiteContent } from "@/context/site-content-context";
import { backgroundStyle } from "@/lib/background-style";
import { getFlashDealImageClass } from "@/lib/flash-deal-image-class";
import { resolveFlashDealImage } from "@/lib/flash-deal-resolve";
function formatCountdown(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}
function useCountdown(secs) {
    const [t, setT] = useState(null);
    useEffect(() => {
        setT(secs);
        const i = setInterval(() => setT((v) => (v != null && v > 0 ? v - 1 : 0)), 1000);
        return () => clearInterval(i);
    }, [secs]);
    return t == null ? formatCountdown(secs) : formatCountdown(t);
}
function FlashDealsHeader({ section, time, }) {
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "size-11 rounded-2xl bg-primary-foreground/20 backdrop-blur grid place-items-center", children: _jsx(Zap, { className: "size-5 text-primary-foreground", fill: "currentColor" }) }), _jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-xl md:text-2xl text-primary-foreground", children: section.title }), _jsx("p", { className: "text-xs text-primary-foreground/80", children: section.subtitle })] })] }), _jsxs("div", { className: "flex items-center gap-2 bg-primary-foreground/15 backdrop-blur px-4 py-2 rounded-full text-primary-foreground", children: [_jsx(Clock, { className: "size-4" }), _jsx("span", { className: "font-mono font-bold tabular-nums", children: time })] })] }));
}
function FlashDealCard({ deal, products, }) {
    const linkedProduct = products.find((p) => p.id === deal.productId);
    const image = resolveFlashDealImage(deal, linkedProduct);
    return (_jsxs(Link, { to: "/produto/$productId", params: { productId: deal.productId }, search: { deal: deal.id }, className: "rounded-2xl p-3 hover:-translate-y-1 transition-transform text-left block", style: backgroundStyle(deal.background), children: [_jsxs("div", { className: "relative aspect-square rounded-xl bg-surface-soft overflow-hidden flex items-center justify-center", children: [_jsxs("span", { className: "absolute top-2 left-2 z-10 text-[10px] font-bold bg-foreground text-background px-2 py-0.5 rounded-full", children: [deal.discount, "% OFF"] }), _jsx("img", { src: image, alt: deal.name, loading: "lazy", width: 512, height: 512, className: getFlashDealImageClass(image) })] }), _jsx("p", { className: "font-semibold text-xs mt-2 line-clamp-1", children: deal.name }), _jsxs("div", { className: "mt-1 min-w-0", children: [_jsxs("p", { className: "font-bold text-sm text-primary whitespace-nowrap tabular-nums leading-tight", children: ["R$\u00A0", deal.price.toFixed(2).replace(".", ",")] }), _jsxs("p", { className: "text-[10px] text-muted-foreground line-through whitespace-nowrap tabular-nums", children: ["R$\u00A0", deal.old.toFixed(2).replace(".", ",")] })] })] }));
}
export function FlashDeals() {
    const { content } = useSiteContent();
    const section = content["flash-deals"];
    const products = content.products.items;
    const time = useCountdown(section.countdownSeconds);
    return (_jsx("section", { id: "promocoes", className: "mt-10 scroll-mt-28", children: _jsxs("div", { className: "rounded-3xl p-6 md:p-8 shadow-glow", style: backgroundStyle(section.background), children: [_jsx(FlashDealsHeader, { section: section, time: time }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: section.items.map((d) => (_jsx(FlashDealCard, { deal: d, products: products }, d.id))) })] }) }));
}
