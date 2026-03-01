"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    formUpdateUserShema,
    TFormUpdateUserValues,
} from "../../schemas/auth-schemas";
import { User } from "@/generated/prisma";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { FormInput } from "./form-components";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { updateUserInfo } from "@/server/actions/update-user-info";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const { lang } = useLanguage();

    const form = useForm({
        resolver: zodResolver(formUpdateUserShema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: "",
            confirmPassword: "",
        },
    });

    const { execute, status } = useAction(updateUserInfo, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
            }
        },
    });

    const onSubmit = (data: TFormUpdateUserValues) => {
        execute(data);
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/",
        });
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5 w-full md:w-[75%] mt-10"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormInput name="email" label="E-Mail" />
                <FormInput name="fullName" label={translation[lang as Lang].fullName} />

                <FormInput
                    type="password"
                    name="password"
                    label={translation[lang as Lang].newPassword}
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label={translation[lang as Lang].retypeNewPassword}
                />

                <Button
                    disabled={status === "executing"}
                    className="text-base mt-10"
                    type="submit"
                >
                    {translation[lang as Lang].save}
                </Button>

                <Button
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                    className="text-base"
                    type="button"
                >
                    {translation[lang as Lang].signout}
                </Button>
            </form>
        </FormProvider>
    );
};
