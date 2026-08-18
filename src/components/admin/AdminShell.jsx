import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ADMIN_SHELL_MAIN_CLASS } from "@/lib/admin-layout";
import { cn } from "@/lib/utils";
/**
 * Layout base de todas as páginas autenticadas do admin.
 * Centraliza a barra superior e o espaçamento do conteúdo.
 */
export function AdminShell({ title, subtitle, active, onRefresh, saveFeedback, children, mainClassName, }) {
    return (_jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [_jsx(AdminTopBar, { title: title, subtitle: subtitle, active: active, onRefresh: onRefresh, saveFeedback: saveFeedback }), _jsx("main", { className: cn(ADMIN_SHELL_MAIN_CLASS, mainClassName), children: children })] }));
}
