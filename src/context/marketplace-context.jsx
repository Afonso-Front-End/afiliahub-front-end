import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from "react";
import { FavoritesPanel, MarketplaceToasts, NotificationsPanel, } from "@/components/marketplace/MarketplaceOverlays";
import { useMarketplaceState } from "@/hooks/use-marketplace-state";
const MarketplaceContext = createContext(null);
const NOTIFICATIONS = [
    "Novo cupom Shopee: 15% OFF em eletrônicos",
    "Cashback de 20% ativo na Amazon até domingo",
    "3 produtos da sua lista baixaram de preço",
];
export function MarketplaceProvider({ children }) {
    const state = useMarketplaceState();
    const value = useMemo(() => ({
        search: state.search,
        setSearch: state.setSearch,
        category: state.category,
        setCategory: state.setCategory,
        storeFilters: state.storeFilters,
        storeFilter: state.storeFilter,
        setStoreFilter: state.setStoreFilter,
        sort: state.sort,
        setSort: state.setSort,
        favorites: state.favorites,
        toggleFavorite: state.toggleFavorite,
        isFavorite: state.isFavorite,
        filteredProducts: state.filteredProducts,
        openOffer: state.openOffer,
        scrollTo: state.scrollTo,
        notify: state.notify,
        notificationsOpen: state.notificationsOpen,
        setNotificationsOpen: state.setNotificationsOpen,
        favoritesOpen: state.favoritesOpen,
        setFavoritesOpen: state.setFavoritesOpen,
        filtersOpen: state.filtersOpen,
        setFiltersOpen: state.setFiltersOpen,
        markNotificationsRead: state.markNotificationsRead,
        unreadNotifications: state.unreadNotifications,
    }), [state]);
    return (_jsxs(MarketplaceContext.Provider, { value: value, children: [children, _jsx(MarketplaceToasts, { toasts: state.toasts }), state.notificationsOpen && (_jsx(NotificationsPanel, { items: NOTIFICATIONS, onClose: () => state.setNotificationsOpen(false), onRead: state.markNotificationsRead })), state.favoritesOpen && (_jsx(FavoritesPanel, { favorites: state.favorites, products: state.products, onClose: () => state.setFavoritesOpen(false) }))] }));
}
export function useMarketplace() {
    const ctx = useContext(MarketplaceContext);
    if (!ctx)
        throw new Error("useMarketplace must be used within MarketplaceProvider");
    return ctx;
}
