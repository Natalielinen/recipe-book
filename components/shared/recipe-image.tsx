'use client';

import { Api } from "@/app/services/api-client";
import { useRecipeStore } from "@/app/store/recipe";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Camera, Soup } from "lucide-react";
import React from "react";
import { useState } from "react";

interface Props {
    imageUrl: string;
    recipeName: string;
    canUpdateImage?: boolean;
    recipeId?: number;
}

export const RecipeImage: React.FC<Props> = ({ imageUrl, recipeName, recipeId, canUpdateImage = false }) => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const API_KEY = "13b2d0d834fc27d79d6830d6bdb88bbf";

    const { setRecipe } = useRecipeStore((state) => state);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {


        const file = event.target.files?.[0];

        const formData = new FormData();
        //@ts-ignore
        formData.append("image", file);

        if (!file) return;

        setIsUploading(true);

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);

            const data = await res.data;

            setUploadedImageUrl(data.data.url);

            await Api.updateImage(recipeId!, { imageUrl: data.data.url });

            const recipe = await Api.getRecipeById(recipeId!);
            setRecipe(recipe);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        } finally {
            setIsUploading(false);

        }
    }

    const noImageWrapperClass = "p-6 bg-secondary rounded-lg h-[260px]"

    return <div className={cn(!imageUrl && noImageWrapperClass, "flex justify-center  relative")}>
        {canUpdateImage && <input type="file" className="hidden" onChange={handleFileChange} ref={inputRef} />}
        {canUpdateImage && <Camera className="cursor-pointer absolute top-1 left-1 -translate-x-1/2 -translate-y-1/2" onClick={() => inputRef.current?.click()} />}
        {
            imageUrl ?
                <img className="w-[215px] h-[215px]" src={imageUrl} alt={recipeName} />
                : <Soup size={215} className="text-gray-400" />
        }

    </div>;
};