import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StoreApiCardFields } from "@/components/admin/StoreApiCardFields";
import { useStoreApiCard } from "@/hooks/use-store-api-card";
function StoreApiCardHeader({ storeName, enabled, onEnabledChange, }) {
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-xl", children: storeName }), _jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Integra\u00E7\u00E3o de afiliado e rastreio de cliques" })] }), _jsxs("label", { className: "inline-flex items-center gap-2 text-xs font-semibold", children: [_jsx("input", { type: "checkbox", checked: enabled, onChange: (e) => onEnabledChange(e.target.checked) }), "API ativa"] })] }));
}
export function StoreApiCard({ initial, onSaved, onSaveSuccess, }) {
    const { form, setForm, saving, error, save } = useStoreApiCard(initial, onSaved, onSaveSuccess);
    return (_jsxs("div", { className: "rounded-3xl bg-surface border border-border p-6 shadow-soft space-y-4", children: [_jsx(StoreApiCardHeader, { storeName: form.storeName, enabled: form.enabled, onEnabledChange: (enabled) => setForm({ ...form, enabled }) }), _jsx(StoreApiCardFields, { form: form, onChange: setForm }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), _jsx("button", { type: "button", onClick: save, disabled: saving, className: "rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60", children: saving ? "A guardar…" : "Guardar configuração" })] }));
}
