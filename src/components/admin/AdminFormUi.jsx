import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AdminItemCard } from "@/components/admin/AdminItemCard";
import { AdminSelectField } from "@/components/admin/AdminSelectMenu";
import { adminInputClass } from "@/components/admin/admin-input";
import { parseBrlPriceInput } from "@/lib/price-input";
import { cn } from "@/lib/utils";
function formatBrlPrice(value) {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number.isFinite(value) ? value : 0);
}
export function priceDiscountPercent(price, oldPrice) {
    if (!Number.isFinite(price) || !Number.isFinite(oldPrice) || oldPrice <= price)
        return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
}
export function AdminField({ label, value, onChange, multiline, hint, type = "text", }) {
    return (_jsxs("label", { className: "block space-y-1.5", children: [_jsx("span", { className: "text-xs font-semibold text-foreground", children: label }), hint && _jsx("span", { className: "block text-[11px] text-muted-foreground -mt-0.5", children: hint }), multiline ? (_jsx("textarea", { value: value, onChange: (e) => onChange(e.target.value), rows: 3, className: cn(adminInputClass, "resize-y min-h-[88px]") })) : (_jsx("input", { type: type, value: value, onChange: (e) => onChange(e.target.value), className: adminInputClass }))] }));
}
export { AdminSelectField };
export function AdminFormSection({ title, description, children, }) {
    return (_jsxs("section", { className: "rounded-2xl border border-border/80 bg-background/60 overflow-hidden", children: [_jsxs("div", { className: "px-5 py-4 border-b border-border/60 bg-muted/40", children: [_jsx("h2", { className: "text-sm font-semibold", children: title }), description && _jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })] }), _jsx("div", { className: "p-5 space-y-4", children: children })] }));
}
export { AdminItemCard };
export function AdminNumberField({ label, value, onChange, step = "0.01", hint, }) {
    return (_jsxs("label", { className: "block space-y-1.5", children: [_jsx("span", { className: "text-xs font-semibold text-foreground", children: label }), hint && _jsx("span", { className: "block text-[11px] text-muted-foreground -mt-0.5", children: hint }), _jsx("input", { type: "number", step: step, value: value, onChange: (e) => onChange(Number(e.target.value)), className: adminInputClass })] }));
}
export function AdminPriceField({ label, value, onChange, hint, }) {
    const [display, setDisplay] = useState(formatBrlPrice(value));
    const [focused, setFocused] = useState(false);
    useEffect(() => {
        if (!focused)
            setDisplay(formatBrlPrice(value));
    }, [value, focused]);
    const commit = (raw) => {
        const parsed = parseBrlPriceInput(raw);
        onChange(parsed);
        setDisplay(formatBrlPrice(parsed));
    };
    return (_jsxs("label", { className: "block space-y-1.5", children: [_jsx("span", { className: "text-xs font-semibold text-foreground", children: label }), hint && _jsx("span", { className: "block text-[11px] text-muted-foreground -mt-0.5", children: hint }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground", children: "R$" }), _jsx("input", { type: "text", inputMode: "decimal", autoComplete: "off", value: display, onFocus: () => setFocused(true), onBlur: () => {
                            setFocused(false);
                            commit(display);
                        }, onChange: (e) => {
                            const next = e.target.value;
                            setDisplay(next);
                            if (next.trim())
                                onChange(parseBrlPriceInput(next));
                        }, placeholder: "0,00", className: cn(adminInputClass, "pl-10 font-mono tabular-nums") })] })] }));
}
export function AdminPriceGroup({ price, oldPrice, onPriceChange, onOldPriceChange, priceLabel = "Preço promocional", oldPriceLabel = "Preço original", }) {
    const discount = priceDiscountPercent(price, oldPrice);
    return (_jsxs("div", { className: "rounded-2xl border border-border/60 bg-muted/15 p-4 space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("p", { className: "text-xs font-semibold text-foreground", children: "Pre\u00E7os" }), discount > 0 ? (_jsxs("span", { className: "text-[10px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2.5 py-1 rounded-full", children: [discount, "% de desconto"] })) : (_jsx("span", { className: "text-[10px] text-muted-foreground", children: "Sem desconto vis\u00EDvel" }))] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(AdminPriceField, { label: priceLabel, value: price, onChange: onPriceChange, hint: "Valor exibido no card" }), _jsx(AdminPriceField, { label: oldPriceLabel, value: oldPrice, onChange: onOldPriceChange, hint: "Valor riscado no site" })] })] }));
}
