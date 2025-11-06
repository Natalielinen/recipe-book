"use client";

import { cn } from "@/lib/utils";
import { BookText, Eye, Plus, Settings, Soup } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminPanel = () => {
    const pathName = usePathname();

    const links = [
        {
            label: "Профиль",
            path: "/profile",
            icon: <Settings size={16} />,
        },
        {
            label: "Добавить сторис",
            path: "/profile/add-story",
            icon: (
                <div className="flex gap-1">
                    <BookText size={16} /> <Plus size={16} />
                </div>
            ),
        },
        {
            label: "Все сторисы",
            path: "/profile/all-stories",
            icon: (
                <div className="flex gap-1">
                    <BookText size={16} /> <Eye size={16} />
                </div>
            ),
        },
        {
            label: "Добавить рецепт дня",
            path: "/profile/add-recipe-of-the-day",
            icon: (
                <div className="flex gap-1">
                    <Soup size={16} />
                    <Plus size={16} />
                </div>
            ),
        },
        {
            label: "Все рецепты дня",
            path: "/profile/all-recipes",
            icon: (
                <div className="flex gap-1">
                    <Soup size={16} />
                    <Eye size={16} />
                </div>
            ),
        },
    ];

    return (
        <nav className="p-2 overflow-auto shadow-md rounded-md mb-4">
            <ul className="flex gap-6 text-sm font-bold">
                {links.map((link) => (
                    <li key={link.path}>
                        <Link
                            className={cn(
                                "flex gap-1 flex-col items-center",
                                pathName === link.path
                                    ? "underline underline-offset-4 decoration-primary text-primary"
                                    : "text-muted-foreground"
                            )}
                            href={link.path}
                        >
                            {link.icon} {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
