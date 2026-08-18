import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { Hero } from "@/components/affiliate/Hero";
import { Categories } from "@/components/affiliate/Categories";
import { FeaturedProducts } from "@/components/affiliate/FeaturedProducts";
import { FlashDeals } from "@/components/affiliate/FlashDeals";
import { CashbackSection } from "@/components/affiliate/CashbackSection";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminSession } from "@/lib/require-admin-session";
import { useSiteContent } from "@/context/site-content-context";
export const Route = createFileRoute("/admin/")({
    ssr: false,
    beforeLoad: async () => {
        return requireAdminSession();
    },
    component: AdminPreviewPage,
});
function AdminPreviewPage() {
    const { refresh } = useSiteContent();
    useEffect(() => {
        void refresh();
    }, [refresh]);
    return (_jsx(AdminShell, { active: "preview", title: "Preview do site", subtitle: "Clique em Editar em cada \u00E1rea para alterar o conte\u00FAdo", onRefresh: () => void refresh(), children: _jsxs(AppLayout, { adminMode: true, children: [_jsx(Hero, { adminEdit: true }), _jsx(AdminSectionOverlay, { sectionId: "categories", label: "Categorias Populares", children: _jsx(Categories, {}) }), _jsx(AdminSectionOverlay, { sectionId: "products-header", label: "Cabe\u00E7alho Produtos", children: _jsx(AdminSectionOverlay, { sectionId: "products", label: "Produtos em Destaque", children: _jsx(FeaturedProducts, {}) }) }), _jsx(AdminSectionOverlay, { sectionId: "flash-deals", label: "Promo\u00E7\u00F5es do Dia", children: _jsx(FlashDeals, {}) }), _jsx(AdminSectionOverlay, { sectionId: "cashback", label: "Cashback & Cupons", children: _jsx(AdminSectionOverlay, { sectionId: "featured-coupons", label: "Cupons em destaque", children: _jsx(CashbackSection, {}) }) })] }) }));
}
