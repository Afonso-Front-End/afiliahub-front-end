export function getImageExtension(url) {
    const clean = url.split("?")[0].toLowerCase();
    const match = clean.match(/\.(png|jpe?g|webp|gif)$/);
    return match?.[1] ?? null;
}
export function isPngImage(url) {
    return getImageExtension(url) === "png";
}
