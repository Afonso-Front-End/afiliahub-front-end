import { useId } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { adminInputClass } from "@/components/admin/admin-input";
import { useAdminSelectDropdown } from "@/hooks/use-admin-select-dropdown";
import { cn } from "@/lib/utils";

function adminSelectTriggerClass(open: boolean, hasSelection: boolean) {
  return cn(
    adminInputClass,
    "flex w-full items-center justify-between gap-2 text-left cursor-pointer",
    open && "ring-2 ring-primary/25 border-primary/40",
    !hasSelection && "text-muted-foreground",
  );
}

function AdminSelectTrigger({
  triggerRef,
  listboxId,
  open,
  selectedLabel,
  placeholder,
  onToggle,
}: {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  listboxId: string;
  open: boolean;
  selectedLabel?: string;
  placeholder: string;
  onToggle: () => void;
}) {
  const label = selectedLabel ?? placeholder;

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listboxId}
      onClick={onToggle}
      className={adminSelectTriggerClass(open, Boolean(selectedLabel))}
    >
      <span className="truncate">{label}</span>
      <ChevronDown
        className={cn(
          "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

function AdminSelectMenuList({
  menuRef,
  listboxId,
  label,
  menuStyle,
  value,
  options,
  onSelect,
}: {
  menuRef: React.RefObject<HTMLUListElement | null>;
  listboxId: string;
  label: string;
  menuStyle: React.CSSProperties;
  value: string;
  options: Array<{ value: string; label: string }>;
  onSelect: (value: string) => void;
}) {
  return (
    <ul
      ref={menuRef}
      id={listboxId}
      role="listbox"
      aria-label={label}
      style={menuStyle}
      className="max-h-56 overflow-auto rounded-xl border border-border bg-surface p-1.5 shadow-card"
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <li key={option.value} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(option.value)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-left transition-colors",
                isSelected
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <span className="truncate">{option.label}</span>
              {isSelected && <Check className="size-3.5 shrink-0 text-primary" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function AdminSelectPortal({
  open,
  menuRef,
  listboxId,
  label,
  menuStyle,
  value,
  options,
  onSelect,
}: {
  open: boolean;
  menuRef: React.RefObject<HTMLUListElement | null>;
  listboxId: string;
  label: string;
  menuStyle: React.CSSProperties;
  value: string;
  options: Array<{ value: string; label: string }>;
  onSelect: (value: string) => void;
}) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <AdminSelectMenuList
      menuRef={menuRef}
      listboxId={listboxId}
      label={label}
      menuStyle={menuStyle}
      value={value}
      options={options}
      onSelect={onSelect}
    />,
    document.body,
  );
}

export function AdminSelectField({
  label,
  value,
  onChange,
  options,
  hint,
  placeholder = "Selecionar",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  hint?: string;
  placeholder?: string;
}) {
  const listboxId = useId();
  const selected = options.find((option) => option.value === value);
  const { open, setOpen, menuStyle, rootRef, triggerRef, menuRef } = useAdminSelectDropdown();

  return (
    <div className="block space-y-1.5" ref={rootRef}>
      <span className="text-xs font-semibold text-foreground">{label}</span>
      {hint && <span className="block text-[11px] text-muted-foreground -mt-0.5">{hint}</span>}
      <AdminSelectTrigger
        triggerRef={triggerRef}
        listboxId={listboxId}
        open={open}
        selectedLabel={selected?.label}
        placeholder={placeholder}
        onToggle={() => setOpen((current) => !current)}
      />
      <AdminSelectPortal
        open={open}
        menuRef={menuRef}
        listboxId={listboxId}
        label={label}
        menuStyle={menuStyle}
        value={value}
        options={options}
        onSelect={(next) => {
          onChange(next);
          setOpen(false);
        }}
      />
    </div>
  );
}
