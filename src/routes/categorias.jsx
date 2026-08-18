import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { CategoryGrid } from "@/components/affiliate/CategoryGrid";
import { useSiteContent } from "@/context/site-content-context";
import { fetchSiteContent } from "@/api/cms";
export const Route = createFileRoute("/categorias")({
    loader: async () => {
        const { content } = await fetchSiteContent();
        return { section: content.categories };
    },
    head: ({ loaderData }) => ({
        meta: [
            { title: "Todas as Categorias | AfiliaHub" },
            {
                name: "description",
                content: loaderData?.section.subtitle ??
                    "Explore todas as categorias e encontre os melhores produtos nos maiores marketplaces.",
            },
        ],
    }),
    component: CategoriasPage,
});
function CategoriasPage() {
    const { section: loaderSection } = Route.useLoaderData();
    const { content } = useSiteContent();
    const section = content.categories ?? loaderSection;
    const visibleCount = section.items.filter((c) => c.active !== false).length;
    return (_jsx(AppLayout, { children: _jsxs("article", { className: "space-y-8", children: [_jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors", children: [_jsx(ArrowLeft, { className: "size-4" }), "Voltar ao in\u00EDcio"] }), _jsx("section", { className: "rounded-3xl bg-surface border border-border p-6 md:p-8 shadow-soft", children: _jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold bg-muted px-3 py-1.5 rounded-full", children: [_jsx(LayoutGrid, { className: "size-3.5 text-primary" }), "Cat\u00E1logo completo"] }), _jsx("h1", { className: "mt-3 font-display font-extrabold text-3xl md:text-4xl tracking-tight", children: section.title }), _jsx("p", { className: "mt-2 text-sm md:text-base text-muted-foreground max-w-2xl", children: section.subtitle }), _jsxs("p", { className: "mt-3 text-xs font-semibold text-muted-foreground", children: [visibleCount, " categoria(s) dispon\u00EDvel(is)"] })] }), _jsxs(Link, { to: "/produtos", className: "inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-cta text-primary-foreground rounded-full px-4 py-2 shadow-glow hover:scale-[1.02] transition-transform", children: ["Ver todos os produtos", _jsx(ArrowRight, { className: "size-3.5" })] })] }) }), _jsx("section", { children: _jsx(CategoryGrid, { items: section.items, variant: "page" }) })] }) }));
}
