'use client';

import { RecipeDto } from '@/app/services/dto/recipe.dto';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddRecipeFormValues, addRecipeSchema } from './add-recipe-schema';
import { FormInput, FormSelect, FormTextarea } from '../form-components';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Api } from '@/app/services/api-client';
import { Minus, Plus } from 'lucide-react';
import { Title } from '../title';
import { useRecipeStore } from '@/app/store/recipe';

interface Props {
    isEditForm: boolean;
    recipe: RecipeDto;
    lng?: string;
}

export const AddRecipeForm: React.FC<Props> = ({ recipe, isEditForm, lng = "ru" }) => {

    const [categoriesOptions, setCategoriesOptions] = useState<{ label: string, value: string }[]>([]);
    const [categoriesSelectLoading, setCategoriesSelectLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const { setAddRecipeModalOpen } = useRecipeStore((state) => state);

    const { t } = useTranslation(lng);

    const editFormValues = {
        ...recipe,
        categoryId: String(recipe.categoryId),
        ingredients: recipe.ingredients?.map((ingredient) => ({
            ...ingredient,
            amount: String(ingredient.amount),
        })),
        servings: String(recipe.servings),
    };

    const addFormValues = {
        categoryId: '1',
        recipeName: '',
        fullDescription: '',
        ingredients: [{
            name: '',
            amount: '1',
            unit: 'шт',
        }],
        servings: '1',
        imageUrl: '',

    };

    const form = useForm<AddRecipeFormValues>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: isEditForm ? editFormValues : addFormValues
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "ingredients", // unique name for your Field Array
    });

    const onSubmit = async (data: AddRecipeFormValues) => {
        setButtonLoading(true);
        if (isEditForm) {
            console.log('data', data);
        } else {

            await Api.createRecipe(lng, {
                recipeName: data.recipeName,
                fullDescription: data.fullDescription || "",
                ingredients: data.ingredients?.map((ingredient) => ({
                    name: ingredient.name || "",
                    unit: ingredient.unit || "",
                    amount: Number(ingredient.amount),
                    price: Number(ingredient.price) || 0
                })),
                categoryId: Number(data.categoryId),
                servings: Number(data.servings),
                imageUrl: data.imageUrl || "",
            });

            setAddRecipeModalOpen(false);

            await Api.recipes(lng);
        }
        setButtonLoading(false);
    };

    const fetchCategories = async () => {
        setCategoriesSelectLoading(true);
        const res = await Api.categories(lng);
        setCategoriesOptions(res.map((category) => ({ label: category.nameKey, value: String(category.id) })));
        setCategoriesSelectLoading(false);
    };

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
            <FormInput
                name='servings'
                label={t("Порции")}
                type='number'
                required
            />
            <FormTextarea
                name='fullDescription'
                label={t("Описание приготовления")}
            />
            <Title text={t("Ингредиенты")} size='sm' />
            {
                fields.map((field, index) => {
                    return <div key={field.id} className='flex justify-between'>
                        <FormInput
                            name={`ingredients.${index}.name`}
                        />
                        <FormInput
                            name={`ingredients.${index}.amount`}
                            type='number'
                        />

                        <FormInput
                            name={`ingredients.${index}.unit`}
                        />
                        {
                            index === fields.length - 1
                                ? <Button
                                    onClick={() => append({ name: '', amount: '1', unit: 'шт' })}
                                    type='button'
                                >
                                    <Plus size={16} />
                                </Button>
                                : <Button
                                    onClick={() => remove(index)}
                                    type='button'
                                >
                                    <Minus size={16} />
                                </Button>
                        }

                    </div>
                })
            }

            <Button
                type='submit'
                loading={buttonLoading}
            >
                {t("Сохранить")}
            </Button>

        </form>
    </FormProvider>;
};