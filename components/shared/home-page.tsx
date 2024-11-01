'use client';

import React from "react";
import { MyRecipesButton } from "./my-recipes-button";
import { Stories } from "./stories";
import { useTranslation } from "@/app/i18n/client";
import { Container } from "./container";
import { useSession } from "next-auth/react";

interface Props {
    lng: string;
}

export const HomePage: React.FC<Props> = ({ lng }) => {

    const { t } = useTranslation(lng);

    const { data: session } = useSession()

    return (
        <Container>
            <Stories lng={lng} />
            {
                session && <MyRecipesButton lng={lng} />

            }

            {/* добавить компонент Рецепт дня, виден для всех пользователей как и сторисы */}
        </Container>
    )

}