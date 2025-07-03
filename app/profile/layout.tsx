import { getServerSession } from "next-auth";
import { authOptions } from "../constants/auth-options";
import { prisma } from "@/prisma/prisma-client";
import { Container } from "@/components/shared";
import { AdminPanel } from "@/components/shared/admin";


export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({ where: { id: Number(session?.user?.id) } });

    return (
        <Container className="mt-4">
            {user?.role === "ADMIN" && <AdminPanel />}
            {children}
        </Container>
    )
}