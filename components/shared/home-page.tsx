'use client';


import React from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "../../app/i18n/client";
import { MyRecipesButton } from "./my-recipes-button";

interface Props {
    onClickLogin?: () => void;
    className?: string;
    lng: string;
}

export const HomePage: React.FC<Props> = ({ onClickLogin, className, lng }) => {
    const { t } = useTranslation(lng);
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