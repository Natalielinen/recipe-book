import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared";
import { Providers } from "@/components/shared/providers";

const nunito = Nunito({ subsets: ["latin", "cyrillic", "latin-ext"] });

export const metadata: Metadata = {
  title: "Главная",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunito.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
