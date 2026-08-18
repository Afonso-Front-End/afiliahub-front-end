import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";
export function AppLayout({ children, adminMode, }) {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);
    const sidebar = _jsx(Sidebar, { className: "hidden lg:flex", adminEdit: adminMode });
    const mobileSidebar = _jsx(Sidebar, { className: "flex", onNavigate: () => setMenuOpen(false), adminEdit: adminMode });
    return (_jsx("div", { className: "min-h-screen bg-background", children: _jsxs("div", { className: "max-w-[1440px] mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-6", children: [sidebar, menuOpen && (_jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [_jsx("div", { className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm", onClick: () => setMenuOpen(false) }), _jsxs("div", { className: "absolute left-0 top-0 bottom-0 w-72 p-4 overflow-y-auto bg-background", children: [mobileSidebar, _jsx("button", { onClick: () => setMenuOpen(false), className: "absolute top-6 right-6 size-9 grid place-items-center rounded-full bg-surface shadow-card", "aria-label": "Fechar", children: _jsx(X, { className: "size-4" }) })] })] })), _jsxs("main", { className: "min-w-0 flex flex-col gap-6", children: [_jsx(Header, { onMenu: () => setMenuOpen(true), adminMode: adminMode }), children, adminMode ? (_jsx(AdminSectionOverlay, { sectionId: "footer", label: "Rodap\u00E9", children: _jsx(Footer, {}) })) : (_jsx(Footer, {}))] })] }) }));
}
