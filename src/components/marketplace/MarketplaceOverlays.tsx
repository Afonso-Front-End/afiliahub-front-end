import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/marketplace";

type Toast = { id: number; message: string };

export function MarketplaceToasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[100] flex flex-col gap-2 pointer-events-none items-stretch sm:items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-foreground text-background text-sm font-medium px-4 py-3 rounded-2xl shadow-card max-w-full sm:max-w-sm"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export function NotificationsPanel({
  items,
  onClose,
  onRead,
}: {
  items: string[];
  onClose: () => void;
  onRead: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed inset-x-4 bottom-4 top-auto z-50 max-h-[70vh] overflow-y-auto bg-surface rounded-2xl shadow-card p-4 border border-border sm:inset-x-auto sm:bottom-auto sm:top-20 sm:right-6 sm:w-80 sm:max-h-none">
        <div className="flex items-center justify-between mb-3 gap-2">
          <h3 className="font-semibold text-sm">Notificações</h3>
          <button
            onClick={() => {
              onRead();
              onClose();
            }}
            className="text-xs text-primary font-semibold"
          >
            Marcar como lidas
          </button>
        </div>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="text-sm text-muted-foreground bg-muted rounded-xl px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function FavoritesPanel({
  favorites,
  products,
  onClose,
}: {
  favorites: Set<string>;
  products: Product[];
  onClose: () => void;
}) {
  const items = products.filter((product) => favorites.has(product.id));

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed inset-x-4 bottom-4 top-auto z-50 max-h-[70vh] overflow-y-auto bg-surface rounded-2xl shadow-card p-4 border border-border sm:inset-x-auto sm:bottom-auto sm:top-20 sm:right-6 sm:w-80 sm:max-h-96">
        <h3 className="font-semibold text-sm mb-3">Favoritos ({items.length})</h3>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum produto favoritado ainda.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((product) => (
              <li key={product.id}>
                <Link
                  to="/produto/$productId"
                  params={{ productId: product.id }}
                  onClick={onClose}
                  className="block w-full text-left text-sm bg-muted rounded-xl px-3 py-2 hover:bg-accent transition-colors"
                >
                  <span className="font-medium line-clamp-1">{product.name}</span>
                  <span className="text-xs text-primary block mt-0.5">
                    R$ {product.price.toFixed(2).replace(".", ",")} ({product.store})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
