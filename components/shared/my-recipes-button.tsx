'use client';

import { Container } from "./container";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';

interface Props {
    className?: string;
    lng: string;
}

export const MyRecipesButton: React.FC<Props> = ({ className, lng }) => {


    const router = useRouter();

    const onClick = () => {
        router.push(`/${lng}/recipes`);
    }

    return <Container className="flex items-center justify-between py-8">
        <Button variant="outline" onClick={onClick}>
            my recipes
        </Button>
    </Container>
};