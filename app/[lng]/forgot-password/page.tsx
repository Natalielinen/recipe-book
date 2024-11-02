import { ForgotPasswordForm } from "@/components/shared";

export default async function ProfilePage({ params: { lng, } }: { params: { lng: string } }) {



    return <ForgotPasswordForm lng={lng} />

}