import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Menu } from "lucide-react";
import { FilterPill } from "@/components/affiliate/FilterPill";
import { HeaderActionButtons } from "@/components/affiliate/HeaderToolbarActions";
import { PRODUCT_SORT_OPTIONS } from "@/lib/sort-options";
import { cn } from "@/lib/utils";
function HeaderSearchBar({ search, onSearchChange, onSearchSubmit, }) {
    return (_jsxs("form", { className: "flex-1 min-w-0 flex items-center gap-2 bg-muted rounded-2xl px-3 sm:px-4 h-10 sm:h-11", onSubmit: (e) => {
            e.preventDefault();
            onSearchSubmit();
        }, children: [_jsx(Search, { className: "size-4 text-muted-foreground shrink-0" }), _jsx("input", { type: "search", value: search, onChange: (e) => onSearchChange(e.target.value), placeholder: "Buscar produtos...", className: "flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-muted-foreground" })] }));
}
export function HeaderToolbar({ onMenu, search, onSearchChange, onSearchSubmit, filtersOpen, onToggleFilters, notificationsOpen, onToggleNotifications, favoritesOpen, onToggleFavorites, favoritesCount, unreadNotifications, userInitials, accountHref, }) {
    return (_jsxs("header", { className: "flex items-center gap-2 sm:gap-3 bg-surface rounded-3xl p-2.5 sm:p-3 shadow-soft", children: [_jsx("button", { onClick: onMenu, className: "lg:hidden size-10 sm:size-11 shrink-0 grid place-items-center rounded-2xl bg-muted text-foreground", "aria-label": "Abrir menu", children: _jsx(Menu, { className: "size-5" }) }), _jsx(HeaderSearchBar, { search: search, onSearchChange: onSearchChange, onSearchSubmit: onSearchSubmit }), _jsx("button", { onClick: onToggleFilters, className: cn("size-10 sm:size-11 shrink-0 grid place-items-center rounded-2xl transition-colors", filtersOpen ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-accent"), "aria-label": "Filtros", "aria-expanded": filtersOpen, children: _jsx(SlidersHorizontal, { className: "size-4" }) }), _jsx(HeaderActionButtons, { notificationsOpen: notificationsOpen, onToggleNotifications: onToggleNotifications, favoritesOpen: favoritesOpen, onToggleFavorites: onToggleFavorites, favoritesCount: favoritesCount, unreadNotifications: unreadNotifications, userInitials: userInitials, accountHref: accountHref })] }));
}
export function HeaderFiltersPanel({ adminMode, storeFilters, storeFilter, onStoreFilterChange, sort, onSortChange, }) {
    return (_jsxs("div", { className: "bg-surface rounded-3xl p-3 shadow-soft flex flex-wrap gap-2 items-center max-h-[45vh] overflow-y-auto overscroll-contain", children: [_jsx("span", { className: "text-xs font-semibold text-muted-foreground mr-1 w-full sm:w-auto", children: "Loja:" }), adminMode && (_jsx(Link, { to: "/admin/edit/$section", params: { section: "stores" }, className: "px-3 py-1.5 rounded-full text-xs font-semibold bg-foreground text-background hover:bg-primary transition-colors", children: "Editar lojas" })), storeFilters.map((filter) => (_jsx(FilterPill, { label: filter, active: storeFilter === filter, onClick: () => onStoreFilterChange(filter) }, filter))), _jsx("span", { className: "text-xs font-semibold text-muted-foreground mx-1 hidden sm:inline", children: "|" }), _jsx("span", { className: "text-xs font-semibold text-muted-foreground mr-1 w-full sm:w-auto", children: "Ordenar:" }), PRODUCT_SORT_OPTIONS.map((option) => (_jsx(FilterPill, { label: option.label, active: sort === option.value, variant: "primary", onClick: () => onSortChange(option.value) }, option.value)))] }));
}
