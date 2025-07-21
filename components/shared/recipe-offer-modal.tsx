import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";


interface RecipeOfferModalProps {
    open: boolean;
    handleClose: () => void;
}

export const RecipeOfferModal = ({ open, handleClose }: RecipeOfferModalProps) => {
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[450px] bg-background p-10">
                <Button> Создать рецепт</Button>
                <Button> Выбрать рецепт</Button>
            </DialogContent>
        </Dialog>
    )
}