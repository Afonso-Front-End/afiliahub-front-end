import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
export function MarketplaceToasts({ toasts }) {
    return (_jsx("div", { className: "fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[100] flex flex-col gap-2 pointer-events-none items-stretch sm:items-end", children: toasts.map((toast) => (_jsx("div", { className: "pointer-events-auto bg-foreground text-background text-sm font-medium px-4 py-3 rounded-2xl shadow-card max-w-full sm:max-w-sm", children: toast.message }, toast.id))) }));
}
export function NotificationsPanel({ items, onClose, onRead, }) {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: onClose }), _jsxs("div", { className: "fixed inset-x-4 bottom-4 top-auto z-50 max-h-[70vh] overflow-y-auto bg-surface rounded-2xl shadow-card p-4 border border-border sm:inset-x-auto sm:bottom-auto sm:top-20 sm:right-6 sm:w-80 sm:max-h-none", children: [_jsxs("div", { className: "flex items-center justify-between mb-3 gap-2", children: [_jsx("h3", { className: "font-semibold text-sm", children: "Notifica\u00E7\u00F5es" }), _jsx("button", { onClick: () => {
                                    onRead();
                                    onClose();
                                }, className: "text-xs text-primary font-semibold", children: "Marcar como lidas" })] }), _jsx("ul", { className: "space-y-2", children: items.map((item) => (_jsx("li", { className: "text-sm text-muted-foreground bg-muted rounded-xl px-3 py-2", children: item }, item))) })] })] }));
}
export function FavoritesPanel({ favorites, products, onClose, }) {
    const items = products.filter((product) => favorites.has(product.id));
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: onClose }), _jsxs("div", { className: "fixed inset-x-4 bottom-4 top-auto z-50 max-h-[70vh] overflow-y-auto bg-surface rounded-2xl shadow-card p-4 border border-border sm:inset-x-auto sm:bottom-auto sm:top-20 sm:right-6 sm:w-80 sm:max-h-96", children: [_jsxs("h3", { className: "font-semibold text-sm mb-3", children: ["Favoritos (", items.length, ")"] }), items.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum produto favoritado ainda." })) : (_jsx("ul", { className: "space-y-2", children: items.map((product) => (_jsx("li", { children: _jsxs(Link, { to: "/produto/$productId", params: { productId: product.id }, onClick: onClose, className: "block w-full text-left text-sm bg-muted rounded-xl px-3 py-2 hover:bg-accent transition-colors", children: [_jsx("span", { className: "font-medium line-clamp-1", children: product.name }), _jsxs("span", { className: "text-xs text-primary block mt-0.5", children: ["R$ ", product.price.toFixed(2).replace(".", ","), " (", product.store, ")"] })] }) }, product.id))) }))] })] }));
}
