import { authOptions } from "@/app/constants/auth-options";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { prisma } from "@/prisma/prisma-client";
import { ProfileForm } from "@/components/shared";
import { Statistics } from "@/components/shared/statistics";
import { ProfileHeader } from "@/components/shared/profile-header";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
    title: "Профиль",
});

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
        where: { id: Number(session?.user?.id) },
    });

    if (!session) {
        return redirect("/");
    }

    if (!user) {
        return redirect("/");
    }

    return (
        <>
            <ProfileHeader user={user} />
            <div className="flex gap-4 flex-wrap">
                <ProfileForm data={user} />
                <Statistics data={user} />
            </div>
        </>
    );
}
