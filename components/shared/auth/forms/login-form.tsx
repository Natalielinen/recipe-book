'use client';

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../title";
import { FormInput } from "../../form-components";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
    onClose?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {

    const router = useRouter();

    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: TFormLoginValues) => {
        try {

            const resp = await signIn('credentials', {
                ...data,
                redirect: false
            });


            if (!resp?.ok) {
                throw Error();
            }

            onClose?.();
            toast.success('Вы вошли в аккаунт');

        } catch (error) {
            console.error('Error [LOGIN]', error);
            toast.error('Не удалось войти в аккаунт');
        }

    }

    const forgotPasswordClick = () => {
        onClose?.();
        router.push(`/forgot-password`);

    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                <Title text="Вход в аккаунт" size="md" className="font-bold" />
                <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>

                <FormInput name="email" label="Email" required />
                <FormInput name="password" label='Пароль' type="password" required />

                <Button
                    loading={form.formState.isSubmitting}
                    type="submit"

                >
                    Войти
                </Button>

                <Button
                    type="button"
                    variant="link"
                    onClick={forgotPasswordClick}
                >Забыли пароль?</Button>
            </form>
        </FormProvider >
    )

}