import type { SectionBackground } from "@/types/cms";
import type { CSSProperties } from "react";

export function gradientBackgroundStyle(bg: SectionBackground): CSSProperties {
  if (!bg.from || !bg.to) return {};
  return {
    background: `linear-gradient(${bg.angle ?? 135}deg, ${bg.from}, ${bg.to})`,
  };
}
