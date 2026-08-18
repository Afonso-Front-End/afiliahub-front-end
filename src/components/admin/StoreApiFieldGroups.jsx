import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const fieldClass = "w-full rounded-xl border border-border px-3 py-2.5 text-sm";
function TextField({ label, value, onChange, placeholder, type = "text", readOnly, }) {
    return (_jsxs("label", { className: "text-xs space-y-1 block", children: [label, _jsx("input", { type: type, value: value, readOnly: readOnly, onChange: onChange ? (e) => onChange(e.target.value) : undefined, className: cn(fieldClass, readOnly && "bg-muted"), placeholder: placeholder })] }));
}
export function StoreApiAffiliateFields({ form, onChange, }) {
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { label: "ID de afiliado", value: form.affiliateId, onChange: (value) => onChange({ ...form, affiliateId: value }), placeholder: "ID fornecido pela loja" }), _jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [_jsx(TextField, { label: "Par\u00E2metro do ID (query)", value: form.affiliateParam, onChange: (value) => onChange({ ...form, affiliateParam: value }) }), _jsx(TextField, { label: "Par\u00E2metro de rastreio", value: form.trackingParam, onChange: (value) => onChange({ ...form, trackingParam: value }) })] })] }));
}
export function StoreApiCredentialFields({ form, onChange, }) {
    return (_jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [_jsx(TextField, { label: "API Key", value: form.apiKey, onChange: (value) => onChange({ ...form, apiKey: value }), placeholder: "Opcional" }), _jsx(TextField, { label: "API Secret", type: "password", value: form.apiSecret, onChange: (value) => onChange({ ...form, apiSecret: value }), placeholder: "Opcional" })] }));
}
export function StoreApiWebhookFields({ form, onChange, }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [_jsx(TextField, { label: "Prefixo de rastreio", value: form.trackingPrefix, onChange: (value) => onChange({ ...form, trackingPrefix: value }) }), _jsx(TextField, { label: "Segredo do webhook", value: form.webhookSecret, onChange: (value) => onChange({ ...form, webhookSecret: value }), placeholder: "Valida\u00E7\u00E3o de postbacks" })] }), _jsx(TextField, { label: "URL de postback (copiar para a loja)", value: form.postbackUrl, readOnly: true }), _jsxs("label", { className: "text-xs space-y-1 block", children: ["Notas internas", _jsx("textarea", { value: form.notes, onChange: (e) => onChange({ ...form, notes: e.target.value }), className: cn(fieldClass, "min-h-20 resize-y") })] })] }));
}
