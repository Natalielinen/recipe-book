import { authOptions } from "@/app/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "@/components/shared/admin";

export default async function AllStoriesPage() {
    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: { id: Number(session?.user?.id) },
    });

    const stories = await prisma.story.findMany({
        include: {
            items: true,
        },
    });

    if (!stories) throw new Error("Истории не найдены");

    const dataTable = stories.map((story) => ({
        id: story.id,
        title: story.title,
        previewImage: story.previewImageUrl,
        items: story.items.map((item) => item.sourceUrl),
    }));

    if (!dataTable) throw new Error("Нет данных");

    if (user?.role !== "ADMIN") {
        redirect("/profile");
    }

    return <DataTable columns={columns} data={dataTable} />;
}
