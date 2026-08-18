import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HERO_COUPON_IMAGE, HERO_MAIN_IMAGE } from "@/data/cms-fallback-images";
import { backgroundStyle } from "@/lib/background-style";
import { resolveHeroCouponProductId } from "@/lib/hero-coupon";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";
export function HeroMainCard({ main, onCta, }) {
    const mainImage = main.imageUrl || HERO_MAIN_IMAGE;
    return (_jsxs("div", { className: "relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col gap-4 lg:gap-0 lg:min-h-[340px] lg:col-span-2", style: backgroundStyle(main.background), children: [_jsxs("div", { className: "relative z-10 w-full lg:max-w-[55%] flex flex-col justify-center", children: [_jsxs("span", { className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold bg-surface/70 backdrop-blur px-3 py-1.5 rounded-full text-primary", children: [_jsx("span", { className: "size-1.5 rounded-full bg-primary animate-pulse" }), main.badge] }), _jsx("h1", { className: "mt-3 sm:mt-4 font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-foreground", children: main.title }), _jsx("p", { className: "mt-3 text-sm md:text-base text-foreground/70 max-w-sm", children: main.description.replace("{highlight}", main.highlight).split(main.highlight).map((part, i, arr) => i < arr.length - 1 ? (_jsxs("span", { children: [part, _jsx("span", { className: "font-bold text-primary", children: main.highlight })] }, i)) : (_jsx("span", { children: part }, i))) }), _jsxs("button", { onClick: onCta, className: "mt-6 inline-flex w-fit items-center gap-2 bg-gradient-cta text-primary-foreground rounded-full px-6 py-3 text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform", children: [main.buttonText, _jsx(ArrowRight, { className: "size-4" })] })] }), _jsx("img", { src: mainImage, alt: main.title, width: 1024, height: 768, className: "relative z-0 w-full max-w-[280px] sm:max-w-[320px] mx-auto object-contain drop-shadow-2xl lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%] lg:max-w-[480px] lg:mx-0" })] }));
}
export function HeroCashbackCard({ cashback }) {
    return (_jsxs("div", { className: "relative overflow-hidden rounded-3xl p-6 flex-1 min-h-[160px]", style: backgroundStyle(cashback.background), children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-foreground/60", children: cashback.label }), _jsx("h3", { className: "mt-1 font-display font-bold text-xl md:text-2xl leading-tight", children: cashback.title }), cashback.subtitle && (_jsx("p", { className: "text-xs text-foreground/60 mt-1", children: cashback.subtitle })), _jsxs(Link, { to: cashback.buttonLink, className: "mt-3 text-xs font-semibold inline-flex items-center gap-1 text-primary hover:underline", children: [cashback.buttonText, " ", _jsx(ArrowRight, { className: "size-3" })] })] }));
}
export function HeroCouponCard({ coupon }) {
    const couponImage = coupon.imageUrl || HERO_COUPON_IMAGE;
    return (_jsxs("div", { className: "relative overflow-hidden rounded-3xl p-6 flex-1 min-h-[160px] flex items-center", style: backgroundStyle(coupon.background), children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-foreground/60", children: coupon.label }), _jsx("h3", { className: "mt-1 font-display font-bold text-lg leading-tight", children: coupon.title }), _jsx(Link, { to: "/produto/$productId", params: { productId: resolveHeroCouponProductId(coupon) }, className: "mt-3 inline-flex items-center gap-1.5 bg-foreground text-background rounded-full px-4 py-2 text-xs font-semibold hover:bg-primary transition-colors", children: coupon.buttonText })] }), _jsx("img", { src: couponImage, alt: coupon.title, loading: "lazy", width: 512, height: 512, className: "w-24 h-24 object-contain" })] }));
}
export function wrapHeroAdmin(adminEdit, sectionId, label, children, className) {
    if (!adminEdit)
        return children;
    return (_jsx(AdminSectionOverlay, { sectionId: sectionId, label: label, className: className, children: children }));
}
