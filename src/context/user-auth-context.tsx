import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getUserSession, logoutUser } from "@/api/user-auth";
import type { PublicUser } from "@/types/user";

type UserAuthContextValue = {
  user: PublicUser | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserAuthContext = createContext<UserAuthContextValue | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    try {
      const session = await getUserSession();
      setUser(session?.user ?? null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      refresh,
      logout: async () => {
        await logoutUser();
        setUser(null);
      },
    }),
    [user, isLoading],
  );

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within UserAuthProvider");
  return ctx;
}
