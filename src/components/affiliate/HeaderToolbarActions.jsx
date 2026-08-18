import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Bell, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
function HeaderBadge({ count }) {
    return (_jsx("span", { className: "absolute -top-0.5 -right-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center", children: count }));
}
function HeaderToolbarButton({ onClick, label, expanded, active, children, }) {
    return (_jsx("button", { onClick: onClick, className: cn("relative size-10 sm:size-11 grid place-items-center rounded-2xl transition-colors", active ? "bg-accent text-accent-foreground" : "bg-muted hover:bg-accent"), "aria-label": label, "aria-expanded": expanded, children: children }));
}
export function HeaderActionButtons({ notificationsOpen, onToggleNotifications, favoritesOpen, onToggleFavorites, favoritesCount, unreadNotifications, userInitials, accountHref, }) {
    return (_jsxs("div", { className: "flex items-center gap-1 sm:gap-2 shrink-0", children: [_jsxs(HeaderToolbarButton, { onClick: onToggleNotifications, label: "Notifica\u00E7\u00F5es", expanded: notificationsOpen, children: [_jsx(Bell, { className: "size-4" }), unreadNotifications > 0 && _jsx(HeaderBadge, { count: unreadNotifications })] }), _jsxs(HeaderToolbarButton, { onClick: onToggleFavorites, label: "Favoritos", expanded: favoritesOpen, active: favoritesOpen, children: [_jsx(Heart, { className: cn("size-4", favoritesCount > 0 && "fill-primary text-primary") }), favoritesCount > 0 && _jsx(HeaderBadge, { count: favoritesCount })] }), _jsx(Link, { to: accountHref, className: "size-10 sm:size-11 shrink-0 rounded-2xl bg-gradient-cta grid place-items-center text-primary-foreground font-bold text-xs sm:text-sm shadow-glow hover:scale-105 transition-transform", "aria-label": "Minha conta", children: userInitials })] }));
}
