import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/product";

const Kumbh_San = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecommerce | Webapp",
  description: "A Shopping Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Kumbh_San.variable} antialiased`}>
        <CartProvider>
          <main className="max-w-4xl mx-auto">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
