'use client';

import { Api } from "@/app/services/api-client";
import { useRecipeStore } from "@/app/store/recipe";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Camera, Soup, X } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { uploadImage } from "@/lib/upload-image";

interface Props {
    imageUrl: string;
    recipeName: string;
    canUpdateImage?: boolean;
    recipeId?: number;
}

export const RecipeImage: React.FC<Props> = ({ imageUrl, recipeName, recipeId, canUpdateImage = false }) => {

    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
            const res = await uploadImage(formData);

            const data = await res.data;

            console.log("data", data);

            setUploadedImageUrl(data.data.url);

            await Api.updateImage(recipeId!, { imageUrl: data.data.url });

            const recipe = await Api.getRecipeById(recipeId!);
            setRecipe(recipe);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
        } finally {
            setIsUploading(false);

        }
    };

    const handleClickDeleteButton = () => {
        setShowConfirmModal(true);
    }

    const handleDeleteImage = async () => {
        setIsDeleting(true);
        await Api.deleteImage(recipeId!);
        setIsDeleting(false);

        const recipe = await Api.getRecipeById(recipeId!);
        setRecipe(recipe);

        setShowConfirmModal(false);
    }

    const noImageWrapperClass = "p-6 bg-secondary"

    return <div className={cn(!imageUrl && noImageWrapperClass, "group flex justify-center h-[260px] rounded-lg relative")}>
        {canUpdateImage && <input type="file" className="hidden" onChange={handleFileChange} ref={inputRef} />}
        {canUpdateImage && <div className="flex justify-between w-full p-2 absolute opacity-0 group-hover:opacity-100 transition duration-200 z-10">
            <Button
                className="cursor-pointer rounded-full"
                variant="outline"
                onClick={() => inputRef.current?.click()}
            >
                <Camera size={20} />
            </Button>

            {
                imageUrl && <Button
                    className="cursor-pointer rounded-full text-destructive"
                    variant="ghost"
                    onClick={handleClickDeleteButton}
                >
                    <X size={20} />
                </Button>
            }


        </div>}
        {
            imageUrl ?
                <img className="w-full h-full object-cover rounded-lg" src={imageUrl} alt={recipeName} />
                : <Soup size={215} className="text-gray-400" />
        }
        <ConfirmDeleteModal
            show={showConfirmModal}
            setShow={setShowConfirmModal}
            deletingItem="изображение"
            deliting={isDeleting}
            onDelete={handleDeleteImage}
        />
    </div>;
};