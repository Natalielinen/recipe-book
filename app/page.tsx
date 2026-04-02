import { Container, Stories, SupportModal } from "@/components/shared";
import { RecipeOfADayCard } from "@/components/shared/recipe-of-a-day";
import { Lang, translation } from "@/translation/translation";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const generateMetadata = async (): Promise<Metadata> => {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang");

  return {
    title: translation[lang?.value as Lang].title,
    description: translation[lang?.value as Lang].description,
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
