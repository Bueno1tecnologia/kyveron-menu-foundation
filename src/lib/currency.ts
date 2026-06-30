/**
 * Currency utilities — default EUR, prepared for multi-currency expansion.
 */
export type CurrencyCode = "EUR" | "USD" | "GBP" | "BRL";

export const DEFAULT_CURRENCY: CurrencyCode = "EUR";

const localeForCurrency: Record<CurrencyCode, string> = {
  EUR: "pt-PT",
  USD: "en-US",
  GBP: "en-GB",
  BRL: "pt-BR",
};

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  locale?: string,
): string {
  return new Intl.NumberFormat(locale ?? localeForCurrency[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
