import { authOptions } from "@/app/constants/auth-options";
import { AddRecipeOfTheDayForm } from "@/components/shared/admin";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddStoryPage() {

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({ where: { id: Number(session?.user?.id) } });

    if (user?.role !== 'ADMIN') {
        redirect('/profile');
    };

    return <AddRecipeOfTheDayForm />
}