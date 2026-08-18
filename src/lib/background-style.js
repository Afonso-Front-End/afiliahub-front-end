import { gradientBackgroundStyle } from "@/lib/background-gradient";
export function backgroundStyle(bg) {
    if (bg.type === "gradient")
        return gradientBackgroundStyle(bg);
    if (bg.color)
        return { backgroundColor: bg.color };
    return {};
}
