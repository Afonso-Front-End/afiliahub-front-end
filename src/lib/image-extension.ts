export function getImageExtension(url: string): string | null {
  const clean = url.split("?")[0].toLowerCase();
  const match = clean.match(/\.(png|jpe?g|webp|gif)$/);
  return match?.[1] ?? null;
}

export function isPngImage(url: string) {
  return getImageExtension(url) === "png";
}
