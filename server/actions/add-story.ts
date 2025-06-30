'use server';

import { prisma } from "@/prisma/prisma-client";
import { addStorySchema } from "@/schemas/add-story-schema";
import { createSafeActionClient } from "next-safe-action";

const actionClient = createSafeActionClient();

export const addStory = actionClient
  .schema(addStorySchema)
  .action(async ({ parsedInput: { title, previewImage, itemImages } }) => {
    try {
      const newStory = await prisma.story.create({
        data: {
          title,
          previewImageUrl: previewImage,
          items: {
            create: itemImages.map(({ image }) => ({
                sourceUrl: image,
              })),
          },
        },
      });

      return { success: `История "${title}" успешно добавлена` };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });

