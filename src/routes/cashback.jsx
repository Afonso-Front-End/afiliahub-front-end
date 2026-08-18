import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { BackToHomeLink } from "@/components/affiliate/BackToHomeLink";
import { CashbackHowItWorks } from "@/components/affiliate/CashbackSections";
import { EconomizeCards } from "@/components/affiliate/EconomizeCards";
import { PageHero } from "@/components/affiliate/PageHero";
import { AdminPageEditOverlay } from "@/components/admin/AdminPageEditOverlay";
import { useSiteContent } from "@/context/site-content-context";
import { fetchSiteContent } from "@/api/cms";
export const Route = createFileRoute("/cashback")({
    loader: async () => {
        const { content } = await fetchSiteContent();
        return { page: content["page-cashback"], highlights: content.cashback };
    },
    head: ({ loaderData }) => ({
        meta: [
            { title: loaderData?.page.metaTitle ?? "Como Economizar | AfiliaHub" },
            {
                name: "description",
                content: loaderData?.page.metaDescription ??
                    "Cupons, promoções e dicas para comprar melhor nos maiores marketplaces.",
            },
        ],
    }),
    component: EconomizePage,
});
function EconomizePage() {
    const { page, highlights } = Route.useLoaderData();
    const { content } = useSiteContent();
    const pageContent = content["page-cashback"] ?? page;
    const highlightCards = content.cashback ?? highlights;
    return (_jsx(AppLayout, { children: _jsxs("article", { className: "space-y-8", children: [_jsx(BackToHomeLink, {}), _jsx(AdminPageEditOverlay, { sectionId: "page-cashback", label: "P\u00E1gina Como Economizar", children: _jsx(PageHero, { hero: pageContent.hero }) }), _jsxs("section", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-2xl md:text-3xl", children: highlightCards.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: highlightCards.subtitle })] }), _jsx(EconomizeCards, { section: highlightCards })] }), _jsx(CashbackHowItWorks, { pageContent: pageContent })] }) }));
}
