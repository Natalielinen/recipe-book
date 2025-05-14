import { authOptions } from "@/app/constants/auth-options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/prisma-client";
import { Container, ProfileForm } from "@/components/shared";
import { Statistics } from "@/components/shared/statistics";
import { cn } from "@/lib/utils";
import { ProfileHeader } from "@/components/shared/profile-header";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
    title: "Профиль",
});

export default async function ProfilePage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/');
    }

    const user = await prisma.user.findUnique({ where: { id: Number(session?.user?.id) } });

    if (!user) {
        return redirect('/');
    }

    return (
        <Container className={cn('my-10')}>
            <ProfileHeader user={user} />
            <div className="flex gap-4 flex-wrap">
                <ProfileForm data={user} />
                <Statistics data={user} />
            </div>
        </Container>
    )

}