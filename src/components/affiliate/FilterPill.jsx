import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function FilterPill({ label, active, onClick, variant = "default", }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: cn("px-3 py-1.5 rounded-full text-xs font-semibold transition-colors", active
            ? variant === "primary"
                ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background"
            : "bg-muted hover:bg-accent"), children: label }));
}
