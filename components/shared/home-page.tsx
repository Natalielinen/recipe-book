'use client';


import React from "react";
import { useSession } from "next-auth/react";
import { MyRecipesButton } from "./my-recipes-button";

interface Props {
    lng: string;
}

export const HomePage: React.FC<Props> = ({ lng }) => {
    const { data: session } = useSession();
    return (
        <div>
            {
                session ? <MyRecipesButton lng={lng} /> : <div>Not authorized</div>

            }
            root layout page home
        </div>
    )

}