import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Cpu, Laptop, Smartphone, Home as HomeIcon, Shirt, Flower2, Dumbbell, Car, Gamepad2, BookOpen, Zap, } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
const CATEGORIES = [
    { name: "Eletrônicos", icon: Cpu },
    { name: "Informática", icon: Laptop },
    { name: "Smartphones", icon: Smartphone },
    { name: "Casa & Cozinha", icon: HomeIcon },
    { name: "Moda", icon: Shirt },
    { name: "Beleza", icon: Flower2 },
    { name: "Esportes", icon: Dumbbell },
    { name: "Automotivo", icon: Car },
    { name: "Games", icon: Gamepad2 },
    { name: "Livros", icon: BookOpen },
];
export function SidebarBrand({ onClick, }) {
    return (_jsxs("button", { onClick: onClick, className: "flex items-center gap-2.5 px-2 text-left hover:opacity-80 transition-opacity", children: [_jsx("div", { className: "size-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow", children: _jsx(Zap, { className: "size-5 text-primary-foreground", fill: "currentColor" }) }), _jsxs("div", { className: "leading-tight", children: [_jsx("p", { className: "font-display font-extrabold text-lg", children: "AfiliaHub" }), _jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Marketplace" })] })] }));
}
export function SidebarCategoryNav({ category, onSelectCategory, onNavigate, }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Categorias" }), _jsx("nav", { className: "flex flex-col gap-0.5", children: CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = category === cat.name;
                    return (_jsxs("button", { type: "button", onClick: () => onSelectCategory(cat.name), className: cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left", isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"), children: [_jsx(Icon, { className: "size-4" }), _jsx("span", { children: cat.name })] }, cat.name));
                }) }), _jsxs("div", { className: "mt-3 flex flex-col gap-1 px-1", children: [_jsx(Link, { to: "/produtos", onClick: onNavigate, className: "px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-muted transition-colors", children: "Ver todos os produtos \u2192" }), _jsx(Link, { to: "/categorias", onClick: onNavigate, className: "px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-muted transition-colors", children: "Ver todas as categorias \u2192" })] })] }));
}
