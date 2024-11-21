import { cn } from "../../lib/utils";

interface Props {
    className?: string;
    title?: React.ReactNode;
    amount: number;
    unit: string;
    toTaste?: boolean
}

export const IngredientListItem: React.FC<Props> = ({ className, title, amount, unit, toTaste }) => {
    return <li className={cn("flex", className)}>
        <span className={cn("flex flex-1 text-lg text-neutral-500")}>
            {title}
            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
        </span>
        {
            toTaste ? "по вкусу" : <span className="font-bold text-lg">{amount} {unit}</span>
        }


    </li>;
};