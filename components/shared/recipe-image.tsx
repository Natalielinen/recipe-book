import { Soup } from "lucide-react";

interface Props {
    imageUrl: string;
    recipeName: string;
}

export const RecipeImage: React.FC<Props> = ({ imageUrl, recipeName }) => {
    return <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
        {
            imageUrl ?
                <img className="w-[215px] h-[215px]" src={imageUrl} alt={recipeName} />
                : <Soup size={215} className="text-gray-400" />
        }

    </div>;
};