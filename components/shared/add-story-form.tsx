'use client';

import { Control, Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Title } from "./title";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddStoryFormValues, addStorySchema } from "@/schemas/add-story-schema";
import { Button } from "../ui/button";
import { FormInput } from "./form-components";
import { Input } from "../ui/input";
import { uploadImage } from "@/lib/upload-image";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddStoryForm = () => {
    const form = useForm<AddStoryFormValues>({
        resolver: zodResolver(addStorySchema),
        defaultValues: {
            title: '',
            previewImage: '',
            itemImages: [
                {
                    image: '',
                    id: 0
                },
                {
                    image: '',
                    id: 1
                },
            ]
        },
        mode: 'onChange'
    });

    const { control, register } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'itemImages'
    });

    // const [error, setError] = useState<string>("");
    // const [success, setSuccess] = useState<string>("");

    // const { execute, status } = useAction(createProduct, {
    //     onSuccess: (data) => {
    //         if (data?.data?.error) setError(data?.data?.error);
    //         if (data?.data?.success) setSuccess(data?.data?.success);
    //     }
    // });

    //TODO: ДУБЛИРОВАНИЕ КОДА!!! ОБЪЕДЕНИТЬ В ОДНУ ФУНКЦИЮ!!!

    const handlePreviewFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        const formData = new FormData();
        //@ts-ignore
        formData.append("image", file);

        if (!file) return;

        try {
            const res = await uploadImage(formData);

            form.setValue('previewImage', res.data.data.url);

            console.log("form", form.getValues());

        } catch (error) {
            console.error("Ошибка загрузки:", error);
        }
    };

    const handleItemFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const file = event.target.files?.[0];

        const formData = new FormData();
        //@ts-ignore
        formData.append("image", file);

        if (!file) return;

        try {
            const res = await uploadImage(formData);

            form.setValue(`itemImages.${index}`, { image: res.data.data.url, id: index });

            console.log("form", form.getValues());

        } catch (error) {
            console.error("Ошибка загрузки:", error);
        }
    };

    const onSubmit = (data: AddStoryFormValues) => {
        console.log(data);
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                <Title text="Добавить сторис" size="md" className="font-bold" />

                <FormInput name="title" label="Название" required />

                <FormField
                    control={form.control}
                    name="previewImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-2">Превью истории <Asterisk className="text-red-500" size={16} /></FormLabel>
                            <FormControl>
                                <Input type="file" onChange={handlePreviewFileChange} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <p>Добавить изображения элементов истории (минимум 2 максимум 4)</p>

                {
                    fields.map((field, index) => (
                        <div key={field.id} className="flex gap-5">
                            <Input
                                type="file"
                                name={`itemImages.${index}.image`}
                                onChange={(e) => handleItemFileChange(e, index)}
                            />

                            <Button
                                className={cn({
                                    'invisible ': index === 0 || fields.length - 1 > index
                                })}
                                disabled={fields.length === 4}
                                type="button"
                                onClick={() => append({
                                    image: '',
                                    id: index
                                })}
                            >
                                +
                            </Button>
                        </div>
                    ))
                }

                <Button
                    loading={form.formState.isSubmitting}
                    type="submit"
                >
                    Создать
                </Button>
            </form>
        </FormProvider >
    )
}