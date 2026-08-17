import { StoreApiCardFields } from "@/components/admin/StoreApiCardFields";
import { useStoreApiCard } from "@/hooks/use-store-api-card";
import type { StoreApiConfig } from "@/types/user";

function StoreApiCardHeader({
  storeName,
  enabled,
  onEnabledChange,
}: {
  storeName: string;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="font-display font-bold text-xl">{storeName}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Integração de afiliado e rastreio de cliques
        </p>
      </div>
      <label className="inline-flex items-center gap-2 text-xs font-semibold">
        <input type="checkbox" checked={enabled} onChange={(e) => onEnabledChange(e.target.checked)} />
        API ativa
      </label>
    </div>
  );
}

export function StoreApiCard({
  initial,
  onSaved,
  onSaveSuccess,
}: {
  initial: StoreApiConfig;
  onSaved: () => void;
  onSaveSuccess: (message: string) => void;
}) {
  const { form, setForm, saving, error, save } = useStoreApiCard(initial, onSaved, onSaveSuccess);

  return (
    <div className="rounded-3xl bg-surface border border-border p-6 shadow-soft space-y-4">
      <StoreApiCardHeader
        storeName={form.storeName}
        enabled={form.enabled}
        onEnabledChange={(enabled) => setForm({ ...form, enabled })}
      />
      <StoreApiCardFields form={form} onChange={setForm} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60"
      >
        {saving ? "A guardar…" : "Guardar configuração"}
      </button>
    </div>
  );
}
