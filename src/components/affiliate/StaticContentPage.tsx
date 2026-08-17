import type { ReactNode } from "react";
import { AppLayout } from "@/components/affiliate/AppLayout";
import { StaticPage } from "@/components/affiliate/StaticPage";

export function StaticContentPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <AppLayout>
      <StaticPage title={title} description={description}>
        {children}
      </StaticPage>
    </AppLayout>
  );
}
