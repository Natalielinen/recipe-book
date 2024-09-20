'use client';

import { RecipeDto } from '@/app/services/dto/recipe.dto';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddRecipeFormValues, addRecipeSchema } from './add-recipe-schema';
import { FormInput } from '../form-components';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface Props {
    className?: string;
    isEditForm: boolean;
    recipe: RecipeDto;
    lng?: string;
}

export const AddRecipeForm: React.FC<Props> = ({ className, recipe, isEditForm, lng = "ru" }) => {

    const { t } = useTranslation(lng);

    const editFormValues = recipe;

    const addFormValues = {
        categoryId: 1,
        recipeName: '',
        fullDescription: '',
        ingredients: [],
        servings: 1,

    };

    const form = useForm<AddRecipeFormValues>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: isEditForm ? editFormValues : addFormValues
    })

    const onSubmit = (data: AddRecipeFormValues) => {
        console.log('data', data);

    }


    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
                name='recipeName'
                label={t("Название рецепта")}
                required
            />

            <Button type='submit'>
                {t("Сохранить")}
            </Button>

        </form>
    </FormProvider>;
};