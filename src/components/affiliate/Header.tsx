import { cn } from "@/lib/utils";
import { useMarketplace } from "@/context/marketplace-context";
import { useUserAuth } from "@/context/user-auth-context";
import { ADMIN_STICKY_TOP_CLASS } from "@/lib/admin-layout";
import { HeaderFiltersPanel, HeaderToolbar } from "@/components/affiliate/HeaderSections";
import { useHeaderToolbarHandlers } from "@/hooks/use-header-toolbar";

function headerAccountHref(user: { name: string } | null) {
  return user ? "/conta" : "/conta/entrar";
}

function headerUserInitials(user: { name: string } | null) {
  return user?.name?.slice(0, 2).toUpperCase() ?? "EU";
}

export function Header({ onMenu, adminMode }: { onMenu?: () => void; adminMode?: boolean }) {
  const { user } = useUserAuth();
  const { storeFilters, storeFilter, setStoreFilter, sort, favorites, unreadNotifications } =
    useMarketplace();
  const toolbar = useHeaderToolbarHandlers();

  return (
    <div
      data-main-header
      className={cn("sticky z-30 flex flex-col gap-2", adminMode ? ADMIN_STICKY_TOP_CLASS : "top-4 sm:top-6")}
    >
      <HeaderToolbar
        onMenu={onMenu}
        search={toolbar.search}
        onSearchChange={toolbar.setSearch}
        onSearchSubmit={toolbar.onSearchSubmit}
        filtersOpen={toolbar.filtersOpen}
        onToggleFilters={toolbar.onToggleFilters}
        notificationsOpen={toolbar.notificationsOpen}
        onToggleNotifications={toolbar.onToggleNotifications}
        favoritesOpen={toolbar.favoritesOpen}
        onToggleFavorites={toolbar.onToggleFavorites}
        favoritesCount={favorites.size}
        unreadNotifications={unreadNotifications}
        userInitials={headerUserInitials(user)}
        accountHref={headerAccountHref(user)}
      />

      {toolbar.filtersOpen && (
        <HeaderFiltersPanel
          adminMode={adminMode}
          storeFilters={storeFilters}
          storeFilter={storeFilter}
          onStoreFilterChange={setStoreFilter}
          sort={sort}
          onSortChange={toolbar.onSortChange}
        />
      )}
    </div>
  );
}
