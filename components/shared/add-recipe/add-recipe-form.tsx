'use client';

import { RecipeDto } from '@/app/services/dto/recipe.dto';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddRecipeFormValues, addRecipeSchema } from './add-recipe-schema';
import { FormInput, FormSelect } from '../form-components';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Api } from '@/app/services/api-client';

interface Props {
    isEditForm: boolean;
    recipe: RecipeDto;
    lng?: string;
}

export const AddRecipeForm: React.FC<Props> = ({ recipe, isEditForm, lng = "ru" }) => {

    const [categoriesOptions, setCategoriesOptions] = useState<{ label: string, value: string }[]>([]);
    const [categoriesSelectLoading, setCategoriesSelectLoading] = useState<boolean>(false);

    const { t } = useTranslation(lng);

    const editFormValues = {
        ...recipe,
        categoryId: String(recipe.categoryId),
    };

    const addFormValues = {
        categoryId: '1',
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

    const fetchCategories = async () => {
        setCategoriesSelectLoading(true);
        const res = await Api.categories(lng);
        setCategoriesOptions(res.map((category) => ({ label: category.nameKey, value: String(category.id) })));
        setCategoriesSelectLoading(false);
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormSelect
                name='categoryId'
                options={categoriesOptions}
                label={t("Категория")}
                disabled={categoriesSelectLoading}
                required

            />
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