'use client';

import { Container } from "./container";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';
import { MoveRight } from "lucide-react";

export const MyRecipesButton = () => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/recipes`);
    }

    return <Container className="flex items-center justify-between py-8">
        <Button variant="outline" onClick={onClick}>
            Перейти к моим рецептам
            <MoveRight />
        </Button>
    </Container>
};