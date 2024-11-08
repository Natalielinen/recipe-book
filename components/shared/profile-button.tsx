'use client';

import { Button } from "../ui/button"
import { CircleUser, User } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
    onClickLogin?: () => void;
    className?: string;
}

export const ProfileButton: React.FC<Props> = ({ onClickLogin, className }) => {
    const { data: session } = useSession();
    return (
        <div>
            {
                !session ? <Button onClick={onClickLogin} variant="outline" className={cn(className)}>
                    <User size={16} className="mr-2" />
                    Войти
                </Button>
                    : <Link href={`/profile`}>
                        <Button variant="outline" className={cn(className)}>
                            <CircleUser size={16} className="mr-2" />
                            Профиль
                        </Button>
                    </Link>
            }
        </div>
    )

}