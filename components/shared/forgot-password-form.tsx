"use client";

import { Container } from "./container";
import { Title } from "./title";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React from "react";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Api } from "@/app/services/api-client";
import toast from "react-hot-toast";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

export const ForgotPasswordForm = () => {
    const router = useRouter();
    const { lang } = useLanguage();

    const [email, setEmail] = React.useState("");
    const [sending, setSending] = React.useState(false);

    const onForgotPassword = async () => {
        try {
            setSending(true);
            await Api.forgotPassword({ email });

            router.push(`/`);
            toast.success(translation[lang as Lang].emailSent);
        } catch (error) {
            console.log("FORGOT_PASSWORD error", error);
            toast.error(translation[lang as Lang].errorSendingEmail);
        } finally {
            setSending(false);
        }
    };

    return (
        <Container className="flex align-center justify-center">
            <div className="flex flex-col gap-5 w-[30%]">
                <Title text={translation[lang as Lang].passwordRecovery} size="md" />

                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

                <Button type="button" onClick={onForgotPassword} loading={sending}>
                    {translation[lang as Lang].send}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/`)}
                >
                    <MoveLeft />
                    {translation[lang as Lang].goBack}
                </Button>
            </div>
        </Container>
    );
};
