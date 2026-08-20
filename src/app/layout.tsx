import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saguta Sultra - Ekosistem Digital Sagu",
  description:
    "Marketplace komoditas sagu dan pusat informasi rantai nilai sagu Sulawesi Tenggara.",
  icons: {
    icon: "/images/branding/saguta-logo.png",
    apple: "/images/branding/saguta-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
