import { Link } from "@tanstack/react-router";
import { Bell, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

function HeaderBadge({ count }: { count: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
      {count}
    </span>
  );
}

function HeaderToolbarButton({
  onClick,
  label,
  expanded,
  active,
  children,
}: {
  onClick: () => void;
  label: string;
  expanded: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative size-10 sm:size-11 grid place-items-center rounded-2xl transition-colors",
        active ? "bg-accent text-accent-foreground" : "bg-muted hover:bg-accent",
      )}
      aria-label={label}
      aria-expanded={expanded}
    >
      {children}
    </button>
  );
}

export function HeaderActionButtons({
  notificationsOpen,
  onToggleNotifications,
  favoritesOpen,
  onToggleFavorites,
  favoritesCount,
  unreadNotifications,
  userInitials,
  accountHref,
}: {
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
  favoritesOpen: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  unreadNotifications: number;
  userInitials: string;
  accountHref: "/conta" | "/conta/entrar";
}) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
      <HeaderToolbarButton
        onClick={onToggleNotifications}
        label="Notificações"
        expanded={notificationsOpen}
      >
        <Bell className="size-4" />
        {unreadNotifications > 0 && <HeaderBadge count={unreadNotifications} />}
      </HeaderToolbarButton>
      <HeaderToolbarButton
        onClick={onToggleFavorites}
        label="Favoritos"
        expanded={favoritesOpen}
        active={favoritesOpen}
      >
        <Heart className={cn("size-4", favoritesCount > 0 && "fill-primary text-primary")} />
        {favoritesCount > 0 && <HeaderBadge count={favoritesCount} />}
      </HeaderToolbarButton>
      <Link
        to={accountHref}
        className="size-10 sm:size-11 shrink-0 rounded-2xl bg-gradient-cta grid place-items-center text-primary-foreground font-bold text-xs sm:text-sm shadow-glow hover:scale-105 transition-transform"
        aria-label="Minha conta"
      >
        {userInitials}
      </Link>
    </div>
  );
}
