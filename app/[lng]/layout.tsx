import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { dir } from 'i18next';
import "./globals.css";
import { Header, ThemeProvider } from "@/components/shared";
import { languages } from '../i18n/settings'
import { Providers } from "@/components/shared/providers";
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const nunito = Nunito({ subsets: ["latin", "cyrillic", "latin-ext"] });

export const metadata: Metadata = {
  title: "Главная",
  description: "",
};

export default function RootLayout({
  children,
  params: {
    lng
  }
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string
  }
}>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={nunito.className}>
        <Providers>
          <Header lng={lng} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
