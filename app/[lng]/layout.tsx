import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { dir } from 'i18next';
import "./globals.css";
import { AddRecipeModal, Header, ThemeProvider } from "@/components/shared";
import { languages } from '../i18n/settings'
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const nunito = Nunito({ subsets: ["latin", "cyrillic", "latin-ext"] });

export const metadata: Metadata = {
  title: "Рецепты | Главная",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lng={lng} />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
