import { HomePage } from "@/components/shared";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Книга рецептов",
  description: 'Собирай свои любимые рецепты. Книга для записи, хранения и редактирования рецептов.',
  keywords: ['рецепты', 'кулинария', 'еда', 'обед', 'ужин', 'кухня', 'блюда', 'готовка', 'книга рецептов', 'хранение рецептов', 'книга для записи рецептов', 'мои рецепты'],
  alternates: {
    canonical: 'https://myrecipebook.ru',
  },

});

export default function Home() {

  return <HomePage />
} 
