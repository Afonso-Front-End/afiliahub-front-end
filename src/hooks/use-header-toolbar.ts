import type { SortOption } from "@/context/marketplace-context";
import { useMarketplace } from "@/context/marketplace-context";

export function useHeaderToolbarHandlers() {
  const {
    search,
    setSearch,
    setFiltersOpen,
    filtersOpen,
    setNotificationsOpen,
    notificationsOpen,
    setFavoritesOpen,
    favoritesOpen,
    setSort,
    scrollTo,
    notify,
  } = useMarketplace();

  return {
    search,
    setSearch,
    filtersOpen,
    onToggleFilters: () => setFiltersOpen(!filtersOpen),
    onSearchSubmit: () => {
      scrollTo("produtos");
      const trimmed = search.trim();
      if (trimmed) notify(`Buscando por "${trimmed}"…`);
    },
    notificationsOpen,
    onToggleNotifications: () => {
      setFavoritesOpen(false);
      setNotificationsOpen(!notificationsOpen);
    },
    favoritesOpen,
    onToggleFavorites: () => {
      setNotificationsOpen(false);
      setFavoritesOpen(!favoritesOpen);
    },
    onSortChange: (value: SortOption) => {
      setSort(value);
      scrollTo("produtos");
    },
  };
}
