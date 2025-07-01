'use client';

import { FormProvider, useForm } from "react-hook-form";
import { Title } from "../title";
import { AddRecipeFormValues, addRecipeSchema } from "@/schemas/add-recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { AddRecipeForm } from "../add-recipe";
import { Button } from "@/components/ui/button";
import { addRecipeOfADay } from "@/server/actions/add-recipe-of-a-day";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AddRecipeOfTheDayForm = () => {

    const router = useRouter();

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

                <Button type="submit" loading={status === 'executing'}>Добавить</Button>
            </form>
        </FormProvider>
    </div>
}