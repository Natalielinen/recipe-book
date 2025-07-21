'use client';

import { Check, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Title } from "./title";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Api } from "@/app/services/api-client";
import { Skeleton } from "../ui/skeleton";
import { RecipeOfADayDTO } from "@/app/services/dto/recipeOfADay.dto";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { getColumnsCount } from "@/lib/get-columns-count";
import { TooltipButton } from "./tooltip-button";
import { RecipeOfferModal } from "./recipe-offer-modal";

export const RecipeOfADayCard = () => {

    const { data: session, status } = useSession();
    const { user } = session || {};

    const [voted, setVoted] = useState(0);
    const [currentUserVoted, setCurrentUserVoted] = useState<boolean>(false);
    const [userHasRecipe, setUserHasRecipe] = useState(false);
    const [recipeOfADay, setRecipeOfADay] = useState<RecipeOfADayDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingRecipe, setAddingRecipe] = useState(false);
    const [openRecipeOfferModal, setOpenRecipeOfferModal] = useState<boolean>(false);

    const fetchRecipeOfADay = async () => {
        const response = await Api.recipeOfADay();
        setLoading(false);
        setRecipeOfADay(response);
    };

    useEffect(() => {
        if (status === 'authenticated') {
            setCurrentUserVoted(recipeOfADay?.votedUsersIds.includes(Number(session?.user.id)) as boolean);
            setUserHasRecipe(recipeOfADay?.usersIdsAddedRecipe.includes(Number(session?.user.id)) as boolean);
        }
        setVoted(recipeOfADay?.votedUsersIds.length as number);
    }, [status, recipeOfADay, session?.user.id]);

    useEffect(() => {
        fetchRecipeOfADay();
    }, []);

    const onVoteClick = async () => {
        if (status !== 'authenticated') {
            toast.error('Пожалуйста, войдите в аккаунт');
        }
        const res = await Api.updateRecipeOfADay(
            {
                addRecipe: false,
                isVoted: true,
                recipeId: recipeOfADay?.id as number
            },
        );

        if (res.success) {
            if (currentUserVoted) {
                setVoted(voted - 1);
                setCurrentUserVoted(false);

                toast.success('Ваш голос успешно отменен');
            } else {
                setCurrentUserVoted(true);
                setVoted(voted + 1);

                toast.success('Ваш голос успешно принят');
            }

        }

    };

    const onAddRecipeClick = async () => {
        if (status !== 'authenticated') {
            toast.error('Пожалуйста, войдите в аккаунт');
            return;
        }

        setAddingRecipe(true);
        await Api.createRecipe({
            categoryId: recipeOfADay?.categoryId as number,
            recipeName: recipeOfADay?.recipeName as string,
            fullDescription: recipeOfADay?.fullDescription,
            servings: recipeOfADay?.servings as number,
            imageUrl: recipeOfADay?.imageUrl,
            ingredients: recipeOfADay?.ingredients,
            // @ts-ignore
            recipeOfADayId: recipeOfADay?.id
        });

        const res = await Api.updateRecipeOfADay(
            {
                addRecipe: true,
                isVoted: false,
                recipeId: recipeOfADay?.id as number
            },
        );

        if (res.success) {
            setAddingRecipe(false);
            setUserHasRecipe(true);

            toast.success('Рецепт успешно добавлен');
        }

    };

    const onOfferRecipe = () => {
        if (!user) {
            toast.error('Пожалуйста, войдите в аккаунт');
            return;
        }

        if (!user.vip) {
            toast.error('Только VIP пользователи могут предложить свой рецепт');
            return;
        }
        setOpenRecipeOfferModal(true);
    }

    return <article className="mb-8 p-6 bg-background rounded-2xl shadow-md mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-orange-600">Рецепт дня</h2>

        <div className="flex justify-between">
            {
                loading ? <Skeleton className="w-[240px] h-[48px] rounded-2xl mb-1" />
                    : <div className="flex gap-2 items-center">
                        <Title text={recipeOfADay?.recipeName as string} size="lg" className="font-semibold text-secondary-foreground mb-4" />
                        {
                            recipeOfADay?.authorId !== 3 && <p className="p-0 m-0 text-sm text-primary font-bold">Рецепт от пользователя: {recipeOfADay?.authorName}</p>
                        }
                    </div>
            }

            <div className="flex gap-2 items-center">
                <TooltipButton tooltipContent="Предложить свой рецепт" onButtonClick={onOfferRecipe}>
                    Предложить
                </TooltipButton>
                {
                    userHasRecipe && status === 'authenticated'
                        ? <p className="text-primary flex gap-2"><Check /> <span>Вы добавили этот рецепт</span></p>
                        : <Button onClick={onAddRecipeClick} loading={loading || addingRecipe}>Добавить себе</Button>
                }

            </div>

        </div>

        <div className="flex flex-col md:flex-row gap-6">
            {
                loading
                    ? <Skeleton className="w-[300px] h-[225px] rounded-lg mb-1" />
                    : <Image
                        src={recipeOfADay?.imageUrl as string}
                        alt={recipeOfADay?.recipeName as string}
                        width={300}
                        height={300}
                        className="rounded-lg object-cover"
                    />
            }
            {
                loading
                    ? <Skeleton className="w-full h-[52px] rounded-2xl mb-1" />
                    : <p className="text-muted-foreground leading-relaxed">
                        {recipeOfADay?.fullDescription}
                    </p>
            }

        </div>

        <div className="mt-6">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">Ингредиенты:</h3>
            <div className="flex justify-between">
                <ul
                    className="list-disc list-inside text-muted-foreground space-y-1"
                    style={{
                        columns: getColumnsCount(recipeOfADay?.ingredients?.length || 0)
                    }}
                >
                    {
                        loading
                            ? <Skeleton className="w-[240px] h-[30px] rounded-2xl mb-1" />
                            : recipeOfADay?.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name}: {ingredient.toTaste ? 'по вкусу' : `${ingredient.amount} ${ingredient.unit}`} </li>
                            ))
                    }
                </ul>
                <div className="flex items-center gap-2 text-muted-foreground self-end" aria-label="Рейтинг">
                    <Button variant="ghost" onClick={onVoteClick}>
                        <Star fill={currentUserVoted ? "yellow" : "none"} />
                    </Button>
                    {' '}
                    {voted}
                </div>
            </div>
        </div>

        <RecipeOfferModal open={openRecipeOfferModal} handleClose={() => setOpenRecipeOfferModal(false)} />
    </article>
};