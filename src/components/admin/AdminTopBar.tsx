import { useEffect, useRef, useState } from "react";
import { adminLogout } from "@/api/auth";
import { AdminStoreOnlineConfirmDialog } from "@/components/admin/AdminStoreOnlineConfirmDialog";
import { useSiteContent } from "@/context/site-content-context";
import { useStoreOnlineSwitch } from "@/hooks/use-store-online-switch";
import { ADMIN_BAR_ID, ADMIN_BAR_SURFACE_CLASS } from "@/lib/admin-layout";
import { AdminTopBarDesktop, AdminTopBarMobile } from "@/components/admin/AdminTopBarLayout";
import { cn } from "@/lib/utils";

type AdminTopBarProps = {
  title?: string;
  subtitle?: string;
  active?: "preview" | "edit" | "config-apis" | "configuracoes";
  onRefresh?: () => void;
  saveFeedback?: string | null;
};

export function AdminTopBar({
  title = "Modo Admin",
  subtitle = "Gestão de conteúdo do AfiliaHub",
  active = "preview",
  onRefresh,
  saveFeedback,
}: AdminTopBarProps) {
  const { storeOnline } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const {
    dialogOpen,
    goingOnline,
    loading: switching,
    error: switchError,
    requestSwitch,
    cancelSwitch,
    confirmSwitch,
  } = useStoreOnlineSwitch();

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const syncBarHeight = () => {
      document.documentElement.style.setProperty("--admin-bar-height", `${el.offsetHeight}px`);
    };

    syncBarHeight();
    const observer = new ResizeObserver(syncBarHeight);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--admin-bar-height");
    };
  }, [title, subtitle, active, onRefresh, saveFeedback, menuOpen]);

  const logout = async () => {
    await adminLogout();
    window.location.href = "/admin/login";
  };

  const handleStoreToggle = () => {
    requestSwitch(!storeOnline);
  };

  const layoutProps = {
    title,
    subtitle,
    active,
    saveFeedback,
    storeOnline,
    toggling: switching,
    onRefresh,
    onStoreToggle: handleStoreToggle,
    onLogout: logout,
  };

  return (
    <>
      <div id={ADMIN_BAR_ID} ref={barRef} className={cn(ADMIN_BAR_SURFACE_CLASS, "gap-2")}>
        <AdminTopBarDesktop {...layoutProps} />
        <AdminTopBarMobile
          {...layoutProps}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((open) => !open)}
        />
      </div>

      <AdminStoreOnlineConfirmDialog
        open={dialogOpen}
        goingOnline={goingOnline}
        loading={switching}
        error={switchError}
        onConfirm={(password) => void confirmSwitch(password)}
        onCancel={cancelSwitch}
      />
    </>
  );
}
