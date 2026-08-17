import { AdminStoreOnlineConfirmDialog } from "@/components/admin/AdminStoreOnlineConfirmDialog";
import { useStoreOnlineSwitch } from "@/hooks/use-store-online-switch";
import { storeOnlineStatusLabel, storeOnlineSuccessMessage } from "@/lib/store-online-copy";
import { useState } from "react";

export function SystemStoreOnlineFields({
  storeOnline,
  onStoreOnlineChange,
}: {
  storeOnline: boolean;
  onStoreOnlineChange: (online: boolean) => void;
}) {
  const [message, setMessage] = useState("");
  const {
    dialogOpen,
    goingOnline,
    loading,
    error,
    requestSwitch,
    cancelSwitch,
    confirmSwitch,
  } = useStoreOnlineSwitch((online) => {
    onStoreOnlineChange(online);
    setMessage(storeOnlineSuccessMessage(online));
  });

  return (
    <>
      <div className="space-y-3 pt-2 border-t border-border">
        <h2 className="font-display font-bold text-lg">Estado da loja</h2>
        <p className="text-sm text-muted-foreground">
          Controle se o site está visível ao público ou em manutenção. A edição do conteúdo funciona
          nos dois estados.
        </p>

        <p className="text-xs text-muted-foreground">
          Estado atual: <span className="font-semibold">{storeOnlineStatusLabel(storeOnline)}</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={loading || storeOnline}
            onClick={() => requestSwitch(true)}
            className="rounded-2xl bg-foreground text-background px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Colocar online
          </button>
          <button
            type="button"
            disabled={loading || !storeOnline}
            onClick={() => requestSwitch(false)}
            className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Colocar offline
          </button>
        </div>

        {message && <p className="text-sm text-success">{message}</p>}
      </div>

      <AdminStoreOnlineConfirmDialog
        open={dialogOpen}
        goingOnline={goingOnline}
        loading={loading}
        error={error}
        onConfirm={(password) => void confirmSwitch(password)}
        onCancel={cancelSwitch}
      />
    </>
  );
}
