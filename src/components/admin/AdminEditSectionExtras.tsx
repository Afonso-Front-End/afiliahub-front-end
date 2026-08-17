import type { SectionId } from "@/types/cms";
import { SECTION_LABELS } from "@/data/admin-sections";

export function editSectionSubtitle(sectionId: SectionId) {
  return SECTION_LABELS[sectionId];
}
