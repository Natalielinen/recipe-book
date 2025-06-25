import { z } from "zod";

export const addStorySchema = z.object({
    title: z.string().min(2, "Минимальная длина названия истории 5 символов"),
    previewImage: z.string(),
    itemImage: z.array(z.string()).min(2).max(4)
});

export type AddStoryFormValues = z.infer<typeof addStorySchema>;