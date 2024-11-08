import { ResetPasswordForm } from "@/components/shared";

export default function ProfilePage({ params: { token } }: { params: { token: string } }) {

    return <ResetPasswordForm token={token} />

}