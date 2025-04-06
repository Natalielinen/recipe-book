'use client';

import React from "react";
import { MyRecipesButton } from "./my-recipes-button";
import { Stories } from "./stories";
import { Container } from "./container";
import { useSession } from "next-auth/react";

export const HomePage = () => {

    const { data: session } = useSession()

    return (
        <Container>
            <Stories />
            {
                session && <MyRecipesButton />

            }

            {/* добавить компонент Рецепт дня, виден для всех пользователей как и сторисы */}
        </Container>
    )

}