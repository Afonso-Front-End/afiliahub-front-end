import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { useMarketplace } from "@/context/marketplace-context";
import { useUserAuth } from "@/context/user-auth-context";
import { ADMIN_STICKY_TOP_CLASS } from "@/lib/admin-layout";
import { HeaderFiltersPanel, HeaderToolbar } from "@/components/affiliate/HeaderSections";
import { useHeaderToolbarHandlers } from "@/hooks/use-header-toolbar";
function headerAccountHref(user) {
    return user ? "/conta" : "/conta/entrar";
}
function headerUserInitials(user) {
    return user?.name?.slice(0, 2).toUpperCase() ?? "EU";
}
export function Header({ onMenu, adminMode }) {
    const { user } = useUserAuth();
    const { storeFilters, storeFilter, setStoreFilter, sort, favorites, unreadNotifications } = useMarketplace();
    const toolbar = useHeaderToolbarHandlers();
    return (_jsxs("div", { "data-main-header": true, className: cn("sticky z-30 flex flex-col gap-2", adminMode ? ADMIN_STICKY_TOP_CLASS : "top-4 sm:top-6"), children: [_jsx(HeaderToolbar, { onMenu: onMenu, search: toolbar.search, onSearchChange: toolbar.setSearch, onSearchSubmit: toolbar.onSearchSubmit, filtersOpen: toolbar.filtersOpen, onToggleFilters: toolbar.onToggleFilters, notificationsOpen: toolbar.notificationsOpen, onToggleNotifications: toolbar.onToggleNotifications, favoritesOpen: toolbar.favoritesOpen, onToggleFavorites: toolbar.onToggleFavorites, favoritesCount: favorites.size, unreadNotifications: unreadNotifications, userInitials: headerUserInitials(user), accountHref: headerAccountHref(user) }), toolbar.filtersOpen && (_jsx(HeaderFiltersPanel, { adminMode: adminMode, storeFilters: storeFilters, storeFilter: storeFilter, onStoreFilterChange: setStoreFilter, sort: sort, onSortChange: toolbar.onSortChange }))] }));
}
