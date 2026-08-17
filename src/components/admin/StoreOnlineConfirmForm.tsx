import { storeOnlineCopy } from "@/lib/store-online-copy";

function ConfirmDialogActions({
  loading,
  canSubmit,
  onCancel,
}: {
  loading: boolean;
  canSubmit: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="rounded-2xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={loading || !canSubmit}
        className="rounded-2xl bg-foreground text-background px-4 py-2 text-sm font-semibold disabled:opacity-50"
      >
        {loading ? "A confirmar…" : "Confirmar"}
      </button>
    </div>
  );
}

export function StoreOnlineConfirmForm({
  goingOnline,
  loading,
  error,
  password,
  onPasswordChange,
  onConfirm,
  onCancel,
}: {
  goingOnline: boolean;
  loading: boolean;
  error: string;
  password: string;
  onPasswordChange: (value: string) => void;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}) {
  const copy = storeOnlineCopy(goingOnline);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!password.trim() || loading) return;
    onConfirm(password);
  };

  return (
    <form
      onSubmit={submit}
      className="relative w-full max-w-md rounded-3xl bg-surface border border-border p-6 shadow-soft space-y-4"
    >
      <div>
        <h2 className="font-display font-bold text-lg">{copy.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{copy.description}</p>
      </div>

      <label className="block text-xs font-semibold space-y-1.5">
        Senha do administrador
        <input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          autoFocus
          disabled={loading}
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/25"
          placeholder="A sua senha de admin"
        />
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <ConfirmDialogActions
        loading={loading}
        canSubmit={Boolean(password.trim())}
        onCancel={onCancel}
      />
    </form>
  );
}
