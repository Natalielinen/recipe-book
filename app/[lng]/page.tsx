import { Header } from "@/components/shared";

export default function Home({ params: { lng } }: { params: { lng: string } }) {

  return (
    <main>
      <Header lng={lng} />
    </main>
  );
}
