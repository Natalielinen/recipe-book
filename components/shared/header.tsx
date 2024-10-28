'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import { Album } from "lucide-react";
import { ThemeButton } from "./theme-button";
import { LanguagesSwitcher } from "./languages-switcher";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./auth";
import React from "react";

interface Props {
    className?: string;
    lng: string;
}

export const Header: React.FC<Props> = ({ className, lng }) => {

    const [showAuthModal, setShowAuthModal] = React.useState(false);

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
                <AuthModal
                    lng={lng}
                    open={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                />
                <ThemeButton />
                <LanguagesSwitcher lng={lng} />
                <ProfileButton lng={lng} onClickLogin={() => setShowAuthModal(true)} />
            </div>
        </Container>
    </header>
};