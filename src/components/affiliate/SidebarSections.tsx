import {
  Cpu,
  Laptop,
  Smartphone,
  Home as HomeIcon,
  Shirt,
  Flower2,
  Dumbbell,
  Car,
  Gamepad2,
  BookOpen,
  Zap,
} from "lucide-react";
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

export function SidebarBrand({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-2 text-left hover:opacity-80 transition-opacity"
    >
      <div className="size-10 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow">
        <Zap className="size-5 text-primary-foreground" fill="currentColor" />
      </div>
      <div className="leading-tight">
        <p className="font-display font-extrabold text-lg">AfiliaHub</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Marketplace</p>
      </div>
    </button>
  );
}

export function SidebarCategoryNav({
  category,
  onSelectCategory,
  onNavigate,
}: {
  category: string | null;
  onSelectCategory: (name: string) => void;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Categorias
      </p>
      <nav className="flex flex-col gap-0.5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = category === cat.name;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </nav>
      <div className="mt-3 flex flex-col gap-1 px-1">
        <Link
          to="/produtos"
          onClick={onNavigate}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-muted transition-colors"
        >
          Ver todos os produtos →
        </Link>
        <Link
          to="/categorias"
          onClick={onNavigate}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-muted transition-colors"
        >
          Ver todas as categorias →
        </Link>
      </div>
    </div>
  );
}
