import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://elcompapitch.com"
  ),
  title: {
    default: "El Compapitch Tools — Inteligencia artificial para brokers",
    template: "%s · El Compapitch Tools",
  },
  description:
    "Regístrate gratis, recibe 80 créditos de bienvenida y usa herramientas de IA listas para vender más propiedades.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={plusJakarta.variable}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
