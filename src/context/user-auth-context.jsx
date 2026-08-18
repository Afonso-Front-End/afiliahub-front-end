import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserSession, logoutUser } from "@/api/user-auth";
const UserAuthContext = createContext(null);
export function UserAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const refresh = async () => {
        try {
            const session = await getUserSession();
            setUser(session?.user ?? null);
        }
        catch {
            setUser(null);
        }
    };
    useEffect(() => {
        refresh().finally(() => setIsLoading(false));
    }, []);
    const value = useMemo(() => ({
        user,
        isLoading,
        refresh,
        logout: async () => {
            await logoutUser();
            setUser(null);
        },
    }), [user, isLoading]);
    return _jsx(UserAuthContext.Provider, { value: value, children: children });
}
export function useUserAuth() {
    const ctx = useContext(UserAuthContext);
    if (!ctx)
        throw new Error("useUserAuth must be used within UserAuthProvider");
    return ctx;
}
