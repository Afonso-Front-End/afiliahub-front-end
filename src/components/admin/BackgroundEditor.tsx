import type { SectionBackground } from "@/types/cms";
import { backgroundStyle } from "@/lib/background-style";
import {
  BackgroundGradientFields,
  BackgroundSolidField,
  BackgroundTypeToggle,
} from "@/components/admin/BackgroundEditorFields";
import { Palette } from "lucide-react";

export function BackgroundEditor({
  value,
  onChange,
  title = "Fundo da área",
  description = "Gradiente ou cor sólida",
}: {
  value: SectionBackground;
  onChange: (bg: SectionBackground) => void;
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-xl bg-surface grid place-items-center shadow-soft">
          <Palette className="size-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-[11px] text-muted-foreground">{description}</p>
        </div>
      </div>

      <div
        className="h-20 rounded-2xl border border-border shadow-inner"
        style={backgroundStyle(value)}
      />

      <BackgroundTypeToggle value={value} onChange={onChange} />

      {value.type === "gradient" ? (
        <BackgroundGradientFields value={value} onChange={onChange} />
      ) : (
        <BackgroundSolidField value={value} onChange={onChange} />
      )}
    </div>
  );
}
