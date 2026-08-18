import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckCircle2, Eye, EyeOff, Loader2, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
function AdminCardActionButton({ onClick, title, variant = "default", children, }) {
    return (_jsx("button", { type: "button", onClick: onClick, title: title, className: cn("inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition-colors shadow-soft", variant === "danger"
            ? "border-border bg-surface hover:bg-destructive/10 hover:text-destructive hover:border-destructive/25"
            : "border-border bg-surface hover:bg-accent text-foreground"), children: children }));
}
function AdminVisibilityBadge({ isActive }) {
    return (_jsxs("span", { className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shrink-0", isActive ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"), children: [_jsx("span", { className: cn("size-1.5 rounded-full shrink-0", isActive ? "bg-success" : "bg-muted-foreground/60") }), isActive ? "No site" : "Oculto"] }));
}
function AdminVisibilityToggle({ isActive, onToggle, }) {
    const label = isActive ? "Ocultar" : "Mostrar";
    const title = isActive ? "Ocultar no site" : "Mostrar no site";
    const Icon = isActive ? Eye : EyeOff;
    return (_jsxs(_Fragment, { children: [_jsx(AdminVisibilityBadge, { isActive: isActive }), _jsxs(AdminCardActionButton, { onClick: onToggle, title: title, children: [_jsx(Icon, { className: "size-3.5" }), _jsx("span", { children: label })] })] }));
}
function AdminDeleteButton({ onDelete }) {
    return (_jsxs(AdminCardActionButton, { onClick: onDelete, title: "Apagar item", variant: "danger", children: [_jsx(Trash2, { className: "size-3.5" }), _jsx("span", { className: "hidden sm:inline", children: "Apagar" })] }));
}
function AdminItemCardActions({ isActive, onToggleActive, onDelete, }) {
    return (_jsxs("div", { className: "flex items-center gap-1.5 shrink-0 ml-auto", children: [onToggleActive ? _jsx(AdminVisibilityToggle, { isActive: isActive, onToggle: onToggleActive }) : null, onDelete ? _jsx(AdminDeleteButton, { onDelete: onDelete }) : null] }));
}
function adminItemCardHeaderClass(isActive) {
    return cn("flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border/60", isActive ? "bg-muted/30" : "bg-muted/20");
}
function AdminItemCardTitleBlock({ index, title, subtitle, }) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { className: "size-7 shrink-0 rounded-lg bg-foreground text-background text-xs font-bold grid place-items-center", children: index }), _jsxs("div", { className: "min-w-0 flex-1 basis-[140px]", children: [_jsx("p", { className: "text-sm font-semibold truncate", children: title }), subtitle ? _jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: subtitle }) : null] })] }));
}
function AdminItemCardSavedBadge() {
    return (_jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold text-primary shrink-0 w-full sm:w-auto justify-end sm:justify-start", children: [_jsx(CheckCircle2, { className: "size-3" }), " Salvo"] }));
}
function AdminItemCardHeader({ index, title, subtitle, isActive, onToggleActive, onDelete, savedItem, }) {
    const hasActions = Boolean(onToggleActive || onDelete);
    return (_jsxs("div", { className: adminItemCardHeaderClass(isActive), children: [_jsx(AdminItemCardTitleBlock, { index: index, title: title, subtitle: subtitle }), hasActions ? (_jsx(AdminItemCardActions, { isActive: isActive, onToggleActive: onToggleActive, onDelete: onDelete })) : null, savedItem ? _jsx(AdminItemCardSavedBadge, {}) : null] }));
}
export function AdminItemCard({ index, title, subtitle, children, onSaveItem, savingItem, savedItem, isActive = true, onToggleActive, onDelete, }) {
    return (_jsxs("div", { className: "rounded-2xl border bg-surface shadow-soft overflow-hidden transition-colors border-border", children: [_jsx(AdminItemCardHeader, { index: index, title: title, subtitle: subtitle, isActive: isActive, onToggleActive: onToggleActive, onDelete: onDelete, savedItem: savedItem }), _jsx("div", { className: "p-4 space-y-4", children: children }), onSaveItem && (_jsx("div", { className: "px-4 pb-3 pt-0 border-t border-border/40 flex justify-end", children: _jsx("button", { type: "button", onClick: onSaveItem, disabled: savingItem, className: "mt-3 inline-flex items-center justify-center gap-1.5 bg-gradient-cta text-primary-foreground rounded-full px-3.5 py-1.5 text-[11px] font-semibold shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100", children: savingItem ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "size-3 animate-spin" }), " A guardar..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "size-3" }), " Guardar"] })) }) }))] }));
}
