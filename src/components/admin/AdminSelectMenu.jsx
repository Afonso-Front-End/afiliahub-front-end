import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { adminInputClass } from "@/components/admin/admin-input";
import { useAdminSelectDropdown } from "@/hooks/use-admin-select-dropdown";
import { cn } from "@/lib/utils";
function adminSelectTriggerClass(open, hasSelection) {
    return cn(adminInputClass, "flex w-full items-center justify-between gap-2 text-left cursor-pointer", open && "ring-2 ring-primary/25 border-primary/40", !hasSelection && "text-muted-foreground");
}
function AdminSelectTrigger({ triggerRef, listboxId, open, selectedLabel, placeholder, onToggle, }) {
    const label = selectedLabel ?? placeholder;
    return (_jsxs("button", { ref: triggerRef, type: "button", "aria-haspopup": "listbox", "aria-expanded": open, "aria-controls": listboxId, onClick: onToggle, className: adminSelectTriggerClass(open, Boolean(selectedLabel)), children: [_jsx("span", { className: "truncate", children: label }), _jsx(ChevronDown, { className: cn("size-4 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180") })] }));
}
function AdminSelectMenuList({ menuRef, listboxId, label, menuStyle, value, options, onSelect, }) {
    return (_jsx("ul", { ref: menuRef, id: listboxId, role: "listbox", "aria-label": label, style: menuStyle, className: "max-h-56 overflow-auto rounded-xl border border-border bg-surface p-1.5 shadow-card", children: options.map((option) => {
            const isSelected = option.value === value;
            return (_jsx("li", { role: "presentation", children: _jsxs("button", { type: "button", role: "option", "aria-selected": isSelected, onClick: () => onSelect(option.value), className: cn("flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-left transition-colors", isSelected
                        ? "bg-accent text-accent-foreground font-semibold"
                        : "text-foreground hover:bg-muted"), children: [_jsx("span", { className: "truncate", children: option.label }), isSelected && _jsx(Check, { className: "size-3.5 shrink-0 text-primary" })] }) }, option.value));
        }) }));
}
function AdminSelectPortal({ open, menuRef, listboxId, label, menuStyle, value, options, onSelect, }) {
    if (!open || typeof document === "undefined")
        return null;
    return createPortal(_jsx(AdminSelectMenuList, { menuRef: menuRef, listboxId: listboxId, label: label, menuStyle: menuStyle, value: value, options: options, onSelect: onSelect }), document.body);
}
export function AdminSelectField({ label, value, onChange, options, hint, placeholder = "Selecionar", }) {
    const listboxId = useId();
    const selected = options.find((option) => option.value === value);
    const { open, setOpen, menuStyle, rootRef, triggerRef, menuRef } = useAdminSelectDropdown();
    return (_jsxs("div", { className: "block space-y-1.5", ref: rootRef, children: [_jsx("span", { className: "text-xs font-semibold text-foreground", children: label }), hint && _jsx("span", { className: "block text-[11px] text-muted-foreground -mt-0.5", children: hint }), _jsx(AdminSelectTrigger, { triggerRef: triggerRef, listboxId: listboxId, open: open, selectedLabel: selected?.label, placeholder: placeholder, onToggle: () => setOpen((current) => !current) }), _jsx(AdminSelectPortal, { open: open, menuRef: menuRef, listboxId: listboxId, label: label, menuStyle: menuStyle, value: value, options: options, onSelect: (next) => {
                    onChange(next);
                    setOpen(false);
                } })] }));
}
