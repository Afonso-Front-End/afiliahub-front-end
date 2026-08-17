import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const buttonClass =
  "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors inline-flex items-center shrink-0 whitespace-nowrap";

const STORE_BUTTON_LABELS = {
  loading: { compact: "…", full: "A atualizar…" },
  on: { compact: "Online", full: "Loja: Online" },
  off: { compact: "Offline", full: "Loja: Offline" },
} as const;

function storeButtonLabel(toggling: boolean, storeOnline: boolean, compact?: boolean) {
  const state = toggling ? "loading" : storeOnline ? "on" : "off";
  const labels = STORE_BUTTON_LABELS[state];
  return compact ? labels.compact : labels.full;
}

export function AdminBarStoreOnlineButton({
  storeOnline,
  toggling,
  onToggle,
  compact,
}: {
  storeOnline: boolean;
  toggling: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={toggling}
      className={cn(
        buttonClass,
        storeOnline ? "bg-background text-foreground" : "bg-amber-300 text-amber-950",
        toggling && "opacity-60",
      )}
    >
      {storeButtonLabel(toggling, storeOnline, compact)}
    </button>
  );
}

function AdminBarNavLinks({
  active,
  onLogout,
}: {
  active?: "preview" | "edit" | "config-apis" | "configuracoes";
  onLogout: () => void;
}) {
  return (
    <>
      <Link
        to="/admin/configuracoes"
        className={cn(
          buttonClass,
          active === "configuracoes"
            ? "bg-background text-foreground"
            : "bg-background/15 hover:bg-background/25",
        )}
      >
        Configurações
      </Link>
      <Link
        to="/admin/config-apis"
        className={cn(
          buttonClass,
          active === "config-apis"
            ? "bg-background text-foreground"
            : "bg-background/15 hover:bg-background/25",
        )}
      >
        Config APIs
      </Link>
      <Link
        to="/admin/edit/$section"
        params={{ section: "stores" }}
        className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}
      >
        Editar lojas
      </Link>
      {active !== "preview" && (
        <Link to="/admin" className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}>
          Preview do site
        </Link>
      )}
      <Link to="/" className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}>
        Ver site
      </Link>
      <button type="button" onClick={onLogout} className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}>
        Sair
      </button>
    </>
  );
}

export function AdminBarActions({
  active,
  storeOnline,
  toggling,
  onRefresh,
  onStoreToggle,
  onLogout,
}: {
  active?: "preview" | "edit" | "config-apis" | "configuracoes";
  storeOnline: boolean;
  toggling: boolean;
  onRefresh?: () => void;
  onStoreToggle: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      {onRefresh && (
        <button type="button" onClick={onRefresh} className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}>
          Atualizar preview
        </button>
      )}
      <AdminBarStoreOnlineButton storeOnline={storeOnline} toggling={toggling} onToggle={onStoreToggle} />
      <AdminBarNavLinks active={active} onLogout={onLogout} />
    </>
  );
}
