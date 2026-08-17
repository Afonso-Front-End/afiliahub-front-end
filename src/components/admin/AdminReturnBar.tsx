import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminSession } from "@/api/auth";

export function AdminReturnBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setIsAdmin(false);
      return;
    }

    getAdminSession()
      .then((session) => setIsAdmin(!!session))
      .catch(() => setIsAdmin(false));
  }, [pathname]);

  if (!isAdmin) return null;

  return (
    <div className="bg-foreground text-background border-b border-background/10">
      <div className="max-w-[1440px] mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <p className="text-xs opacity-80">Sessão de administrador ativa</p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-background/15 px-3 py-1.5 rounded-full hover:bg-background/25 shrink-0"
        >
          Modo admin
        </Link>
      </div>
    </div>
  );
}
