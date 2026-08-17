import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StoreApiCard } from "@/components/admin/StoreApiCard";
import { ADMIN_SHELL_MAIN_NARROW_CLASS } from "@/lib/admin-layout";
import { getAdminSession } from "@/api/auth";
import { fetchStoreApiConfigs } from "@/api/store-api";
import type { StoreApiConfig } from "@/types/user";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/config-apis")({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (!session) throw redirect({ to: "/admin/login" });
    return session;
  },
  component: AdminConfigApisPage,
});

function AdminConfigApisPage() {
  const [stores, setStores] = useState<StoreApiConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchStoreApiConfigs();
      setStores(data.stores);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const showSaveFeedback = (message: string) => {
    setSaveFeedback(message);
    window.setTimeout(() => setSaveFeedback((current) => (current === message ? null : current)), 3000);
  };

  return (
    <AdminShell
      active="config-apis"
      title="Config Admin APIs"
      subtitle="Credenciais e rastreio por marketplace (loja real)"
      saveFeedback={saveFeedback}
      mainClassName={cn(ADMIN_SHELL_MAIN_NARROW_CLASS, "max-w-4xl")}
    >
      <div className="rounded-3xl bg-surface border border-border p-6 shadow-soft">
        <div className="flex items-start gap-3">
          <div className="size-11 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow shrink-0">
            <Settings2 className="size-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl">Config Admin APIs</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Configure os IDs de afiliado, parâmetros de rastreio e URLs de postback de cada loja.
            </p>
          </div>
        </div>
      </div>

      {loading && <p className="text-sm text-muted-foreground">A carregar lojas…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {stores.map((store) => (
        <StoreApiCard
          key={store.storeName}
          initial={store}
          onSaved={load}
          onSaveSuccess={showSaveFeedback}
        />
      ))}
    </AdminShell>
  );
}
