import { useEffect, useState, type ReactNode } from "react";
import { getAdminSession } from "@/api/auth";
import type { SectionId } from "@/types/cms";
import { AdminSectionOverlay } from "./AdminSectionOverlay";

export function AdminPageEditOverlay({
  sectionId,
  label,
  children,
}: {
  sectionId: SectionId;
  label: string;
  children: ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getAdminSession()
      .then((session) => setIsAdmin(!!session))
      .catch(() => setIsAdmin(false));
  }, []);

  if (!isAdmin) return <>{children}</>;

  return (
    <AdminSectionOverlay sectionId={sectionId} label={label}>
      {children}
    </AdminSectionOverlay>
  );
}
