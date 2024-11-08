export const dynamic = "force-dynamic";

import { HomePage } from "@/components/shared";

export default function Home({ params: { lng } }: { params: { lng: string } }) {

  return <HomePage lng={lng} />
} 
