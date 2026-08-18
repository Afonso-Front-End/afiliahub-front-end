import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageIcon, Upload } from "lucide-react";
import { ImageFieldPreview } from "@/components/admin/ImageFieldPreview";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useImageFieldState } from "@/hooks/use-image-field-state";
import { cn } from "@/lib/utils";
function ImageFieldLabelRow({ label, format, isPng, showFormat, }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "size-8 rounded-xl bg-surface grid place-items-center shadow-soft", children: _jsx(ImageIcon, { className: "size-4 text-primary" }) }), _jsx("p", { className: "text-sm font-semibold", children: label })] }), showFormat && (_jsx("span", { className: cn("text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full", isPng ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"), children: format }))] }));
}
function ImageFieldPngHint() {
    return (_jsx("p", { className: "text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2", children: "PNG com fundo transparente. No card do site a imagem fica contida (n\u00E3o preenche todo o quadrado). Prefira JPG/WebP para fotos que ocupem o card inteiro." }));
}
function ImageFieldUploadControls({ uploading, value, onChange, onFile, }) {
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 cursor-pointer hover:border-primary/40 hover:bg-accent/30 transition-colors", children: [_jsx(Upload, { className: "size-5 text-muted-foreground" }), _jsx("span", { className: "text-xs font-semibold text-center", children: uploading ? "Enviando imagem..." : "Clique para enviar PNG, JPG ou WebP" }), _jsx("input", { type: "file", accept: "image/png,image/jpeg,image/webp,image/gif", className: "hidden", onChange: (e) => onFile(e.target.files?.[0] ?? null) })] }), _jsxs("label", { className: "block space-y-1.5", children: [_jsx("span", { className: "text-xs font-semibold", children: "URL da imagem" }), _jsx("input", { value: value, onChange: (e) => onChange(e.target.value), placeholder: "/uploads/... ou https://...", className: "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/25 focus:border-primary/40" })] })] }));
}
export function ImageField({ label, value, fallback, onChange, variant = "default", imageBackground, }) {
    const { uploading, fileType, handleFile } = useImageUpload(onChange);
    const { preview, format, isPng } = useImageFieldState(value, fallback, fileType);
    return (_jsxs("div", { className: "rounded-2xl border border-border bg-muted/20 p-4 space-y-4", children: [_jsx(ImageFieldLabelRow, { label: label, format: format, isPng: isPng, showFormat: Boolean(preview) }), isPng && variant === "product-card" && _jsx(ImageFieldPngHint, {}), _jsxs("div", { className: "grid sm:grid-cols-[140px_1fr] gap-4 items-start", children: [_jsx(ImageFieldPreview, { preview: preview, isPng: isPng, variant: variant, imageBackground: imageBackground }), _jsx(ImageFieldUploadControls, { uploading: uploading, value: value, onChange: onChange, onFile: handleFile })] })] }));
}
