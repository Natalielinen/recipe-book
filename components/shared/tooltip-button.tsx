import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface Props {
    className?: string;
    children: string | React.ReactNode;
    tooltipContent: string | React.ReactNode;
    buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
    onButtonClick?: () => void;
    size?: "sm" | "lg";
}

export const TooltipButton: React.FC<Props> = ({
    className,
    children,
    tooltipContent,
    buttonVariant = "outline",
    size,
    onButtonClick,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className={cn("", className)}
                        variant={buttonVariant}
                        onClick={onButtonClick}
                        size={size}
                    >
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
