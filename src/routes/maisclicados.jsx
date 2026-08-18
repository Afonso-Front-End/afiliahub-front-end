import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { MaisClicadosRow } from "@/components/affiliate/MaisClicadosRow";
import { PageListHeader } from "@/components/affiliate/PageListHeader";
import { PageHero } from "@/components/affiliate/PageHero";
import { AdminPageEditOverlay } from "@/components/admin/AdminPageEditOverlay";
import { useSiteContent } from "@/context/site-content-context";
import { fetchSiteContent } from "@/api/cms";
import { fetchTopClicks } from "@/api/stats";
import { useMaisClicadosRanking } from "@/hooks/use-maisclicados-ranking";
import { useMarketplace } from "@/context/marketplace-context";
import { buildMaisClicadosHero } from "@/lib/maisclicados-hero";
export const Route = createFileRoute("/maisclicados")({
    loader: async () => {
        const [{ content }, clickSummary] = await Promise.all([fetchSiteContent(), fetchTopClicks()]);
        return {
            page: content["page-maisclicados"],
            products: content.products.items,
            clickSummary,
        };
    },
    head: ({ loaderData }) => ({
        meta: [
            { title: loaderData?.page.metaTitle ?? "Mais Clicados | AfiliaHub" },
            {
                name: "description",
                content: loaderData?.page.metaDescription ??
                    "Ranking dos produtos com mais cliques reais no AfiliaHub.",
            },
        ],
    }),
    component: MaisClicadosPage,
});
function MaisClicadosPage() {
    const { page, products: loaderProducts, clickSummary } = Route.useLoaderData();
    const { content } = useSiteContent();
    const navigate = useNavigate();
    const { openOffer } = useMarketplace();
    const pageContent = content["page-maisclicados"] ?? page;
    const cmsProducts = content.products.items.length ? content.products.items : loaderProducts;
    const hero = buildMaisClicadosHero(pageContent.hero, clickSummary);
    const { filtroLoja, setFiltroLoja, lojas, filtrado } = useMaisClicadosRanking(cmsProducts, clickSummary);
    return (_jsx(AppLayout, { children: _jsxs("article", { className: "space-y-8", children: [_jsx(BackToHomeLink, {}), _jsx(AdminPageEditOverlay, { sectionId: "page-maisclicados", label: "P\u00E1gina Mais Clicados", children: _jsx(PageHero, { hero: hero }) }), _jsxs("section", { children: [_jsx(PageListHeader, { icon: TrendingUp, title: pageContent.listTitle, subtitle: pageContent.listSubtitle, filters: lojas, activeFilter: filtroLoja, onFilterChange: setFiltroLoja }), filtrado.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground rounded-3xl bg-surface p-6 shadow-soft", children: "Ainda n\u00E3o h\u00E1 produtos ativos para mostrar no ranking." })) : (_jsx("div", { className: "space-y-3", children: filtrado.map((item) => (_jsx(MaisClicadosRow, { item: item, content: content, onClick: () => navigate({ to: "/produto/$productId", params: { productId: item.productId } }), onBuy: () => openOffer(item.product) }, item.id))) }))] })] }) }));
}
