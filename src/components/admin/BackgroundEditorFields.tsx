import type { SectionBackground } from "@/types/cms";
import { cn } from "@/lib/utils";

function ColorSwatchInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (color: string) => void;
  label: string;
}) {
  return (
    <label className="relative size-9 shrink-0 cursor-pointer overflow-visible">
      <span
        aria-hidden
        className="block size-full rounded-lg border border-border bg-background shadow-soft"
        style={{ backgroundColor: value }}
      />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
      />
    </label>
  );
}

function ColorFieldRow({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (color: string) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5 overflow-visible">
      <ColorSwatchInput value={value} onChange={onChange} label={label} />
      <span className="text-xs font-mono text-muted-foreground">{value}</span>
    </div>
  );
}

export function BackgroundTypeToggle({
  value,
  onChange,
}: {
  value: SectionBackground;
  onChange: (bg: SectionBackground) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() =>
          onChange({
            type: "gradient",
            from: value.from ?? "#fce7f3",
            to: value.to ?? "#e0e7ff",
            angle: value.angle ?? 135,
          })
        }
        className={cn(
          "px-4 py-2 rounded-full text-xs font-semibold transition-colors",
          value.type === "gradient"
            ? "bg-foreground text-background shadow-card"
            : "bg-surface border border-border hover:bg-accent",
        )}
      >
        Gradiente
      </button>
      <button
        type="button"
        onClick={() => onChange({ type: "solid", color: value.color ?? "#ffffff" })}
        className={cn(
          "px-4 py-2 rounded-full text-xs font-semibold transition-colors",
          value.type === "solid"
            ? "bg-foreground text-background shadow-card"
            : "bg-surface border border-border hover:bg-accent",
        )}
      >
        Cor sólida
      </button>
    </div>
  );
}

function BackgroundGradientColorField({
  title,
  label,
  color,
  fallback,
  onChange,
}: {
  title: string;
  label: string;
  color?: string;
  fallback: string;
  onChange: (color: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold">{title}</span>
      <ColorFieldRow label={label} value={color ?? fallback} onChange={onChange} />
    </label>
  );
}

function BackgroundGradientAngleField({
  angle,
  onChange,
}: {
  angle?: number;
  onChange: (angle: number) => void;
}) {
  const currentAngle = angle ?? 135;

  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold">Ângulo {currentAngle}°</span>
      <input
        type="range"
        min={0}
        max={360}
        value={currentAngle}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary mt-3"
      />
    </label>
  );
}

export function BackgroundGradientFields({
  value,
  onChange,
}: {
  value: SectionBackground;
  onChange: (bg: SectionBackground) => void;
}) {
  const updateGradient = (patch: Partial<SectionBackground>) =>
    onChange({ ...value, type: "gradient", ...patch });

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <BackgroundGradientColorField
        title="Cor inicial"
        label="Cor inicial"
        color={value.from}
        fallback="#fce7f3"
        onChange={(from) => updateGradient({ from })}
      />
      <BackgroundGradientColorField
        title="Cor final"
        label="Cor final"
        color={value.to}
        fallback="#e0e7ff"
        onChange={(to) => updateGradient({ to })}
      />
      <BackgroundGradientAngleField
        angle={value.angle}
        onChange={(angle) => updateGradient({ angle })}
      />
    </div>
  );
}

export function BackgroundSolidField({
  value,
  onChange,
}: {
  value: SectionBackground;
  onChange: (bg: SectionBackground) => void;
}) {
  return (
    <label className="space-y-2 block">
      <span className="text-xs font-semibold">Cor de fundo</span>
      <ColorFieldRow
        label="Cor de fundo"
        value={value.color ?? "#ffffff"}
        onChange={(color) => onChange({ type: "solid", color })}
      />
    </label>
  );
}
