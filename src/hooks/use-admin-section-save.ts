import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { saveSection } from "@/api/cms";
import { reloadSiteContentFromServer } from "@/lib/site-content-query";
import type { SectionContentMap, SectionId } from "@/types/cms";

export function useAdminSectionSave(sectionId: SectionId) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (formData: SectionContentMap[SectionId]) => {
    setSaving(true);
    setSaved(false);
    try {
      await saveSection({
        data: { sectionId, data: formData as Record<string, unknown> },
      });
      await reloadSiteContentFromServer(queryClient);
      await router.invalidate();
      setSaved(true);
      setTimeout(() => setSaved(false), 4000);
    } finally {
      setSaving(false);
    }
  };

  return { saving, saved, handleSave };
}
