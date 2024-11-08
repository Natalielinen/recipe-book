import { authOptions } from "@/app/constants/auth-options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/components/shared";

export default async function ProfilePage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/');
    }

    const user = await prisma.user.findUnique({ where: { id: Number(session?.user?.id) } });

    if (!user) {
        return redirect('/');
    }

    return <ProfileForm data={user} />

}