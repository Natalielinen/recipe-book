'use client';

import { useCategoryStore } from "@/app/store/category";
import { cn } from "../../lib/utils";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import React from "react";

interface Props {
    className?: string;
    categories: Category[]
}


export const Categories: React.FC<Props> = ({ className, categories }) => {

    const menuOpen = useCategoryStore((state) => state.menuOpen);
    const setMenuOpen = useCategoryStore((state) => state.setMenuOpen);

    const activeCategoryId = useCategoryStore((state) => state.activeId);

    return <div className="relative">
        <Button className={cn(
            'lg:hidden',
            'xl:hidden',
        )}
            onClick={() => setMenuOpen(!menuOpen)}
        >
            <AlignJustify />

        </Button>
        <div className={cn(
            'lg:inline-flex lg:gap-1',
            'xl:inline-flex xl:gap-2',
            'md:width-[250px]',
            'sm:width-[250px]',
            menuOpen ? 'block' : 'hidden',
            'bg-secondary p-1 rounded-2xl', // общие классы для любой шириный экрана
            className
        )}>
            {
                categories.map((category) => {
                    return <a
                        key={category.id}
                        href={`#${category.nameKey}`}
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            activeCategoryId === category.id && 'bg-background shadow-md shadow-shd text-primary'
                        )}
                    >
                        <button>{category.nameKey}</button>
                    </a>
                })
            }
        </div>
    </div>
};