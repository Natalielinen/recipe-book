"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { setTodayRecipe } from "@/server/actions/set-today-recipe";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Image as LucideImage, MoreHorizontalIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { updateRecipePhoto } from "@/server/actions/update-recipe-photo";
import { onLoadFile } from "@/lib/upload-image";
import { deleteRecipeOfADay } from "@/server/actions/delete-recipe-of-a-day";

type RecipeColumn = {
    id: number,
    recipeName: string,
    imageUrl: string,
    isTodayRecipe: boolean,
    authorName: string,
    authorId: number,
}

const CheckboxCell = ({ row }: { row: Row<RecipeColumn> }) => {

    const recipe = row.original;

    const isTodayRecipe = row.getValue('isTodayRecipe') as boolean;
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        setChecked(isTodayRecipe);
    }, [isTodayRecipe])

    const { execute, status } = useAction(setTodayRecipe, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                setChecked(data?.data?.updatedRecipe.id === recipe.id);
                toast.success(data?.data?.success);
            }
        },

    });

    const handleRecipeChecked = (value: boolean) => {
        execute({ id: recipe.id });

        if (isTodayRecipe) {
            return;
        }
    }

    return <Checkbox
        checked={checked}
        onCheckedChange={handleRecipeChecked}
        disabled={status === 'executing' || isTodayRecipe}
    />
}

const ActionCell = ({ row }: { row: Row<RecipeColumn> }) => {

    const recipe = row.original;
    const inputRef = useRef<HTMLInputElement>(null);

    const { execute: updateImage } = useAction(updateRecipePhoto, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
            }
        },

    });

    const { execute: deleteRecipe } = useAction(deleteRecipeOfADay, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
            }
        },

    });

    const handleUpdateImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const imageUrl = await onLoadFile(event);
        if (!imageUrl) return;
        updateImage({ id: recipe.id, imageUrl: imageUrl.data.data.url });
    }

    return (
        <>
            <input
                type="file"
                onChange={handleUpdateImage}
                ref={inputRef}
                hidden
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <MoreHorizontalIcon className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="cursor-pointer"
                    >
                        <Link href={`/profile/add-recipe-of-the-day?id=${recipe.id}`}>Редактировать</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => inputRef.current?.click()}
                        className="cursor-pointer">
                        Изменить фото
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => deleteRecipe({ id: recipe.id })}
                        className="cursor-pointer">
                        Удалить рецепт
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>


    )
}

export const columns: ColumnDef<RecipeColumn>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'recipeName',
        header: 'Название',
    },
    {
        accessorKey: 'imageUrl',
        header: 'Изображение',
        cell: ({ row }) => {
            const image = row.getValue('imageUrl') as string;
            const title = row.getValue('recipeName') as string;

            return (
                <div className="w-[50px] h-[50px]">
                    {
                        !image ? <LucideImage size={50} /> : <Image
                            src={image}
                            alt={title}
                            className="object-cover w-full h-full rounded-md"
                            width={50}
                            height={50}
                        />
                    }

                </div>
            );
        }
    },
    {
        accessorKey: 'isTodayRecipe',
        header: 'Сегодняшний рецепт',
        cell: CheckboxCell,
    },
    {
        accessorKey: 'authorName',
        header: 'Автор',
    },
    {
        accessorKey: 'authorId',
        header: 'ID автора',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ActionCell,
    }
]