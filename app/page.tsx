import { HomePage } from "@/components/shared";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "Книга рецептов",
});

export default function Home() {

  return <HomePage />
} 
