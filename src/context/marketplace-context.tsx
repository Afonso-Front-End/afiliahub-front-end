import { createContext, useContext, useMemo, type ReactNode } from "react";
import { type StoreFilter } from "@/data/marketplace";
import {
  FavoritesPanel,
  MarketplaceToasts,
  NotificationsPanel,
} from "@/components/marketplace/MarketplaceOverlays";
import { useMarketplaceState, type SortOption } from "@/hooks/use-marketplace-state";

export type { SortOption };

type MarketplaceContextValue = {
  search: string;
  setSearch: (value: string) => void;
  category: string | null;
  setCategory: (value: string | null) => void;
  storeFilters: string[];
  storeFilter: StoreFilter;
  setStoreFilter: (value: StoreFilter) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  favorites: Set<string>;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  filteredProducts: ReturnType<typeof useMarketplaceState>["filteredProducts"];
  openOffer: ReturnType<typeof useMarketplaceState>["openOffer"];
  scrollTo: (sectionId: string) => void;
  notify: (message: string) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  favoritesOpen: boolean;
  setFavoritesOpen: (open: boolean) => void;
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  markNotificationsRead: () => void;
  unreadNotifications: number;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

const NOTIFICATIONS = [
  "Novo cupom Shopee: 15% OFF em eletrônicos",
  "Cashback de 20% ativo na Amazon até domingo",
  "3 produtos da sua lista baixaram de preço",
];

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const state = useMarketplaceState();

  const value = useMemo(
    () => ({
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
    }),
    [state],
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
      <MarketplaceToasts toasts={state.toasts} />
      {state.notificationsOpen && (
        <NotificationsPanel
          items={NOTIFICATIONS}
          onClose={() => state.setNotificationsOpen(false)}
          onRead={state.markNotificationsRead}
        />
      )}
      {state.favoritesOpen && (
        <FavoritesPanel
          favorites={state.favorites}
          products={state.products}
          onClose={() => state.setFavoritesOpen(false)}
        />
      )}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error("useMarketplace must be used within MarketplaceProvider");
  return ctx;
}
