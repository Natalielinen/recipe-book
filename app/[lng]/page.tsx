import { LanguagesSwitcher, ThemeButton } from "@/components/shared";
import { useTranslation } from "../i18n";

export default async function Home({ params: { lng } }: { params: { lng: string } }) {

  const { t } = await useTranslation(lng)

  return (
    <main>
      <h1>
        {t("Привет, мир!")}
      </h1>
      <ThemeButton />
      <LanguagesSwitcher lng={lng} />
    </main>
  );
}
