import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
import { SidebarPromoCard } from "@/components/affiliate/SidebarPromoCard";
import { SidebarBrand, SidebarCategoryNav } from "@/components/affiliate/SidebarSections";
import { ADMIN_STICKY_TOP_CLASS } from "@/lib/admin-layout";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";
export function Sidebar({ className, onNavigate, adminEdit, }) {
    const { category, setCategory, scrollTo, notify } = useMarketplace();
    const { content } = useSiteContent();
    const promo = content["sidebar-promo"];
    const selectCategory = (name) => {
        const next = category === name ? null : name;
        setCategory(next);
        scrollTo("produtos");
        notify(next ? `Filtrando por ${name}` : "Mostrando todas as categorias");
        onNavigate?.();
    };
    return (_jsxs("aside", { className: cn("flex flex-col gap-6 bg-background rounded-3xl p-6 h-fit sticky", adminEdit ? ADMIN_STICKY_TOP_CLASS : "top-6", className), children: [_jsx(SidebarBrand, { onClick: () => {
                    setCategory(null);
                    scrollTo("produtos");
                    notify("Bem-vindo ao AfiliaHub!");
                } }), _jsx(SidebarCategoryNav, { category: category, onSelectCategory: selectCategory, onNavigate: onNavigate }), adminEdit ? (_jsx(AdminSectionOverlay, { sectionId: "sidebar-promo", label: "Promo Sidebar", className: "mt-auto", children: _jsx(SidebarPromoCard, { promo: promo }) })) : (_jsx(SidebarPromoCard, { promo: promo, className: "mt-auto" }))] }));
}
