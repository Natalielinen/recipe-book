import { Container, Stories } from "@/components/shared";
import { RecipeOfADayCard } from "@/components/shared/recipe-of-a-day";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Книга рецептов",
  description: 'Собирай свои любимые рецепты. Книга для записи, хранения и редактирования рецептов.',
  keywords: ['рецепты', 'кулинария', 'еда', 'обед', 'ужин', 'кухня', 'блюда', 'готовка', 'книга рецептов', 'хранение рецептов', 'книга для записи рецептов', 'мои рецепты', 'рецепт драников'],
  alternates: {
    canonical: 'https://myrecipebook.ru',
  },

});

export default function Home() {

  return (
    <Container>
      <Stories />
      <RecipeOfADayCard />
    </Container>
  )
} 
