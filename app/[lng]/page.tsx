import { Container, Title } from "@/components/shared";
import { useTranslation } from "../i18n";


export default async function Home({ params: { lng } }: { params: { lng: string } }) {

  const { t } = await useTranslation(lng);

  return (
    <>
      <Container>
        <Title text={t("Все рецепты")} className="font-extrabold mt-10" />
      </Container>
    </>
  );
}
