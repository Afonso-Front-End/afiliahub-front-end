import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdminSectionOverlay } from "@/components/admin/AdminSectionOverlay";

export function AppLayout({
  children,
  adminMode,
}: {
  children: ReactNode;
  adminMode?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const sidebar = <Sidebar className="hidden lg:flex" adminEdit={adminMode} />;
  const mobileSidebar = <Sidebar className="flex" onNavigate={() => setMenuOpen(false)} adminEdit={adminMode} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-6">
        {sidebar}

        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 p-4 overflow-y-auto bg-background">
              {mobileSidebar}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 size-9 grid place-items-center rounded-full bg-surface shadow-card"
                aria-label="Fechar"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}

        <main className="min-w-0 flex flex-col gap-6">
          <Header onMenu={() => setMenuOpen(true)} adminMode={adminMode} />
          {children}
          {adminMode ? (
            <AdminSectionOverlay sectionId="footer" label="Rodapé">
              <Footer />
            </AdminSectionOverlay>
          ) : (
            <Footer />
          )}
        </main>
      </div>
    </div>
  );
}
