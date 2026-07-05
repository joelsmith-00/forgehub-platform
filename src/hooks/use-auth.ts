import { useEffect, useState } from "react";
import { getCurrentUser, seedDemoAccounts, subscribeAuth, type ForgeUser } from "@/lib/auth";

export interface AuthState {
  user: ForgeUser | null;
  loading: boolean;
}

/**
 * Returns { user, loading }. `loading` is true during SSR and the first
 * client tick before localStorage has been consulted. Route guards should
 * only redirect when `loading === false && user === null` — otherwise the
 * user gets kicked out immediately after signup/login because the hook
 * hasn't hydrated yet.
 */
export function useAuth(): AuthState {
  // Start in a loading state so SSR and first client render agree (no
  // hydration mismatch, and no premature redirect).
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  useEffect(() => {
    seedDemoAccounts();
    setState({ user: getCurrentUser(), loading: false });
    const unsub = subscribeAuth(() => {
      setState({ user: getCurrentUser(), loading: false });
    });
    return () => {
      unsub();
    };
  }, []);

  return state;
}
