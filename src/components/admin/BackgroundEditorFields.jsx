import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function ColorSwatchInput({ value, onChange, label, }) {
    return (_jsxs("label", { className: "relative size-9 shrink-0 cursor-pointer overflow-visible", children: [_jsx("span", { "aria-hidden": true, className: "block size-full rounded-lg border border-border bg-background shadow-soft", style: { backgroundColor: value } }), _jsx("input", { type: "color", value: value, onChange: (e) => onChange(e.target.value), "aria-label": label, className: "absolute inset-0 size-full cursor-pointer opacity-0" })] }));
}
function ColorFieldRow({ value, onChange, label, }) {
    return (_jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 overflow-visible", children: [_jsx(ColorSwatchInput, { value: value, onChange: onChange, label: label }), _jsx("span", { className: "text-xs font-mono text-muted-foreground", children: value })] }));
}
export function BackgroundTypeToggle({ value, onChange, }) {
    return (_jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { type: "button", onClick: () => onChange({
                    type: "gradient",
                    from: value.from ?? "#fce7f3",
                    to: value.to ?? "#e0e7ff",
                    angle: value.angle ?? 135,
                }), className: cn("px-4 py-2 rounded-full text-xs font-semibold transition-colors", value.type === "gradient"
                    ? "bg-foreground text-background shadow-card"
                    : "bg-surface border border-border hover:bg-accent"), children: "Gradiente" }), _jsx("button", { type: "button", onClick: () => onChange({ type: "solid", color: value.color ?? "#ffffff" }), className: cn("px-4 py-2 rounded-full text-xs font-semibold transition-colors", value.type === "solid"
                    ? "bg-foreground text-background shadow-card"
                    : "bg-surface border border-border hover:bg-accent"), children: "Cor s\u00F3lida" })] }));
}
function BackgroundGradientColorField({ title, label, color, fallback, onChange, }) {
    return (_jsxs("label", { className: "space-y-2", children: [_jsx("span", { className: "text-xs font-semibold", children: title }), _jsx(ColorFieldRow, { label: label, value: color ?? fallback, onChange: onChange })] }));
}
function BackgroundGradientAngleField({ angle, onChange, }) {
    const currentAngle = angle ?? 135;
    return (_jsxs("label", { className: "space-y-2", children: [_jsxs("span", { className: "text-xs font-semibold", children: ["\u00C2ngulo ", currentAngle, "\u00B0"] }), _jsx("input", { type: "range", min: 0, max: 360, value: currentAngle, onChange: (e) => onChange(Number(e.target.value)), className: "w-full accent-primary mt-3" })] }));
}
export function BackgroundGradientFields({ value, onChange, }) {
    const updateGradient = (patch) => onChange({ ...value, type: "gradient", ...patch });
    return (_jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [_jsx(BackgroundGradientColorField, { title: "Cor inicial", label: "Cor inicial", color: value.from, fallback: "#fce7f3", onChange: (from) => updateGradient({ from }) }), _jsx(BackgroundGradientColorField, { title: "Cor final", label: "Cor final", color: value.to, fallback: "#e0e7ff", onChange: (to) => updateGradient({ to }) }), _jsx(BackgroundGradientAngleField, { angle: value.angle, onChange: (angle) => updateGradient({ angle }) })] }));
}
export function BackgroundSolidField({ value, onChange, }) {
    return (_jsxs("label", { className: "space-y-2 block", children: [_jsx("span", { className: "text-xs font-semibold", children: "Cor de fundo" }), _jsx(ColorFieldRow, { label: "Cor de fundo", value: value.color ?? "#ffffff", onChange: (color) => onChange({ type: "solid", color }) })] }));
}
