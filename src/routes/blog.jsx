import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { StaticPage } from "@/components/affiliate/StaticPage";
import { ArrowRight } from "lucide-react";
const POSTS = [
    {
        slug: "como-aumentar-conversao-afiliados",
        title: "5 estratégias para aumentar conversão como afiliado",
        date: "2 jun 2026",
        excerpt: "Aprenda a escolher produtos, criar urgência e usar cupons de forma inteligente.",
        tag: "Afiliados",
    },
    {
        slug: "cashback-shopee-guia",
        title: "Guia completo de cashback na Shopee em 2026",
        date: "28 mai 2026",
        excerpt: "Tudo o que você precisa saber para ativar cashback e maximizar retorno.",
        tag: "Cashback",
    },
    {
        slug: "tendencias-marketplace",
        title: "Tendências dos marketplaces para o segundo semestre",
        date: "15 mai 2026",
        excerpt: "Eletrônicos, moda e casa: o que está vendendo mais entre afiliados premium.",
        tag: "Mercado",
    },
];
export const Route = createFileRoute("/blog")({
    head: () => ({
        meta: [
            { title: "Blog | AfiliaHub" },
            { name: "description", content: "Dicas, tendências e estratégias para afiliados." },
        ],
    }),
    component: BlogPage,
});
function BlogPage() {
    return (_jsx(AppLayout, { children: _jsx(StaticPage, { title: "Blog", description: "Conte\u00FAdos sobre afiliados, cashback, cupons e tend\u00EAncias de e-commerce.", children: _jsx("div", { className: "not-prose space-y-4", children: POSTS.map((post) => (_jsxs("article", { className: "bg-muted rounded-2xl p-5 hover:bg-accent/50 transition-colors group", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-2", children: [_jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full", children: post.tag }), _jsx("span", { className: "text-xs text-muted-foreground", children: post.date })] }), _jsx("h2", { className: "font-display font-bold text-lg", children: post.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: post.excerpt }), _jsxs(Link, { to: "/", className: "inline-flex items-center gap-1 text-sm font-semibold text-primary mt-3 group-hover:gap-2 transition-all", children: ["Ler artigo ", _jsx(ArrowRight, { className: "size-3.5" })] })] }, post.slug))) }) }) }));
}
