'use client';

import { Button } from "../ui/button"
import { Album, CircleUser, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
    onClickLogin?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickLogin, className }) => {
    const { data: session, status } = useSession();

    const isLoading = status === "loading";

    const router = useRouter();

    return (
        <div>
            {
                !session ? <Button onClick={onClickLogin} loading={isLoading} variant="outline" className={cn(className)}>
                    <User size={16} className="mr-2" />
                    Войти
                </Button>
                    : <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild className="flex items-center">
                            <Button variant="outline" className={cn(className)}>
                                <CircleUser size={16} className="mr-2" />
                                {session.user.name}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push('/recipes')}
                            >
                                <Album />
                                Мои рецепты
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push('/profile')}
                            >
                                <Settings />
                                Профиль
                            </DropdownMenuItem>
                            {

                            }
                            <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                                <LogOut />
                                Выйти
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

            }
        </div>
    )

}