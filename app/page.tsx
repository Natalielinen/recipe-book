import { Container, Stories, SupportModal } from "@/components/shared";
import { RecipeOfADayCard } from "@/components/shared/recipe-of-a-day";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const generateMetadata = async (): Promise<Metadata> => {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang");

  const titles: Record<string, string> = {
    ru: "Книга рецептов",
    en: "Recipe book",
  };

  const descriptions: Record<string, string> = {
    ru: "Собирай свои любимые рецепты. Книга для записи, хранения и редактирования рецептов.",
    en: "Save your favorite recipes. A book for recording, storage and editing recipes.",
  };
  return {
    title: titles[lang?.value || "ru"],
    description: descriptions[lang?.value || "ru"],
    keywords: ['рецепты', 'кулинария', 'еда', 'обед', 'ужин', 'кухня', 'блюда', 'готовка', 'книга рецептов', 'хранение рецептов', 'книга для записи рецептов', 'мои рецепты',],
    alternates: {
      canonical: 'https://myrecipebook.ru',
    },

  }
}

export default function Home() {

  return (
    <Container>
      <Stories />
      <RecipeOfADayCard />

      <SupportModal />
    </Container>
  )
} 
