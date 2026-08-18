import { useCallback, useMemo, useState } from "react";
import { useSiteContent } from "@/context/site-content-context";
import { getActiveCmsProducts } from "@/lib/cms-product";
import { getStoreFilterOptions } from "@/lib/cms-stores";
import { filterAndSortProducts } from "@/lib/product-filter-sort";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useMarketplaceFavorites } from "@/hooks/use-marketplace-favorites";
import { useMarketplaceOffer } from "@/hooks/use-marketplace-offer";
import { useMarketplaceToasts } from "@/hooks/use-marketplace-toasts";
export function useMarketplaceState() {
    const { content } = useSiteContent();
    const products = useMemo(() => getActiveCmsProducts(content), [content]);
    const storeFilters = useMemo(() => getStoreFilterOptions(content), [content.stores.items]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(null);
    const [storeFilter, setStoreFilter] = useState("Todos");
    const [sort, setSort] = useState("default");
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [favoritesOpen, setFavoritesOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(3);
    const { toasts, notify } = useMarketplaceToasts();
    const { favorites, toggleFavorite, isFavorite } = useMarketplaceFavorites(notify);
    const openOffer = useMarketplaceOffer(content, notify);
    const scrollTo = useCallback((sectionId) => {
        scrollToSection(sectionId);
    }, []);
    const markNotificationsRead = useCallback(() => {
        setUnreadNotifications(0);
    }, []);
    const filteredProducts = useMemo(() => filterAndSortProducts(products, {
        query: search,
        category,
        store: storeFilter,
        sort,
    }), [search, category, storeFilter, sort, products]);
    return {
        products,
        search,
        setSearch,
        category,
        setCategory,
        storeFilters,
        storeFilter,
        setStoreFilter,
        sort,
        setSort,
        favorites,
        toggleFavorite,
        isFavorite,
        filteredProducts,
        openOffer,
        scrollTo,
        notify,
        toasts,
        notificationsOpen,
        setNotificationsOpen,
        favoritesOpen,
        setFavoritesOpen,
        filtersOpen,
        setFiltersOpen,
        markNotificationsRead,
        unreadNotifications,
    };
}
