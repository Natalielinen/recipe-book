'use server';

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/prisma/prisma-client";


const actionClient = createSafeActionClient();

export const deleteStory = actionClient
    .schema(z.object({
        id: z.number()
    }))
    .action(async ({ parsedInput: { id } }) => {

        try {
            const data = await prisma.story.delete({
                where: {
                    id
                },
                include: {
                    items: true
                }
            })

            revalidatePath('/profile/all-stories');

            return {success: `История ${data.title} успешно удалена`};
            
        } catch (error) {
            return {error: JSON.stringify(error)}
        }
    
    });