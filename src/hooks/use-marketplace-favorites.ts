import { useCallback, useState } from "react";

export function useMarketplaceFavorites(notify: (message: string) => void) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(productId)) {
          next.delete(productId);
          notify("Removido dos favoritos");
        } else {
          next.add(productId);
          notify("Adicionado aos favoritos");
        }
        return next;
      });
    },
    [notify],
  );

  const isFavorite = useCallback((productId: string) => favorites.has(productId), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
