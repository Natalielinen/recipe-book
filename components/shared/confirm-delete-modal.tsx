'use client';

import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";
import { Title } from "./title";

interface Props {
    className?: string;
    show: boolean;
    setShow: (value: boolean) => void;
    onDelete: () => void;
    deliting: boolean;
}

export const ConfirmDeleteModal: React.FC<Props> = ({
    className,
    show,
    setShow,
    onDelete,
    deliting
}) => {

    return (
        <Dialog open={show} onOpenChange={() => setShow(false)}>
            <DialogContent className={cn(
                "sm:max-w-[425px]",
                className)} >
                <Title text="Вы уверены, что хотите удалить рецепт?" size="md" />
                <p>Это действие нельзя будет отменить</p>

                <DialogFooter>
                    <Button variant="destructive" onClick={onDelete} disabled={deliting}>
                        Удалить
                    </Button>
                    <Button variant="outline" onClick={() => setShow(false)}>
                        Отмена
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>

    );
};