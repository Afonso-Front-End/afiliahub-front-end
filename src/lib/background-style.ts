import type { SectionBackground } from "@/types/cms";
import type { CSSProperties } from "react";
import { gradientBackgroundStyle } from "@/lib/background-gradient";

export function backgroundStyle(bg: SectionBackground): CSSProperties {
  if (bg.type === "gradient") return gradientBackgroundStyle(bg);
  if (bg.color) return { backgroundColor: bg.color };
  return {};
}
