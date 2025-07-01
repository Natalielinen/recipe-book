'use client';

import { Button } from "@/components/ui/button";
import { FormCheckbox, FormInput, FormSelect, FormTextarea } from "../form-components";
import { Title } from "../title";
import { Minus, Plus } from "lucide-react";
import { ErrorText } from "../error-text";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AddRecipeFormValues } from "@/schemas/add-recipe-schema";
import { useEffect, useState } from "react";
import { Api } from "@/app/services/api-client";

export const AddRecipeForm = () => {

    const [categoriesOptions, setCategoriesOptions] = useState<{ label: string, value: string }[]>([]);
    const [categoriesSelectLoading, setCategoriesSelectLoading] = useState<boolean>(false);

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


    const form = useFormContext<AddRecipeFormValues>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "ingredients",
    });

    return <>
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
    </>
}