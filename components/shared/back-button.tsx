'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { MoveLeft } from 'lucide-react';

export const BackButton = () => {
    const router = useRouter();

    return (
        <Button onClick={() => router.back()}>
            <MoveLeft size={16} />
        </Button>
    );
}