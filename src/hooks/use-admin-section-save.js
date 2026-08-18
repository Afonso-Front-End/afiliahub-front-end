import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { saveSection } from "@/api/cms";
import {
  patchSiteContentSection,
  reloadSiteContentFromServer,
} from "@/lib/site-content-query";

export function useAdminSectionSave(sectionId) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (formData) => {
    setSaving(true);
    setSaved(false);

    try {
      const savedSection = await saveSection({
        data: { sectionId, data: formData },
      });

      patchSiteContentSection(queryClient, sectionId, savedSection);
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
