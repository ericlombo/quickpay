/**
 * Format a date string or Date object to a readable format
 * @param date - Date string or Date object
 * @returns Formatted date string (e.g., "Mar 15, 2024")
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Format a currency amount
 * @param amount - Numeric amount
 * @returns Formatted currency string (e.g., "$299.99")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number as currency without the dollar sign
 * @param amount - Numeric amount
 * @returns Formatted number string (e.g., "299.99")
 */
export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

/**
 * Format invoice number
 * @param invoiceNumber - Invoice number string
 * @returns Formatted invoice number
 */
export function formatInvoiceNumber(invoiceNumber: string): string {
  return invoiceNumber.toUpperCase();
}

