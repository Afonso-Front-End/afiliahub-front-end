import { ImageIcon, Upload } from "lucide-react";
import { ImageFieldPreview } from "@/components/admin/ImageFieldPreview";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useImageFieldState } from "@/hooks/use-image-field-state";
import type { SectionBackground } from "@/types/cms";
import { cn } from "@/lib/utils";

function ImageFieldLabelRow({
  label,
  format,
  isPng,
  showFormat,
}: {
  label: string;
  format: string;
  isPng: boolean;
  showFormat: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-xl bg-surface grid place-items-center shadow-soft">
          <ImageIcon className="size-4 text-primary" />
        </div>
        <p className="text-sm font-semibold">{label}</p>
      </div>
      {showFormat && (
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
            isPng ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground",
          )}
        >
          {format}
        </span>
      )}
    </div>
  );
}

function ImageFieldPngHint() {
  return (
    <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
      PNG com fundo transparente. No card do site a imagem fica contida (não preenche todo o
      quadrado). Prefira JPG/WebP para fotos que ocupem o card inteiro.
    </p>
  );
}

function ImageFieldUploadControls({
  uploading,
  value,
  onChange,
  onFile,
}: {
  uploading: boolean;
  value: string;
  onChange: (url: string) => void;
  onFile: (file: File | null) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 cursor-pointer hover:border-primary/40 hover:bg-accent/30 transition-colors">
        <Upload className="size-5 text-muted-foreground" />
        <span className="text-xs font-semibold text-center">
          {uploading ? "Enviando imagem..." : "Clique para enviar PNG, JPG ou WebP"}
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-xs font-semibold">URL da imagem</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/... ou https://..."
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-primary/25 focus:border-primary/40"
        />
      </label>
    </div>
  );
}

export function ImageField({
  label,
  value,
  fallback,
  onChange,
  variant = "default",
  imageBackground,
}: {
  label: string;
  value: string;
  fallback?: string;
  onChange: (url: string) => void;
  variant?: "default" | "product-card";
  imageBackground?: SectionBackground;
}) {
  const { uploading, fileType, handleFile } = useImageUpload(onChange);
  const { preview, format, isPng } = useImageFieldState(value, fallback, fileType);

  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-4">
      <ImageFieldLabelRow label={label} format={format} isPng={isPng} showFormat={Boolean(preview)} />
      {isPng && variant === "product-card" && <ImageFieldPngHint />}
      <div className="grid sm:grid-cols-[140px_1fr] gap-4 items-start">
        <ImageFieldPreview
          preview={preview}
          isPng={isPng}
          variant={variant}
          imageBackground={imageBackground}
        />
        <ImageFieldUploadControls
          uploading={uploading}
          value={value}
          onChange={onChange}
          onFile={handleFile}
        />
      </div>
    </div>
  );
}
