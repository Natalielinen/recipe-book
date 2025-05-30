import { HomePage } from "@/components/shared";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Книга рецептов",
  description: 'Собирай свои любимые рецепты.',
  keywords: ['рецепты', 'кулинария', 'еда', 'обед', 'ужин', 'кухня', 'блюда', 'готовка', 'книга рецептов'],
  alternates: {
    canonical: 'https://myrecipebook.ru',
  },

});

export default function Home() {

  return <HomePage />
} 
