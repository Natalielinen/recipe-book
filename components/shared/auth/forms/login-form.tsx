'use client';

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../title";
import { useTranslation } from "@/app/i18n/client";
import { FormInput } from "../../form-components";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
    onClose?: () => void;
    lng: string;
}

export const LoginForm: React.FC<Props> = ({ lng, onClose }) => {

    const { t } = useTranslation(lng);

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

            console.log('resp', resp);


            if (!resp?.ok) {
                throw Error();
            }

            onClose?.();
            toast.success(t('Вы вошли в аккаунт'));

        } catch (error) {
            console.error('Error [LOGIN]', error);
            toast.error(t('Не удалось войти в аккаунт'));
        }

    }


    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text={t("Вход в аккаунт")} size="md" className="font-bold" />
                        <p className="text-gray-400">{t("Введите свою почту, чтобы войти в свой аккаунт")}</p>
                    </div>
                    <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
                </div>

                <FormInput name="email" label="Email" required />
                <FormInput name="password" label={t('Пароль')} required />

                <Button
                    loading={form.formState.isSubmitting}
                    type="submit"
                >
                    {t("Войти")}
                </Button>
            </form>
        </FormProvider>
    )

}