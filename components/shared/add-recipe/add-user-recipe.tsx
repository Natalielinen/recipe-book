'use client';

import { FormRecipe, RecipeDto } from '@/app/services/dto/recipe.dto';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Api } from '@/app/services/api-client';
import { useRecipeStore } from '@/app/store/recipe';
import { useCategoryStore } from '@/app/store/category';
import toast from 'react-hot-toast';
import { AddRecipeFormValues, addRecipeSchema } from '@/schemas/add-recipe-schema';
import { AddRecipeForm } from './add-recipe-form';

interface Props {
    isEditForm: boolean;
    recipe: RecipeDto;
}

export const AddUserRecipe: React.FC<Props> = ({ recipe, isEditForm }) => {

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const { setAddRecipeModalOpen, setRecipe, setInitialServings } = useRecipeStore((state) => state);
    const { setCategories } = useCategoryStore((state) => state);

    const editFormValues = {
        ...recipe,
        categoryId: String(recipe.categoryId),
        ingredients: recipe.ingredients?.map((ingredient) => ({
            ...ingredient,
            amount: String(ingredient.amount),
            toTaste: ingredient.toTaste
        })),
        servings: String(recipe.servings),
        imageUrl: String(recipe.imageUrl)
    };

    const addFormValues = {
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
    };

    const form = useForm<AddRecipeFormValues>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: isEditForm ? editFormValues : addFormValues
    });

    const onSubmit = async (data: AddRecipeFormValues) => {
        setButtonLoading(true);

        const body: FormRecipe = {
            recipeName: data.recipeName,
            fullDescription: data.fullDescription || "",
            ingredients: data.ingredients?.map((ingredient) => ({
                name: ingredient.name || "",
                unit: ingredient.unit || "",
                amount: Number(ingredient.amount),
                price: Number(ingredient.price) || 0,
                toTaste: Boolean(ingredient.toTaste),
            })),
            categoryId: Number(data.categoryId),
            servings: Number(data.servings),
            imageUrl: data.imageUrl || "",
        };

        try {
            if (isEditForm) {
                const res = await Api.updateRecipe(body, recipe.id);

                if (!res) {
                    throw Error();
                }

                const data = await Api.getRecipeById(recipe.id);

                setRecipe(data);
                setInitialServings(data.servings);
            } else {

                await Api.createRecipe(body);
                const response = await Api.recipes();
                setCategories(response);
            }

        } catch (error) {
            console.error('Error [ADD RECIPE]', error);
            toast.error("Произошла ошибка при добавлении рецепта");
        }

        setButtonLoading(false);

        setAddRecipeModalOpen(false);
    };


    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <AddRecipeForm />
            <Button
                type='submit'
                loading={buttonLoading}
            >
                Сохранить
            </Button>

        </form>
    </FormProvider>;
};

