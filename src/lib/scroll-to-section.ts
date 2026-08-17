function getMainHeaderOffset(extraGap = 16) {
  const header = document.querySelector<HTMLElement>("[data-main-header]");
  if (!header) return 112;

  const top = Number.parseFloat(getComputedStyle(header).top) || 0;
  return top + header.offsetHeight + extraGap;
}

function isSectionVisibleInViewport(rect: DOMRect, offset: number) {
  return rect.bottom > offset + 40 && rect.top < window.innerHeight - 40;
}

function shouldSkipScroll(rect: DOMRect, offset: number) {
  if (!isSectionVisibleInViewport(rect, offset)) return false;
  if (rect.top >= offset - 12) return true;
  return rect.top < offset && rect.bottom > offset + 100;
}

export function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const offset = getMainHeaderOffset();
  const rect = el.getBoundingClientRect();
  if (shouldSkipScroll(rect, offset)) return;

  const targetTop = rect.top + window.scrollY - offset;
  if (Math.abs(targetTop - window.scrollY) < 8) return;

  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}
