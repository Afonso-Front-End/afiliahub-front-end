import { cn } from "@/lib/utils";

export function FilterPill({
  label,
  active,
  onClick,
  variant = "default",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "default" | "primary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
        active
          ? variant === "primary"
            ? "bg-primary text-primary-foreground"
            : "bg-foreground text-background"
          : "bg-muted hover:bg-accent",
      )}
    >
      {label}
    </button>
  );
}
