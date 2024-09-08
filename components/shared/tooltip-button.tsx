import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { VariantProps } from "class-variance-authority";

interface Props {
    className?: string;
    children: string | React.ReactNode;
    tooltipContent: string | React.ReactNode;
    buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    onButtonClick: () => void;
}

export const TooltipButton: React.FC<Props> = ({
    className,
    children,
    tooltipContent,
    buttonVariant = "outline",
    onButtonClick
}) => {
    return <TooltipProvider >
        <Tooltip >
            <TooltipTrigger asChild>
                <Button
                    className={cn('', className)}
                    variant={buttonVariant}
                    onClick={onButtonClick}
                >
                    {children}
                </Button>


            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltipContent}</p>
            </TooltipContent>

        </Tooltip>


    </TooltipProvider>;
};