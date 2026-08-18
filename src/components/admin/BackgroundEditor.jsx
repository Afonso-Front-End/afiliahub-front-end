import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { backgroundStyle } from "@/lib/background-style";
import { BackgroundGradientFields, BackgroundSolidField, BackgroundTypeToggle, } from "@/components/admin/BackgroundEditorFields";
import { Palette } from "lucide-react";
export function BackgroundEditor({ value, onChange, title = "Fundo da área", description = "Gradiente ou cor sólida", }) {
    return (_jsxs("div", { className: "rounded-2xl border border-border bg-muted/20 p-4 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "size-8 rounded-xl bg-surface grid place-items-center shadow-soft", children: _jsx(Palette, { className: "size-4 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", children: title }), _jsx("p", { className: "text-[11px] text-muted-foreground", children: description })] })] }), _jsx("div", { className: "h-20 rounded-2xl border border-border shadow-inner", style: backgroundStyle(value) }), _jsx(BackgroundTypeToggle, { value: value, onChange: onChange }), value.type === "gradient" ? (_jsx(BackgroundGradientFields, { value: value, onChange: onChange })) : (_jsx(BackgroundSolidField, { value: value, onChange: onChange }))] }));
}
