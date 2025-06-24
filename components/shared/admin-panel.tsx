'use client';

import { cn } from "@/lib/utils";
import { BookText, Settings, Soup } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminPanel = () => {

    const pathName = usePathname();

    const links = [
        {
            label: 'Профиль',
            path: '/profile',
            icon: <Settings size={16} />
        },
        {
            label: 'Сторис',
            path: '/profile/add-story',
            icon: <BookText size={16} />
        },
        {
            label: 'Рецепт дня',
            path: '/profile/add-recipe-of-the-day',
            icon: <Soup size={16} />
        },
    ]

    return <nav className="p-2 overflow-auto shadow-md rounded-md mb-4">
        <ul className="flex gap-6 text-sm font-bold">
            {links.map((link) => (
                <li key={link.path}>
                    <Link
                        className={cn(
                            'flex gap-1 flex-col items-center',
                            pathName === link.path ? (
                                'underline underline-offset-4 decoration-primary text-primary'
                            ) : (
                                'text-muted-foreground'
                            )
                        )}
                        href={link.path}
                    >
                        {link.icon} {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
};