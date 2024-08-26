import { cn } from "../../lib/utils";
import { RecipeCard } from "./recipe-card";
import { Title } from "./title";

interface Props {
    title: string;
    recipes: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
    lng: string;
}

export const RecipesGroupList: React.FC<Props> = ({
    className,
    listClassName,
    title,
    recipes,
    categoryId,
    lng
}) => {
    return <div className={cn('', className)}>

        <Title text={title} size="lg" className="font-extrabold mb-5" />

        <div className={cn('grid grid-cols-4 gap-[50px]', listClassName)}>

            {
                recipes.map((recipe, i) => (
                    <RecipeCard
                        id={recipe.id}
                        key={recipe.id}
                        recipeName={recipe.name}
                        imageUrl={recipe.imageUrl}
                        shortDescription={recipe.shortDescription}
                        lng={lng}
                    />
                ))
            }
        </div>
    </div>;
};