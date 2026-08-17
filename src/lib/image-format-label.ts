import { getImageExtension } from "@/lib/image-extension";

const EXTENSION_LABELS: Record<string, string> = {
  png: "PNG",
  jpg: "JPG",
  jpeg: "JPG",
  webp: "WebP",
  gif: "GIF",
};

const FILE_TYPE_LABELS: [string, string][] = [
  ["png", "PNG"],
  ["jpeg", "JPG"],
  ["jpg", "JPG"],
  ["webp", "WebP"],
  ["gif", "GIF"],
];

function labelFromFileType(fileType?: string): string | null {
  if (!fileType) return null;
  const lower = fileType.toLowerCase();
  return FILE_TYPE_LABELS.find(([hint]) => lower.includes(hint))?.[1] ?? null;
}

function labelFromUrl(url: string): string | null {
  const ext = getImageExtension(url);
  if (!ext) return null;
  return EXTENSION_LABELS[ext] ?? (ext.startsWith("jp") ? "JPG" : null);
}

export function getImageFormatLabel(url: string, fileType?: string) {
  return labelFromFileType(fileType) ?? labelFromUrl(url) ?? "Imagem";
}
