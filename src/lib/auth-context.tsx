/**
 * Auth context scaffold.
 *
 * This is the interface the rest of the app uses for authentication.
 * The actual implementation (Lovable Cloud / Supabase / custom) will be
 * wired up in a later step. For now it exposes a typed contract and a
 * no-op provider so the UI, route guards and sessions can be built on top.
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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      // Placeholder implementations — to be replaced by the real backend.
      signIn: async (email) => {
        setUser({ id: "preview-user", name: email.split("@")[0] ?? "Utilizador", email });
      },
      signUp: async (name, email) => {
        setUser({ id: "preview-user", name, email });
      },
      signOut: async () => {
        setUser(null);
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
