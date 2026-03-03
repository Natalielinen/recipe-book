"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";
import { Title } from "./title";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

interface Props {
    className?: string;
    show: boolean;
    setShow: (value: boolean) => void;
    onDelete: () => void;
    deliting: boolean;
    deletingItem?: string;
}

export const ConfirmDeleteModal: React.FC<Props> = ({
    className,
    show,
    setShow,
    onDelete,
    deletingItem = "рецепт",
    deliting,
}) => {
    const { lang } = useLanguage();
    return (
        <Dialog open={show} onOpenChange={() => setShow(false)}>
            <DialogContent className={cn("sm:max-w-[425px]", className)}>
                <Title
                    text={`${translation[lang as Lang].areYouSureYouWantToDelete} ${deletingItem}?`}
                    size="md"
                />
                <p>{translation[lang as Lang].thisActionCannotBeUndone}</p>

                <DialogFooter>
                    <Button variant="destructive" onClick={onDelete} disabled={deliting}>
                        {translation[lang as Lang].delete}
                    </Button>
                    <Button variant="outline" onClick={() => setShow(false)}>
                        {translation[lang as Lang].cancel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
