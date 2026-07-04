import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type EstablishmentStatus = "active" | "draft";

export type EstablishmentCategory =
  | "restaurant"
  | "cafe"
  | "pastry"
  | "pizzeria"
  | "burger"
  | "bakery"
  | "gelato"
  | "sushi"
  | "foodtruck"
  | "bar"
  | "other";

export interface EstablishmentBranding {
  primaryColor: string;
  secondaryColor: string;
  theme: "light" | "dark";
  logoUrl?: string | null;
  coverUrl?: string | null;
}

export interface EstablishmentSocial {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export interface EstablishmentContact {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
}

export interface EstablishmentAddress {
  street?: string;
  city?: string;
  postalCode?: string;
}

export interface Establishment {
  id: string;
  name: string;
  category: EstablishmentCategory;
  description?: string;
  status: EstablishmentStatus;
  menusCount: number;
  updatedAt: string; // ISO
  branding: EstablishmentBranding;
  contact: EstablishmentContact;
  address: EstablishmentAddress;
  openingHours?: string;
  social: EstablishmentSocial;
}

export type EstablishmentInput = Omit<Establishment, "id" | "menusCount" | "updatedAt">;

interface EstablishmentsContextValue {
  establishments: Establishment[];
  activeId: string | null;
  activeEstablishment: Establishment | null;
  setActiveId: (id: string | null) => void;
  create: (input: EstablishmentInput) => Establishment;
  update: (id: string, input: EstablishmentInput) => void;
  remove: (id: string) => void;
  duplicate: (id: string) => Establishment | null;
}

const EstablishmentsContext = createContext<EstablishmentsContextValue | null>(null);

function uid() {
  return `est_${Math.random().toString(36).slice(2, 10)}`;
}

export function EstablishmentsProvider({ children }: { children: ReactNode }) {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const create = useCallback((input: EstablishmentInput) => {
    const entity: Establishment = {
      ...input,
      id: uid(),
      menusCount: 0,
      updatedAt: new Date().toISOString(),
    };
    setEstablishments((prev) => [entity, ...prev]);
    setActiveId((prev) => prev ?? entity.id);
    return entity;
  }, []);

  const update = useCallback((id: string, input: EstablishmentInput) => {
    setEstablishments((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, ...input, updatedAt: new Date().toISOString() } : e,
      ),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setEstablishments((prev) => prev.filter((e) => e.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  }, []);

  const duplicate = useCallback((id: string): Establishment | null => {
    let copy: Establishment | null = null;
    setEstablishments((prev) => {
      const source = prev.find((e) => e.id === id);
      if (!source) return prev;
      copy = {
        ...source,
        id: uid(),
        name: `${source.name} (copy)`,
        status: "draft",
        menusCount: 0,
        updatedAt: new Date().toISOString(),
      };
      return [copy, ...prev];
    });
    return copy;
  }, []);

  const value = useMemo<EstablishmentsContextValue>(
    () => ({
      establishments,
      activeId,
      activeEstablishment: establishments.find((e) => e.id === activeId) ?? null,
      setActiveId,
      create,
      update,
      remove,
      duplicate,
    }),
    [establishments, activeId, create, update, remove, duplicate],
  );

  return (
    <EstablishmentsContext.Provider value={value}>{children}</EstablishmentsContext.Provider>
  );
}

export function useEstablishments() {
  const ctx = useContext(EstablishmentsContext);
  if (!ctx) throw new Error("useEstablishments must be used within EstablishmentsProvider");
  return ctx;
}

export const ESTABLISHMENT_CATEGORIES: EstablishmentCategory[] = [
  "restaurant",
  "cafe",
  "pastry",
  "pizzeria",
  "burger",
  "bakery",
  "gelato",
  "sushi",
  "foodtruck",
  "bar",
  "other",
];
