import { Pencil } from "lucide-react";
import { SECTION_LABELS } from "@/data/admin-sections";
import type { SectionId } from "@/types/cms";

export function AdminEditSectionHeader({ sectionId }: { sectionId: SectionId }) {
  return (
    <div className="rounded-3xl bg-surface border border-border p-6 shadow-soft">
      <div className="flex items-start gap-3">
        <div className="size-11 rounded-2xl bg-gradient-cta grid place-items-center shadow-glow shrink-0">
          <Pencil className="size-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">{SECTION_LABELS[sectionId]}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Use &quot;Guardar&quot; em cada card ou &quot;Guardar tudo&quot; no final.
          </p>
        </div>
      </div>
    </div>
  );
}
