import { getImageFormatLabel } from "@/lib/image-format-label";
export function useImageFieldState(value, fallback, fileType) {
    const preview = value || fallback || "";
    const format = getImageFormatLabel(preview, fileType);
    const isPng = format === "PNG";
    return { preview, format, isPng };
}
