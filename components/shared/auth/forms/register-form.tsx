"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
    TFormRegisterValues,
    formRegisterSchema,
} from "../../../../schemas/auth-schemas";
import { FormInput } from "../../form-components";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "../../form-components/password-input";
import { useAction } from "next-safe-action/hooks";
import { registerUser } from "@/server/actions/register-user";

interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const { execute, status } = useAction(registerUser, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
                onClose?.();
            }
        },
    });

    const onSubmit = (data: TFormRegisterValues) => {
        execute(data);
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Полное имя" required />
                <PasswordInput />
                <PasswordInput name="confirmPassword" label="Подтвердите пароль" />

                <Button
                    loading={status === "executing"}
                    className="h-12 text-base"
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};
