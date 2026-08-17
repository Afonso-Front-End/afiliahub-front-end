import { CheckCircle2, MoreHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AdminBarActions, AdminBarStoreOnlineButton } from "@/components/admin/AdminBarActions";
import { cn } from "@/lib/utils";

const buttonClass =
  "text-xs font-semibold px-3 py-1.5 rounded-full transition-colors inline-flex items-center shrink-0 whitespace-nowrap";

function AdminSaveFeedback({ message }: { message: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 animate-in fade-in duration-300 max-w-[14rem] truncate"
    >
      <CheckCircle2 className="size-3.5 shrink-0" />
      {message}
    </span>
  );
}

function AdminMobileQuickActions({
  storeOnline,
  toggling,
  onRefresh,
  onStoreToggle,
}: {
  storeOnline: boolean;
  toggling: boolean;
  onRefresh?: () => void;
  onStoreToggle: () => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-0.5 -mx-1 px-1 scrollbar-none">
      <AdminBarStoreOnlineButton
        storeOnline={storeOnline}
        toggling={toggling}
        onToggle={onStoreToggle}
        compact
      />
      {onRefresh && (
        <button type="button" onClick={onRefresh} className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}>
          Atualizar
        </button>
      )}
      <Link to="/" className={cn(buttonClass, "bg-background/15 hover:bg-background/25")}>
        Ver site
      </Link>
    </div>
  );
}

function AdminTopBarMobileHeader({
  title,
  subtitle,
  menuOpen,
  onMenuToggle,
}: {
  title: string;
  subtitle: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 w-full min-w-0">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm truncate">{title}</p>
        <p className="text-xs opacity-80 truncate">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onMenuToggle}
        className="size-9 shrink-0 grid place-items-center rounded-full bg-background/15 hover:bg-background/25"
        aria-label={menuOpen ? "Fechar menu admin" : "Abrir menu admin"}
        aria-expanded={menuOpen}
      >
        <MoreHorizontal className="size-4" />
      </button>
    </div>
  );
}

export function AdminTopBarDesktop({
  title,
  subtitle,
  active,
  saveFeedback,
  storeOnline,
  toggling,
  onRefresh,
  onStoreToggle,
  onLogout,
}: {
  title: string;
  subtitle: string;
  active?: "preview" | "edit" | "config-apis" | "configuracoes";
  saveFeedback?: string | null;
  storeOnline: boolean;
  toggling: boolean;
  onRefresh?: () => void;
  onStoreToggle: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="hidden md:flex items-center justify-between gap-3 w-full min-w-0">
      <div className="min-w-0">
        <p className="font-semibold text-sm truncate">{title}</p>
        <p className="text-xs opacity-80 truncate">{subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
        {saveFeedback && <AdminSaveFeedback message={saveFeedback} />}
        <AdminBarActions
          active={active}
          storeOnline={storeOnline}
          toggling={toggling}
          onRefresh={onRefresh}
          onStoreToggle={onStoreToggle}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export function AdminTopBarMobile({
  title,
  subtitle,
  active,
  saveFeedback,
  menuOpen,
  onMenuToggle,
  storeOnline,
  toggling,
  onRefresh,
  onStoreToggle,
  onLogout,
}: {
  title: string;
  subtitle: string;
  active?: "preview" | "edit" | "config-apis" | "configuracoes";
  saveFeedback?: string | null;
  menuOpen: boolean;
  onMenuToggle: () => void;
  storeOnline: boolean;
  toggling: boolean;
  onRefresh?: () => void;
  onStoreToggle: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="md:hidden flex flex-col gap-2 w-full">
      <AdminTopBarMobileHeader
        title={title}
        subtitle={subtitle}
        menuOpen={menuOpen}
        onMenuToggle={onMenuToggle}
      />
      {saveFeedback && (
        <span role="status" className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 w-full">
          <CheckCircle2 className="size-3.5 shrink-0" />
          <span className="truncate">{saveFeedback}</span>
        </span>
      )}
      <AdminMobileQuickActions
        storeOnline={storeOnline}
        toggling={toggling}
        onRefresh={onRefresh}
        onStoreToggle={onStoreToggle}
      />
      {menuOpen && (
        <div className="flex flex-wrap gap-2 w-full pt-2 border-t border-background/10">
          <AdminBarActions
            active={active}
            storeOnline={storeOnline}
            toggling={toggling}
            onLogout={onLogout}
            onStoreToggle={onStoreToggle}
          />
        </div>
      )}
    </div>
  );
}
