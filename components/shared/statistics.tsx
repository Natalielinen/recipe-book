'use client';

import { Api } from "@/app/services/api-client";
import React, { useState } from "react";
import { User } from "@/generated/prisma";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface StatisticsProps {
    data: User;
}

type UserStatistics = {
    recipesCount: number;
    recipesByCategory: Array<{
        categoryName: string;
        recipesCount: number;
    }>;
}

export const Statistics: React.FC<StatisticsProps> = ({ data }) => {

    const [statistics, setStatistics] = useState<UserStatistics>({
        recipesCount: 0,
        recipesByCategory: []
    });
    const [loading, setLoading] = React.useState(false);

    const fetchRecipesInfo = async () => {
        setLoading(true);
        const response = await Api.recipes();

        setStatistics({
            recipesCount: response.reduce((acc, item) => acc + item.recipes.length, 0),
            recipesByCategory: response.map((el) => ({ categoryName: el.nameKey, recipesCount: el.recipes.length }))
        })

        setLoading(false);
    };

    React.useEffect(() => {
        fetchRecipesInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <ul className="mt-10 border-l-muted-foreground">
        <li>
            {
                loading
                    ? <Skeleton className="w-full h-[30px] rounded-2xl mb-1" />
                    : <Link href={`/recipes`} className="hover:underline hover:text-primary">
                        Всего рецептов: <b>{statistics.recipesCount}</b>
                    </Link>
            }

        </li>
        <li>Рецептов по категориям:
            {' '}
            {
                loading
                    ? <Skeleton className="w-full h-[90px] rounded-2xl mb-1" />
                    : <ul className="ml-4">
                        {statistics.recipesByCategory.map((el) => <li key={el.categoryName}>
                            {el.categoryName}: <b>{el.recipesCount}</b>
                        </li>)}
                    </ul>
            }

        </li>
    </ul>

}
