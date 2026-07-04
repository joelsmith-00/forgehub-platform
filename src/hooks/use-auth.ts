import { useEffect, useState } from "react";
import { getCurrentUser, seedDemoAccounts, subscribeAuth, type ForgeUser } from "@/lib/auth";

export function useAuth(): ForgeUser | null {
  const [user, setUser] = useState<ForgeUser | null>(() => getCurrentUser());
  useEffect(() => {
    seedDemoAccounts();
    setUser(getCurrentUser());
    const unsub = subscribeAuth(() => setUser(getCurrentUser()));
    return () => {
      unsub();
    };
  }, []);
  return user;
}
