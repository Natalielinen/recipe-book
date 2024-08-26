import { cn } from "../../lib/utils";

interface Props {
    className?: string
}

export const RecipesGroupList: React.FC<Props> = ({ className }) => {
    return <div className={cn('', className)}>ChooseProductModal</div>;
};