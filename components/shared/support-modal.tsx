'use client';

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";


interface SupportModalProps {
    className?: string,
}

export const SupportModal: React.FC<SupportModalProps> = ({ className }) => {

    const [show, setShow] = useState<boolean>(false);

    return show ? <Card className={cn('w-[300px] fixed bottom-2 right-2 pt-4', className)}>
        <CardContent className="pb-0">
            <p className="mb-2 text-primary">Есть вопрос или предложение?</p>
            <p className="text-primary">
                Пишите <strong><a href="rec1pebook@yandex.ru" target="_blank" className="underline">rec1pebook@yandex.ru</a></strong>
            </p>
        </CardContent>
        <CardFooter className="p-1">
            <Button variant="link" onClick={() => setShow(false)}>Скрыть</Button>
        </CardFooter>
    </Card> : <Button variant="outline" className="fixed bottom-2 right-2 animate-pulse" onClick={() => setShow(true)}>?</Button>
};