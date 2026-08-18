import { getImageExtension } from "@/lib/image-extension";
const EXTENSION_LABELS = {
    png: "PNG",
    jpg: "JPG",
    jpeg: "JPG",
    webp: "WebP",
    gif: "GIF",
};
const FILE_TYPE_LABELS = [
    ["png", "PNG"],
    ["jpeg", "JPG"],
    ["jpg", "JPG"],
    ["webp", "WebP"],
    ["gif", "GIF"],
];
function labelFromFileType(fileType) {
    if (!fileType)
        return null;
    const lower = fileType.toLowerCase();
    return FILE_TYPE_LABELS.find(([hint]) => lower.includes(hint))?.[1] ?? null;
}
function labelFromUrl(url) {
    const ext = getImageExtension(url);
    if (!ext)
        return null;
    return EXTENSION_LABELS[ext] ?? (ext.startsWith("jp") ? "JPG" : null);
}
export function getImageFormatLabel(url, fileType) {
    return labelFromFileType(fileType) ?? labelFromUrl(url) ?? "Imagem";
}
