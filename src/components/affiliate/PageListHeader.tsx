import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageListHeader({
  icon: Icon,
  title,
  subtitle,
  filters,
  activeFilter,
  onFilterChange,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  filters: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
      <div>
        <h2 className="font-display font-bold text-2xl md:text-3xl flex items-center gap-2">
          <Icon className="size-6 text-primary" />
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
              activeFilter === filter
                ? "bg-foreground text-background"
                : "bg-muted hover:bg-accent",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
