import { isPngImage } from "@/lib/image-extension";
import { cn } from "@/lib/utils";

export function getFlashDealImageClass(url: string) {
  const png = isPngImage(url);
  return cn(
    png ? "object-contain w-[78%] h-[78%] max-w-full max-h-full" : "w-full h-full object-cover",
  );
}
