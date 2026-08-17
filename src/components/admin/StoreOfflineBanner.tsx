import { useRouterState } from "@tanstack/react-router";
import { useSiteContent } from "@/context/site-content-context";

export function StoreOfflineBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { storeOnline } = useSiteContent();

  if (storeOnline || pathname.startsWith("/admin")) return null;

  return (
    <div className="bg-amber-500 text-amber-950 border-b border-amber-600/20">
      <div className="max-w-[1440px] mx-auto px-4 py-2 text-center text-xs font-semibold">
        Loja offline para visitantes. Só administradores com sessão ativa veem o site.
      </div>
    </div>
  );
}
