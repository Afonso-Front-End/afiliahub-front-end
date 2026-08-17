import { getImageFormatLabel } from "@/lib/image-format-label";

export function useImageFieldState(value: string, fallback: string | undefined, fileType?: string) {
  const preview = value || fallback || "";
  const format = getImageFormatLabel(preview, fileType);
  const isPng = format === "PNG";

  return { preview, format, isPng };
}
