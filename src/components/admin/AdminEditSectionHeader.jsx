import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pencil } from "lucide-react";
import { SECTION_LABELS } from "@/data/admin-sections";
export function AdminEditSectionHeader({ sectionId }) {
    return (_jsx("div", { className: "rounded-3xl bg-surface border border-border p-6 shadow-soft", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "size-11 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow shrink-0", children: _jsx(Pencil, { className: "size-5 text-primary-foreground" }) }), _jsxs("div", { children: [_jsx("h1", { className: "font-display font-bold text-2xl md:text-3xl", children: SECTION_LABELS[sectionId] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xl", children: "Use \"Guardar\" em cada card ou \"Guardar tudo\" no final." })] })] }) }));
}
