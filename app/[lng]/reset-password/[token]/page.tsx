import { ResetPasswordForm } from "@/components/shared";

export default async function ProfilePage({ params: { lng, token } }: { params: { lng: string, token: string } }) {

    return <ResetPasswordForm lng={lng} token={token} />

}