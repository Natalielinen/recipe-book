'use client';

import { Container } from "./container"
import { Title } from "./title"
import { Button } from "../ui/button"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import { Api } from "@/app/services/api-client";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./form-components";
import { z } from 'zod';
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface Props {
    token: string;
}

const formResetPasswordSchema = z.object({
    newPassword: z.string().min(4, { message: 'Введите корректный пароль' }),
    retypeNewPassword: z.string().min(4, { message: 'Введите корректный пароль' }),
}).refine((data) => data.newPassword === data.retypeNewPassword, {
    message: 'Пароли не совпадают',
    path: ['retypeNewPassword'],
});

type TResetPasswordFormValues = z.infer<typeof formResetPasswordSchema>;
export const ResetPasswordForm: React.FC<Props> = ({ token }) => {

    const [verified, setVerified] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);
    const router = useRouter();

    const { status: sessionStatus } = useSession();

    const verifyToken = async () => {
        try {
            const res = await Api.verifyToken({ token });

            console.log('res', res);


            if (res) {
                setVerified(true);
                setUser(res);
            }
        } catch (error) {
            console.log('VERIFY_TOKEN error', error);
            toast.error("Ссылка недействительна");
        }

    };

    useEffect(() => {
        verifyToken();
    }, [])

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.push(`/`);
        }

    }, [sessionStatus, router])

    const form = useForm<TResetPasswordFormValues>({
        resolver: zodResolver(formResetPasswordSchema),
        defaultValues: {
            newPassword: '',
            retypeNewPassword: '',
        },
    });

    const onSubmit = async (data: TResetPasswordFormValues) => {

        try {

            console.log("Отправка запроса с email:", user?.email);
            await Api.resetPassword({ password: data.newPassword, email: user?.email as string, });

            router.push(`/`);
            toast.success("Пароль успешно изменен");

        } catch (error) {
            console.log('RESET_PASSWORD error', error);
        } finally {

        }

    }

    return <Container className="flex align-center justify-center">
        <FormProvider {...form}>

            <form className="flex flex-col gap-5 w-[30%]" onSubmit={form.handleSubmit(onSubmit)}>
                <Title text={"Новый пароль"} size="md" />

                <FormInput name="newPassword" placeholder="Новый пароль" />
                <FormInput name="retypeNewPassword" placeholder="Повторите новый пароль" />

                <Button
                    type="submit"
                    variant="default"
                    loading={form.formState.isSubmitting}
                    disabled={!verified}
                >
                    {"Сменить пароль"}
                </Button>

            </form>
        </FormProvider>


    </Container>
}