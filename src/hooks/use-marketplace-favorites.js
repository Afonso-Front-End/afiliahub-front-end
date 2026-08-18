import { useCallback, useState } from "react";
export function useMarketplaceFavorites(notify) {
    const [favorites, setFavorites] = useState(new Set());
    const toggleFavorite = useCallback((productId) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            if (next.has(productId)) {
                next.delete(productId);
                notify("Removido dos favoritos");
            }
            else {
                next.add(productId);
                notify("Adicionado aos favoritos");
            }
            return next;
        });
    }, [notify]);
    const isFavorite = useCallback((productId) => favorites.has(productId), [favorites]);
    return { favorites, toggleFavorite, isFavorite };
}
