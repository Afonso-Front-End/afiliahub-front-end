import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Zap, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { FooterLinkColumn } from "@/components/affiliate/FooterLinkColumn";
import { useMarketplace } from "@/context/marketplace-context";
import { useSiteContent } from "@/context/site-content-context";
const SOCIAL = [
    { Icon: Instagram, name: "Instagram", url: "https://instagram.com" },
    { Icon: Twitter, name: "Twitter", url: "https://twitter.com" },
    { Icon: Facebook, name: "Facebook", url: "https://facebook.com" },
    { Icon: Youtube, name: "YouTube", url: "https://youtube.com" },
];
const LOJA_LINKS = [
    { label: "Todos os produtos", to: "/produtos" },
    { label: "Todas as categorias", to: "/categorias" },
];
const EMPRESA_LINKS = [
    { label: "Sobre", to: "/sobre" },
    { label: "Cashback & Cupons", to: "/cashback" },
    { label: "Contato", to: "/contato" },
    { label: "Blog", to: "/blog" },
];
const LEGAL_LINKS = [
    { label: "Termos", to: "/termos" },
    { label: "Privacidade", to: "/privacidade" },
    { label: "Cookies", to: "/cookies" },
];
export function Footer() {
    const { notify } = useMarketplace();
    const { content } = useSiteContent();
    const footer = content.footer;
    return (_jsxs("footer", { className: "mt-8 sm:mt-12 bg-surface rounded-3xl p-5 sm:p-8 shadow-soft", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8", children: [_jsxs("div", { className: "sm:col-span-2", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2.5 w-fit hover:opacity-80 transition-opacity", children: [_jsx("div", { className: "size-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow", children: _jsx(Zap, { className: "size-5 text-primary-foreground", fill: "currentColor" }) }), _jsx("p", { className: "font-display font-extrabold text-lg", children: "AfiliaHub" })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-3 max-w-sm", children: footer.description }), _jsx("div", { className: "flex gap-2 mt-4", children: SOCIAL.map(({ Icon, name, url }) => (_jsx("button", { onClick: () => {
                                        window.open(url, "_blank", "noopener,noreferrer");
                                        notify(`Abrindo ${name}…`);
                                    }, className: "size-10 grid place-items-center rounded-2xl bg-muted hover:bg-accent transition-colors", "aria-label": name, children: _jsx(Icon, { className: "size-4" }) }, name))) })] }), _jsx(FooterLinkColumn, { title: "Loja", links: LOJA_LINKS }), _jsx(FooterLinkColumn, { title: "Empresa", links: EMPRESA_LINKS }), _jsx(FooterLinkColumn, { title: "Legal", links: LEGAL_LINKS })] }), _jsxs("div", { className: "mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2", children: [_jsx("p", { children: footer.copyright }), _jsx("p", { children: footer.tagline })] })] }));
}
