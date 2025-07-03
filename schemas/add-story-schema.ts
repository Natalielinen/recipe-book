import { z } from "zod";

export const addStorySchema = z.object({
    title: z.string().min(2, "Минимальная длина названия истории 5 символов"),
    previewImage: z.string(),
    itemImages: z.array(z.object({
        image: z.string(),
        id: z.number()
    })).min(2, "Минимальное количество изображений 2").max(4)
});

export type AddStoryFormValues = z.infer<typeof addStorySchema>;