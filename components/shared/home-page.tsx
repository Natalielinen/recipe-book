'use client';

import React from "react";
import { MyRecipesButton } from "./my-recipes-button";
import { Stories } from "./stories";
import { Container } from "./container";
import { useSession } from "next-auth/react";
import { RecipeOfADayCard } from "./recipe-of-a-day";

export const HomePage = () => {

    const { data: session } = useSession();

    return (
        <Container>
            <Stories />
            {
                session && <MyRecipesButton />

            }

            <RecipeOfADayCard />
        </Container>
    )

}