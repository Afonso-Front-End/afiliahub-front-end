import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClientProvider } from "@tanstack/react-query";
import { siteContentQueryOptions } from "@/lib/site-content-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AdminReturnBar } from "../components/admin/AdminReturnBar";
import { StoreOfflineBanner } from "../components/admin/StoreOfflineBanner";
import { StorePublicGate } from "../components/StorePublicGate";
import { MarketplaceProvider } from "../context/marketplace-context";
import { SiteContentProvider } from "../context/site-content-context";
import { UserAuthProvider } from "../context/user-auth-context";
function NotFoundComponent() {
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: _jsxs("div", { className: "max-w-md text-center", children: [_jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }), _jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }), _jsx("div", { className: "mt-6", children: _jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90", children: "Go home" }) })] }) }));
}
function ErrorComponent({ error, reset }) {
    console.error(error);
    const router = useRouter();
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: _jsxs("div", { className: "max-w-md text-center", children: [_jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }), _jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [_jsx("button", { onClick: () => {
                                router.invalidate();
                                reset();
                            }, className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90", children: "Try again" }), _jsx("a", { href: "/", className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent", children: "Go home" })] })] }) }));
}
export const Route = createRootRouteWithContext()({
    beforeLoad: async ({ context: { queryClient } }) => {
        await queryClient.ensureQueryData(siteContentQueryOptions);
    },
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "AfiliaHub | Marketplace de Afiliados" },
            {
                name: "description",
                content: "Encontre as melhores ofertas da Shopee, Amazon, Mercado Livre, AliExpress e Magalu.",
            },
            { property: "og:title", content: "AfiliaHub | Marketplace de Afiliados" },
            {
                property: "og:description",
                content: "As melhores promoções dos maiores marketplaces em um só lugar.",
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
            },
        ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
});
function RootShell({ children }) {
    return (_jsxs("html", { lang: "pt-BR", suppressHydrationWarning: true, children: [_jsx("head", { children: _jsx(HeadContent, {}) }), _jsxs("body", { suppressHydrationWarning: true, children: [children, _jsx(Scripts, {})] })] }));
}
function RootComponent() {
    const { queryClient } = Route.useRouteContext();
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(SiteContentProvider, { children: _jsx(UserAuthProvider, { children: _jsxs(MarketplaceProvider, { children: [_jsx(AdminReturnBar, {}), _jsx(StoreOfflineBanner, {}), _jsx(StorePublicGate, { children: _jsx(Outlet, {}) })] }) }) }) }));
}
