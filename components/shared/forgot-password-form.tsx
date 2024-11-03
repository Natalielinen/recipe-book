'use client';

import { useTranslation } from "@/app/i18n/client"
import { Container } from "./container"
import { Title } from "./title"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import React from "react"
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Api } from "@/app/services/api-client";
import toast from "react-hot-toast";

interface Props {
    lng: string
}

export const ForgotPasswordForm: React.FC<Props> = ({ lng }) => {

    const { t } = useTranslation(lng);

    const router = useRouter();

    const [email, setEmail] = React.useState('');
    const [sending, setSending] = React.useState(false);

    const onForgotPassword = async () => {

        try {
            setSending(true);
            await Api.forgotPassword(lng, { email });

            router.push(`/${lng}`);
            toast.success(t("Письмо отправлено"));

        } catch (error) {
            console.log('FORGOT_PASSWORD error', error);
        } finally {
            setSending(false);
        }

    }


    return <Container className="flex align-center justify-center">

        <div className="flex flex-col gap-5 w-[30%]">
            <Title text={t("Восстановление пароля")} size="md" />

            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("Email")} />

            <Button type="button" onClick={onForgotPassword} loading={sending}>{t("Отправить")}</Button>
            <Button type="button" variant="outline" onClick={() => router.push(`/${lng}`)}><MoveLeft />{t("Вернуться")}</Button>

        </div>


    </Container>
}