import { useEffect, useState } from "react";
import { getAdminSession } from "@/api/auth";

export function useAdminSession(check: boolean) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(!check);

  useEffect(() => {
    if (!check) {
      setIsAdmin(false);
      setReady(true);
      return;
    }

    setReady(false);
    getAdminSession()
      .then((session) => setIsAdmin(!!session))
      .catch(() => setIsAdmin(false))
      .finally(() => setReady(true));
  }, [check]);

  return { isAdmin, ready };
}
