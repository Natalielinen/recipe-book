'use client';

import { Container } from "./container";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';
import { useTranslation } from "@/app/i18n/client";
import { MoveRight } from "lucide-react";


interface Props {
    className?: string;
    lng: string;
}

export const MyRecipesButton: React.FC<Props> = ({ className, lng }) => {

    const { t } = useTranslation(lng);

    const router = useRouter();

    const onClick = () => {
        router.push(`/${lng}/recipes`);
    }

    return <Container className="flex items-center justify-between py-8">
        <Button variant="outline" onClick={onClick}>
            {t('Перейти к моим рецептам')}
            <MoveRight />
        </Button>
    </Container>
};