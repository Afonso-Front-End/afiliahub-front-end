import { ImageIcon } from "lucide-react";
import { getProductImageClass } from "@/lib/product-image-class";
import { productImageAreaClass, productImageAreaStyle } from "@/lib/product-image-background";
import type { SectionBackground } from "@/types/cms";
import { cn } from "@/lib/utils";

function PreviewPlaceholder() {
  return <ImageIcon className="size-8 text-muted-foreground/40" />;
}

function ProductCardImagePreview({
  preview,
  imageBackground,
}: {
  preview: string;
  imageBackground?: SectionBackground;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        Preview no card
      </p>
      <div className="rounded-2xl bg-surface border border-border p-2 shadow-soft">
        <div
          className={cn(
            "relative aspect-square rounded-xl overflow-hidden",
            productImageAreaClass(imageBackground),
          )}
          style={productImageAreaStyle(imageBackground)}
        >
          {preview ? (
            <img src={preview} alt="" className={getProductImageClass(preview, false)} />
          ) : (
            <div className="w-full h-full grid place-items-center">
              <PreviewPlaceholder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DefaultImagePreview({ preview, isPng }: { preview: string; isPng: boolean }) {
  return (
    <div className="aspect-square rounded-2xl bg-surface border border-border overflow-hidden grid place-items-center shadow-soft">
      {preview ? (
        <img
          src={preview}
          alt=""
          className={cn("w-full h-full", isPng ? "object-contain p-2" : "object-cover")}
        />
      ) : (
        <PreviewPlaceholder />
      )}
    </div>
  );
}

export function ImageFieldPreview({
  preview,
  isPng,
  variant,
  imageBackground,
}: {
  preview: string;
  isPng: boolean;
  variant: "default" | "product-card";
  imageBackground?: SectionBackground;
}) {
  if (variant === "product-card") {
    return <ProductCardImagePreview preview={preview} imageBackground={imageBackground} />;
  }
  return <DefaultImagePreview preview={preview} isPng={isPng} />;
}
