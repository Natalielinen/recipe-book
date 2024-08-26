import { Container, RecipeCard, Title, TopBar } from "@/components/shared";
import { useTranslation } from "../i18n";

export default async function Home({ params: { lng } }: { params: { lng: string } }) {

  const { t } = await useTranslation(lng);

  return (
    <>
      <Container>
        <Title text={t("Все рецепты")} className="font-extrabold mt-10" />
      </Container>

      <TopBar lng={lng} />

      {/* Список рецептов */}
      <Container className="mt-10 pb-14">
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {/* <RecipeCard
              id={1}
              recipeName={t("Рецепт 1")}
              imageUrl="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              shortDescription={t("Описание 1")}
              lng={lng}
            /> */}
          </div>
        </div>
      </Container>


    </>
  );
}
