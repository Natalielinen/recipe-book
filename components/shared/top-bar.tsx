'use client';

import { Plus } from "lucide-react";
import { useTranslation } from "../../app/i18n/client";
import { Button } from "../ui/button";
import { Categories } from "./categories";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface Props {
    lng: string;
    className?: string;
}

export const TopBar: React.FC<Props> = ({ lng, className }) => {

    const { t } = useTranslation(lng)
    return <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className="flex items-center justify-between">
            <Categories lng={lng} />
            <Button variant="outline">{t("Добавить рецепт")} <Plus size={16} className="ml-2" /></Button>
        </Container>
    </div>
};