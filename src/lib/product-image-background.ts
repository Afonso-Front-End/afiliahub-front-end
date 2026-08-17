import type { SectionBackground } from "@/types/cms";
import { backgroundStyle } from "@/lib/background-style";
import type { CSSProperties } from "react";

export const DEFAULT_PRODUCT_IMAGE_BACKGROUND: SectionBackground = {
  type: "solid",
  color: "#ffffff",
};

export function productImageAreaStyle(background?: SectionBackground): CSSProperties | undefined {
  if (!background) return undefined;
  return backgroundStyle(background);
}

export function productImageAreaClass(background?: SectionBackground) {
  return background ? undefined : "bg-surface-soft";
}
