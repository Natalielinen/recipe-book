'use client';

import { FormRecipe, RecipeDto } from '@/app/services/dto/recipe.dto';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddRecipeFormValues, addRecipeSchema } from './add-recipe-schema';
import { FormCheckbox, FormInput, FormSelect, FormTextarea } from '../form-components';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Api } from '@/app/services/api-client';
import { Minus, Plus } from 'lucide-react';
import { Title } from '../title';
import { useRecipeStore } from '@/app/store/recipe';
import { useCategoryStore } from '@/app/store/category';
import toast from 'react-hot-toast';
import { ErrorText } from '../error-text';

interface Props {
    isEditForm: boolean;
    recipe: RecipeDto;
}

export const AddRecipeForm: React.FC<Props> = ({ recipe, isEditForm }) => {

    const [categoriesOptions, setCategoriesOptions] = useState<{ label: string, value: string }[]>([]);
    const [categoriesSelectLoading, setCategoriesSelectLoading] = useState<boolean>(false);
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

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "ingredients",
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

    const fetchCategories = async () => {
        setCategoriesSelectLoading(true);
        const res = await Api.categories();
        setCategoriesOptions(res.map((category) => ({ label: category.nameKey, value: String(category.id) })));
        setCategoriesSelectLoading(false);
    };

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormSelect
                name='categoryId'
                options={categoriesOptions}
                label={"Категория"}
                disabled={categoriesSelectLoading}
                required
            />
            <FormInput
                name='recipeName'
                label={"Название рецепта"}
                required
            />
            <FormInput
                name='servings'
                label={"Порции"}
                type='number'
                min="1"
                required
            />
            <FormTextarea
                name='fullDescription'
                label={"Описание приготовления"}
            />
            <Title text={"Ингредиенты"} size='sm' />

            {
                fields.map((field, index) => {

                    const toTasteField = form.watch(`ingredients.${index}.toTaste`);

                    return <div key={field.id}>
                        <div className='flex justify-between flex-wrap gap-2'>

                            <FormInput
                                name={`ingredients.${index}.name`}
                            />

                            <FormInput
                                name={`ingredients.${index}.amount`}
                                type='number'
                                step='0.1'
                                disabled={toTasteField}
                            />

                            <FormInput
                                name={`ingredients.${index}.unit`}
                                disabled={toTasteField}
                            />

                            <FormCheckbox
                                name={`ingredients.${index}.toTaste`}
                                label='По вкусу'
                            />


                            <div className='flex gap-2 px-2'>
                                <Button
                                    onClick={() => remove(index)}
                                    disabled={index === 0}
                                    type='button'
                                >
                                    <Minus size={16} />
                                </Button>

                                <Button
                                    onClick={() => append({ name: '', amount: '1', unit: 'шт' })}
                                    style={{
                                        visibility: index !== fields.length - 1 ? 'hidden' : 'visible',
                                    }}
                                    type='button'
                                >
                                    <Plus size={16} />
                                </Button>


                            </div>

                        </div>

                        {form.formState.errors.ingredients?.[index]?.name?.message && (
                            <ErrorText
                                text={form.formState.errors.ingredients[index].name.message}
                                className="mt-2"
                            />
                        )}

                    </div>


                })
            }

            <Button
                type='submit'
                loading={buttonLoading}
            >
                Сохранить
            </Button>

        </form>
    </FormProvider>;
};

