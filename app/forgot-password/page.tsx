import { ForgotPasswordForm } from "@/components/shared";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
    title: "Восстановление пароля",
});

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
