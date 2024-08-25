'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import { useTranslation } from '../../app/i18n/client'
import { Button } from "../ui/button";
import { Album, User } from "lucide-react";
import { ThemeButton } from "./theme-button";
import { LanguagesSwitcher } from "./languages-switcher";

interface Props {
    className?: string;
    lng: string;
}

export const Header: React.FC<Props> = ({ className, lng }) => {
    const { t } = useTranslation(lng);

    return <header className={cn('border border-b', className as string)}>
        <Container className="flex items-center justify-between py-8">
            {/* Левая часть */}
            <Link href="/">
                <div className="flex items-center gap-4">

                    <div>
                        <h1 className="text-2xl uppercase font-black">Recipes</h1>
                        <h1 className="text-2xl uppercase font-black flex gap-1 items-center">Book <Album /></h1>
                    </div>
                </div>
            </Link>

            {/* Поиск */}
            {/* {
                hasSearch && <div className="mx-10 flex-1">

                    <SearchInput />
                </div>
            } */}

            {/* Правая часть */}
            <div className="flex items-center gap-3">
                <ThemeButton />
                <LanguagesSwitcher lng={lng} />
                <Button variant="outline">
                    <User size={16} className="mr-2" />
                    {t("Войти")}
                </Button>
            </div>
        </Container>
    </header>
};