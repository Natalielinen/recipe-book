'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Search, Soup } from 'lucide-react';
import { useClickAway, useDebounce } from 'react-use';
import Link from 'next/link';
import { Recipe } from '@prisma/client';
import { Api } from '@/app/services/api-client';

interface Props {
    className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {

    const [focused, setFocused] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [recipes, setRecipes] = React.useState<Recipe[]>([]);

    const ref = React.useRef<HTMLInputElement>(null);

    useClickAway(ref, () => setFocused(false));

    useDebounce(
        async () => {
            try {
                const response = await Api.search(searchQuery.toLowerCase());
                setRecipes(response);

            } catch (e) {
                console.error(e);
            }

        },
        250,
        [searchQuery]
    );

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setRecipes([]);
        ;
    }

    return (
        <>
            {
                focused &&
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30' />
            }

            <div
                ref={ref}
                className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>

                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

                <input
                    className="rounded-2xl outline-none w-full pl-11 bg-muted"
                    type='text'
                    placeholder='Найти рецепт... (введите название, описание или ингредиент)'
                    onFocus={() => setFocused(true)}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {
                    recipes.length > 0 && <div className={cn(
                        'absolute w-full bg-background rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
                        focused && 'visible opacity-100 top-12',
                    )}>
                        {
                            recipes.map(recipe => (
                                <Link
                                    key={recipe.id}
                                    className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
                                    href={`/recipe/${recipe.id}`}
                                    onClick={onClickItem}
                                >
                                    {
                                        recipe.imageUrl
                                            ? <img
                                                className='rounded-sm h-8 w-8'
                                                src={recipe.imageUrl as string}
                                                alt={recipe.recipeName}
                                                width={32}
                                                height={32}
                                            />
                                            : <Soup size={32} />
                                    }

                                    <span >
                                        {recipe.recipeName}
                                    </span>
                                </Link>

                            ))
                        }

                    </div>
                }

            </div>
        </>

    )
}

