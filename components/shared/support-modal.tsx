'use client';

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

interface SupportModalProps {
    className?: string,
}

export const SupportModal: React.FC<SupportModalProps> = ({ className }) => {
    const { lang } = useLanguage();

    const [show, setShow] = useState<boolean>(false);

    return show ? <Card className={cn('w-[350px] fixed bottom-2 right-2 pt-4', className)}>
        <CardContent className="pb-0">
            <p className="mb-2 text-primary">{translation[lang as Lang].doYouHaveAQuestion}</p>
            <p className="text-primary flex gap-4 justify-start items-center">
                {translation[lang as Lang].write} <strong><a href="mailto:rec1pebook@yandex.ru" target="_blank" className="underline">rec1pebook@yandex.ru</a></strong>
            </p>
        </CardContent>
        <CardFooter className="p-1">
            <Button variant="link" onClick={() => setShow(false)}>{translation[lang as Lang].hide}</Button>
        </CardFooter>
    </Card> : <Button variant="outline" className="fixed bottom-2 right-2 animate-pulse" onClick={() => setShow(true)}>?</Button>
};