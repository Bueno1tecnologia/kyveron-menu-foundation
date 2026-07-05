import { useEffect, useState } from "react";

/**
 * Small helper that flips `loading` to false after `delay` ms.
 * Used to simulate initial data loading so we can render skeleton states
 * without a real backend. Replace with real query state when wired up.
 */
export function useSimulatedLoading(delay = 500) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return loading;
}
