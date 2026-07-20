import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vikky Perfume House",
  description: "Luxury perfume storefront with catalog, cart, and checkout-ready foundations."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
