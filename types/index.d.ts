export {};

declare global {
  interface Window {
    YCPay?: any; // 👈️ turn off type checking
  }
}