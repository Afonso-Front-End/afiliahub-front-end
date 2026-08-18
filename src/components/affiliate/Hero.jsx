import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import { HeroCashbackCard, HeroCouponCard, HeroMainCard, wrapHeroAdmin, } from "@/components/affiliate/HeroCards";
export function Hero({ adminEdit }) {
    const { scrollTo } = useMarketplace();
    const { content } = useSiteContent();
    const main = content["hero-main"];
    const cashback = content["hero-cashback"];
    const coupon = content["hero-coupon"];
    return (_jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [wrapHeroAdmin(adminEdit, "hero-main", "Hero principal", _jsx(HeroMainCard, { main: main, onCta: () => scrollTo(main.buttonTarget) }), "lg:col-span-2"), _jsxs("div", { className: "flex flex-col gap-4", children: [wrapHeroAdmin(adminEdit, "hero-cashback", "Card Em Alta", _jsx(HeroCashbackCard, { cashback: cashback })), wrapHeroAdmin(adminEdit, "hero-coupon", "Card Cupom", _jsx(HeroCouponCard, { coupon: coupon }))] })] }));
}
