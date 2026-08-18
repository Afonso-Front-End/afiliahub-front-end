import { isPngImage } from "@/lib/image-extension";
import { cn } from "@/lib/utils";
function productImageSizeClass(png) {
    return png ? "object-contain p-3" : "object-cover";
}
function productImageHoverClass(png) {
    return png ? "group-hover:scale-105" : "group-hover:scale-110";
}
export function getProductImageClass(url, withHover = true) {
    const png = isPngImage(url);
    return cn("w-full h-full", productImageSizeClass(png), withHover && productImageHoverClass(png), withHover && "transition-transform duration-500");
}
