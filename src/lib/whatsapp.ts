const FALLBACK_NUMBER = "254141576254";

function number(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_NUMBER;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${number()}?text=${encodeURIComponent(message)}`;
}

export const PRODUCT_WA_MESSAGES = {
  product: (productName: string) =>
    `Hello ABZ Capital, I am interested in ${productName}. Kindly assist me with details.`,
  simulator: (takeHome: number, months: number, total: number) =>
    `Hello ABZ Capital, I simulated a logbook loan: KES ${takeHome.toLocaleString()} take-home over ${months} ${months === 1 ? "month" : "months"}. Total repayment KES ${total.toLocaleString()}. I'd like to proceed.`,
  contact: () =>
    `Hello ABZ Capital, I'd like to chat with your team.`,
  funding: () =>
    `Hello ABZ Capital, I'd like to submit a funding opportunity. When can we talk?`,
  investor: () =>
    `Hello ABZ Capital, I'd like to learn more about investor opportunities.`,
};
