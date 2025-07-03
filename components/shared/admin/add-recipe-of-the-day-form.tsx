'use client';

import { FormProvider, useForm } from "react-hook-form";
import { Title } from "../title";
import { AddRecipeFormValues, addRecipeSchema } from "@/schemas/add-recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { AddRecipeForm } from "../add-recipe";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../../ui/form";
import { addRecipeOfADay } from "@/server/actions/add-recipe-of-a-day";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { onLoadFile } from "@/lib/upload-image";
import { getRecipeOfADay } from "@/server/actions/get-recipe-of-a-day";
import { useEffect } from "react";

export const AddRecipeOfTheDayForm = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const editMode = searchParams.get("id");

    const form = useForm<AddRecipeFormValues>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: {
            categoryId: '1',
            recipeName: '',
            fullDescription: '',
            ingredients: [{
                name: '',
                amount: '1',
                unit: 'шт',
                toTaste: false
            }],
            servings: '1',
            imageUrl: '',
        },
        mode: 'onChange'
    });

    const checkRecipe = async (id: number) => {
        if (editMode) {
            const { error, recipeOfADay } = await getRecipeOfADay(id);

            if (error) {
                toast.error(error);
                router.push(`/profile/all-recipes`);
                return;
            }

            if (recipeOfADay) {
                const id = parseInt(editMode);

                form.setValue("categoryId", recipeOfADay.categoryId.toString());
                form.setValue("recipeName", recipeOfADay.recipeName);
                form.setValue("fullDescription", recipeOfADay.fullDescription);
                form.setValue("ingredients", recipeOfADay.ingredients.map(({ name, amount, unit, toTaste }) => ({
                    name,
                    amount: amount?.toString(), // преобразуем number -> string
                    unit,
                    toTaste,
                })));
                form.setValue("servings", recipeOfADay.servings.toString());
                form.setValue("id", id);
            }
        }
    }

    useEffect(() => {
        if (editMode) {
            checkRecipe(parseInt(editMode));
        }
    }, [])


    const handlePreviewFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const res = await onLoadFile(event);
        if (!res) return;
        form.setValue('imageUrl', res.data.data.url);

    };

    const { execute, status } = useAction(addRecipeOfADay, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
                router.push(`/profile/all-recipes`);
            }

        }
    });

    const onSubmit = (data: AddRecipeFormValues) => {
        execute(data);
    };


    return <div className="mb-8">
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <Title text="Добавить рецепт дня" size="md" className="font-bold" />

                <AddRecipeForm />

                {
                    !editMode &&
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex gap-2">Изображение рецепта</FormLabel>
                                <FormControl>
                                    <Input type="file" onChange={handlePreviewFileChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                }

                <Button type="submit" loading={status === 'executing'}>{
                    editMode ? "Обновить рецепт" : "Добавить рецепт"
                }</Button>
            </form>
        </FormProvider>
    </div>
}