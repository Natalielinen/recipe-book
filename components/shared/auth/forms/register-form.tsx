'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { registerUser } from '@/app/[lng]/actions';
import { FormInput } from '../../form-components';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/app/i18n/client';

interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
    lng: string;
}

export const RegisterForm: React.FC<Props> = ({ lng, onClose, onClickLogin }) => {

    const { t } = useTranslation(lng);

    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
                verified: new Date(),
            });

            toast.success(t("Регистрация успешна"));

            onClose?.();
        } catch (error) {
            return toast.error(t("Неверный E-Mail или пароль"));
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label={t("Полное имя")} required />
                <FormInput name="password" label={t("Пароль")} type="password" required />
                <FormInput name="confirmPassword" label={t("Подтвердите пароль")} type="password" required />

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    {t("Зарегистрироваться")}
                </Button>
            </form>
        </FormProvider>
    );
};
