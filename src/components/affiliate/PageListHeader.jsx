import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function PageListHeader({ icon: Icon, title, subtitle, filters, activeFilter, onFilterChange, }) {
    return (_jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-5", children: [_jsxs("div", { children: [_jsxs("h2", { className: "font-display font-bold text-2xl md:text-3xl flex items-center gap-2", children: [_jsx(Icon, { className: "size-6 text-primary" }), title] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: subtitle })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: filters.map((filter) => (_jsx("button", { type: "button", onClick: () => onFilterChange(filter), className: cn("px-3 py-1.5 rounded-full text-xs font-semibold transition-colors", activeFilter === filter
                        ? "bg-foreground text-background"
                        : "bg-muted hover:bg-accent"), children: filter }, filter))) })] }));
}
