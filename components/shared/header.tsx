'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import { Album } from "lucide-react";
import { ThemeButton } from "./theme-button";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./auth";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { SearchInput } from "./search-input";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {

    const router = useRouter();

    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname()

    const hasSearch = pathname.includes('recipes');

    React.useEffect(() => {

        let toastMessage = '';

        if (searchParams.has('verified')) {
            toastMessage = 'Ваш аккаунт успешно подтвержден';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return <header className={cn('border border-b', className as string)}>
        <Container className="flex flex-wrap items-center justify-between py-8">
            {/* Левая часть */}
            <Link href="/">
                <div className="flex items-center gap-4">

                    <div>
                        <h1 className="text-2xl uppercase font-black flex gap-1 items-center">Книга <Album /></h1>
                        <h1 className="text-2xl uppercase font-black flex gap-1 items-center">Рецептов</h1>
                    </div>
                </div>
            </Link>

            {/* Поиск */}
            {
                hasSearch && <div className="w-full order-3 mt-4 md:order-none md:mt-0 md:mx-10 md:flex-1">
                    <SearchInput />
                </div>
            }

            {/* Правая часть */}
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-3">
                <AuthModal
                    open={showAuthModal}
                    onClose={() => setShowAuthModal(false)}
                />
                <ThemeButton />
                <ProfileButton onClickLogin={() => setShowAuthModal(true)} />
            </div>
        </Container>
    </header>
};