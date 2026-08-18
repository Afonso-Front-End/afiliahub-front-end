import { backgroundStyle } from "@/lib/background-style";
export const DEFAULT_PRODUCT_IMAGE_BACKGROUND = {
    type: "solid",
    color: "#ffffff",
};
export function productImageAreaStyle(background) {
    if (!background)
        return undefined;
    return backgroundStyle(background);
}
export function productImageAreaClass(background) {
    return background ? undefined : "bg-surface-soft";
}
