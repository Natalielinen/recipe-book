import { HomePage } from "@/components/shared";
import React from "react";


export default async function Home({ params: { lng } }: { params: { lng: string } }) {

  return <HomePage lng={lng} />
} 
