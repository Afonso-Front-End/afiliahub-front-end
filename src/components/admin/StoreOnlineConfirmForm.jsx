import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { storeOnlineCopy } from "@/lib/store-online-copy";
function ConfirmDialogActions({ loading, canSubmit, onCancel, }) {
    return (_jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [_jsx("button", { type: "button", onClick: onCancel, disabled: loading, className: "rounded-2xl border border-border px-4 py-2 text-sm font-semibold disabled:opacity-50", children: "Cancelar" }), _jsx("button", { type: "submit", disabled: loading || !canSubmit, className: "rounded-2xl bg-foreground text-background px-4 py-2 text-sm font-semibold disabled:opacity-50", children: loading ? "A confirmar…" : "Confirmar" })] }));
}
export function StoreOnlineConfirmForm({ goingOnline, loading, error, password, onPasswordChange, onConfirm, onCancel, }) {
    const copy = storeOnlineCopy(goingOnline);
    const submit = (event) => {
        event.preventDefault();
        if (!password.trim() || loading)
            return;
        onConfirm(password);
    };
    return (_jsxs("form", { onSubmit: submit, className: "relative w-full max-w-md rounded-3xl bg-surface border border-border p-6 shadow-soft space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-display font-bold text-lg", children: copy.title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: copy.description })] }), _jsxs("label", { className: "block text-xs font-semibold space-y-1.5", children: ["Senha do administrador", _jsx("input", { type: "password", value: password, onChange: (e) => onPasswordChange(e.target.value), autoFocus: true, disabled: loading, className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/25", placeholder: "A sua senha de admin" })] }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), _jsx(ConfirmDialogActions, { loading: loading, canSubmit: Boolean(password.trim()), onCancel: onCancel })] }));
}
