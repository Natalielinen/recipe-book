import { ResetPasswordForm } from "@/components/shared";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
    title: "Сброс пароля",
});

export default function ProfilePage({ params: { token } }: { params: { token: string } }) {

    return <ResetPasswordForm token={token} />

}