export const dynamic = "force-dynamic";

import { ForgotPasswordForm } from "@/components/shared";

export default function ForgotPasswordPage({ params: { lng } }: { params: { lng: string } }) {
    return <ForgotPasswordForm lng={lng} />;
}