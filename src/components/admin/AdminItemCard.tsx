import type { ReactNode } from "react";
import { CheckCircle2, Eye, EyeOff, Loader2, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

function AdminCardActionButton({
  onClick,
  title,
  variant = "default",
  children,
}: {
  onClick: () => void;
  title: string;
  variant?: "default" | "danger";
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition-colors shadow-soft",
        variant === "danger"
          ? "border-border bg-surface hover:bg-destructive/10 hover:text-destructive hover:border-destructive/25"
          : "border-border bg-surface hover:bg-accent text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function AdminVisibilityBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shrink-0",
        isActive ? "bg-success/12 text-success" : "bg-muted text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full shrink-0",
          isActive ? "bg-success" : "bg-muted-foreground/60",
        )}
      />
      {isActive ? "No site" : "Oculto"}
    </span>
  );
}

function AdminVisibilityToggle({
  isActive,
  onToggle,
}: {
  isActive: boolean;
  onToggle: () => void;
}) {
  const label = isActive ? "Ocultar" : "Mostrar";
  const title = isActive ? "Ocultar no site" : "Mostrar no site";
  const Icon = isActive ? Eye : EyeOff;

  return (
    <>
      <AdminVisibilityBadge isActive={isActive} />
      <AdminCardActionButton onClick={onToggle} title={title}>
        <Icon className="size-3.5" />
        <span>{label}</span>
      </AdminCardActionButton>
    </>
  );
}

function AdminDeleteButton({ onDelete }: { onDelete: () => void }) {
  return (
    <AdminCardActionButton onClick={onDelete} title="Apagar item" variant="danger">
      <Trash2 className="size-3.5" />
      <span className="hidden sm:inline">Apagar</span>
    </AdminCardActionButton>
  );
}

function AdminItemCardActions({
  isActive,
  onToggleActive,
  onDelete,
}: {
  isActive: boolean;
  onToggleActive?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
      {onToggleActive ? <AdminVisibilityToggle isActive={isActive} onToggle={onToggleActive} /> : null}
      {onDelete ? <AdminDeleteButton onDelete={onDelete} /> : null}
    </div>
  );
}

function adminItemCardHeaderClass(isActive: boolean) {
  return cn(
    "flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border/60",
    isActive ? "bg-muted/30" : "bg-muted/20",
  );
}

function AdminItemCardTitleBlock({
  index,
  title,
  subtitle,
}: {
  index: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <span className="size-7 shrink-0 rounded-lg bg-foreground text-background text-xs font-bold grid place-items-center">
        {index}
      </span>
      <div className="min-w-0 flex-1 basis-[140px]">
        <p className="text-sm font-semibold truncate">{title}</p>
        {subtitle ? <p className="text-[11px] text-muted-foreground truncate">{subtitle}</p> : null}
      </div>
    </>
  );
}

function AdminItemCardSavedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary shrink-0 w-full sm:w-auto justify-end sm:justify-start">
      <CheckCircle2 className="size-3" /> Salvo
    </span>
  );
}

function AdminItemCardHeader({
  index,
  title,
  subtitle,
  isActive,
  onToggleActive,
  onDelete,
  savedItem,
}: {
  index: number;
  title: string;
  subtitle?: string;
  isActive: boolean;
  onToggleActive?: () => void;
  onDelete?: () => void;
  savedItem?: boolean;
}) {
  const hasActions = Boolean(onToggleActive || onDelete);

  return (
    <div className={adminItemCardHeaderClass(isActive)}>
      <AdminItemCardTitleBlock index={index} title={title} subtitle={subtitle} />
      {hasActions ? (
        <AdminItemCardActions isActive={isActive} onToggleActive={onToggleActive} onDelete={onDelete} />
      ) : null}
      {savedItem ? <AdminItemCardSavedBadge /> : null}
    </div>
  );
}

export function AdminItemCard({
  index,
  title,
  subtitle,
  children,
  onSaveItem,
  savingItem,
  savedItem,
  isActive = true,
  onToggleActive,
  onDelete,
}: {
  index: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSaveItem?: () => void;
  savingItem?: boolean;
  savedItem?: boolean;
  isActive?: boolean;
  onToggleActive?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="rounded-2xl border bg-surface shadow-soft overflow-hidden transition-colors border-border">
      <AdminItemCardHeader
        index={index}
        title={title}
        subtitle={subtitle}
        isActive={isActive}
        onToggleActive={onToggleActive}
        onDelete={onDelete}
        savedItem={savedItem}
      />
      <div className="p-4 space-y-4">{children}</div>
      {onSaveItem && (
        <div className="px-4 pb-3 pt-0 border-t border-border/40 flex justify-end">
          <button
            type="button"
            onClick={onSaveItem}
            disabled={savingItem}
            className="mt-3 inline-flex items-center justify-center gap-1.5 bg-gradient-cta text-primary-foreground rounded-full px-3.5 py-1.5 text-[11px] font-semibold shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {savingItem ? (
              <>
                <Loader2 className="size-3 animate-spin" /> A guardar...
              </>
            ) : (
              <>
                <Save className="size-3" /> Guardar
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
