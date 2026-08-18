import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SystemGeneralFields, SystemUserAccountFields, } from "@/components/admin/SystemConfigSections";
import { SystemStoreOnlineFields } from "@/components/admin/SystemStoreOnlineFields";
export function SystemConfigForm({ form, saving, onChange, onSave, }) {
    return (_jsxs("div", { className: "rounded-3xl bg-surface border border-border p-6 shadow-soft space-y-4", children: [_jsx(SystemGeneralFields, { form: form, onChange: onChange }), _jsx(SystemStoreOnlineFields, { storeOnline: form.storeOnline, onStoreOnlineChange: (storeOnline) => onChange({ ...form, storeOnline }) }), _jsx(SystemUserAccountFields, { form: form, onChange: onChange }), _jsx("button", { type: "button", onClick: onSave, disabled: saving, className: "rounded-2xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60", children: saving ? "A guardar…" : "Guardar configurações" })] }));
}
