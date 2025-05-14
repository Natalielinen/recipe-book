import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared";
import { Providers } from "@/components/shared/providers";
import React from "react";

const nunito = Nunito({ subsets: ["latin", "cyrillic", "latin-ext"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={nunito.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
