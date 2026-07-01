/**
 * Auth context scaffold.
 *
 * Typed contract for the rest of the app. The concrete implementation
 * (Lovable Cloud / Supabase / custom) will be wired in a later step.
 * Handlers currently simulate a network round-trip so UI states
 * (loading / error / success) can be developed and validated end-to-end.
 */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string, remember?: boolean) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

// Tiny helper to simulate async work without lying about success.
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      signIn: async (email) => {
        await wait(600);
        setUser({ id: "preview-user", name: email.split("@")[0] ?? "Utilizador", email });
      },
      signUp: async (name, email) => {
        await wait(700);
        setUser({ id: "preview-user", name, email });
      },
      signOut: async () => {
        await wait(200);
        setUser(null);
      },
      requestPasswordReset: async () => {
        await wait(600);
      },
      updatePassword: async () => {
        await wait(600);
      },
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
