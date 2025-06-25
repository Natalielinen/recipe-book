'use client';

import { FormProvider, useForm } from "react-hook-form";
import { Title } from "./title";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddStoryFormValues, addStorySchema } from "@/schemas/add-story-schema";
import { Button } from "../ui/button";
import { FormInput } from "./form-components";

export const AddStoryForm = () => {
    const form = useForm<AddStoryFormValues>({
        resolver: zodResolver(addStorySchema),
        defaultValues: {
            title: '',
            previewImage: '',
            itemImage: ['', '']
        },
        mode: 'onChange'
    });

    // const [error, setError] = useState<string>("");
    // const [success, setSuccess] = useState<string>("");

    // const { execute, status } = useAction(createProduct, {
    //     onSuccess: (data) => {
    //         if (data?.data?.error) setError(data?.data?.error);
    //         if (data?.data?.success) setSuccess(data?.data?.success);
    //     }
    // });

    const onSubmit = (data: AddStoryFormValues) => {
        console.log(data);
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                <Title text="Добавить сторис" size="md" className="font-bold" />

                <FormInput name="title" label="Название" required />

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