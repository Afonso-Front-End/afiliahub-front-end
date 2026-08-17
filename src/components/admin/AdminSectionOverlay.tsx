import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import type { SectionId } from "@/types/cms";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminSectionOverlay({
  sectionId,
  label,
  className,
  children,
}: {
  sectionId: SectionId;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <Link
        to="/admin/edit/$section"
        params={{ section: sectionId }}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 inline-flex items-center gap-1 bg-foreground text-background px-2 sm:px-3 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold shadow-card hover:scale-105 transition-transform"
        title={`Editar: ${label}`}
      >
        <Pencil className="size-3 sm:size-3.5" />
        <span className="hidden sm:inline">Editar</span>
      </Link>
    </div>
  );
}
