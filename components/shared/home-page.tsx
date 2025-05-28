'use client';

import React from "react";
import { Stories } from "./stories";
import { Container } from "./container";
import { useSession } from "next-auth/react";
import { RecipeOfADayCard } from "./recipe-of-a-day";

export const HomePage = () => {

    const { data: session } = useSession();

    return (
        <Container>
            <Stories />
            <RecipeOfADayCard />
        </Container>
    )

}