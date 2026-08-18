import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck } from "lucide-react";
export function SystemConfigIntro() {
    return (_jsx("div", { className: "rounded-3xl bg-surface border border-border p-6 shadow-soft", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "size-11 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow shrink-0", children: _jsx(ShieldCheck, { className: "size-5 text-primary-foreground" }) }), _jsxs("div", { children: [_jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl", children: "Configura\u00E7\u00F5es seguras" }), _jsxs("p", { className: "text-sm text-muted-foreground mt-1 max-w-2xl", children: ["SMTP, MongoDB e passwords de servidor continuam no ficheiro ", _jsx("code", { children: ".env" }), " do backend, fora da interface."] })] })] }) }));
}
