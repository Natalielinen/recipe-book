"use server";

import { authOptions } from "@/app/constants/auth-options";
import { prisma } from "@/prisma/prisma-client";
import { addRecipeSchema } from "@/schemas/add-recipe-schema";
import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

const actionClient = createSafeActionClient();

export const addRecipeOfADay = actionClient
  .schema(addRecipeSchema)
  .action(
    async ({
      parsedInput: {
        categoryId,
        recipeName,
        fullDescription,
        ingredients,
        servings,
        imageUrl,
        id,
      },
    }) => {
      try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
          return { error: JSON.stringify("Unauthorized") };
        }

        const userId = session.user.id;

        // Обновление существующего рецепта дня
        if (id) {
          const currentRecipe = await prisma.recipeOfADay.findFirst({
            where: {
              id: Number(id),
            },
          });

          if (!currentRecipe) {
            return { error: "Recipe not found" };
          }

          // Удаляем все существующие ингредиенты для данного рецепта
          await prisma.recipeOfADayIngredient.deleteMany({
            where: {
              id: Number(id),
            },
          });

          // Обновляем рецепт и добавляем ингредиенты
          const updatedRecipe = await prisma.recipeOfADay.update({
            where: {
              id: Number(id),
            },
            data: {
              recipeName,
              imageUrl,
              shortDescription: fullDescription?.substring(0, 100) || "",
              fullDescription,
              servings: Number(servings),
              categoryId: Number(categoryId),
              authorId: Number(userId),
              authorName: session.user.name as string,
              ingredients: {
                create: ingredients?.map((ingredient) => ({
                  name: ingredient.name,
                  amount: Number(ingredient.amount),
                  unit: ingredient.unit || "шт",
                  createdAt: new Date(),
                  price: Number(ingredient.price) || 0,
                  toTaste: Boolean(ingredient.toTaste),
                  updatedAt: new Date(),
                })),
              },
            },
          });

          revalidatePath("/profile/all-recipes");

          return { success: `Рецепт "${recipeName}" успешно обновлен` };
        }

        if (!id) {
          await prisma.recipeOfADay.create({
            data: {
              recipeName,
              imageUrl: imageUrl || "",
              authorId: Number(userId),
              authorName: session.user.name as string,
              shortDescription: fullDescription?.substring(0, 100) || "",
              fullDescription: fullDescription || "",
              servings: Number(servings),
              categoryId: Number(categoryId),
              ingredients: {
                create: ingredients?.map((ingredient) => ({
                  name: ingredient.name,
                  amount: Number(ingredient.amount),
                  unit: ingredient.unit || "шт",
                  toTaste: Boolean(ingredient.toTaste),
                })),
              },
            },
          });

          revalidatePath("/profile/all-recipes");

          // TODO: вынести в отдельную функцию

          // Отправка письма автору рецепта
          const transporter = nodemailer.createTransport({
            host: "smtp.yandex.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const email = session.user.email;

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Предложение рецепта",
            text: `Здравствуйте, ${session.user.name}! Вы предложили рецепт "${recipeName}". После проверки модератором он будет опубликован на сайте. Приятного аппетита!`,
          };

          await transporter.sendMail(mailOptions as any);

          // Отправка письма администратору

          const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: "nataliech0409@gmail.com",
            subject: "Предложение рецепта",
            text: `Здравствуйте, пользователь ${session.user.name} предложил рецепт "${recipeName}". Проверьте его в личном кабинете.`,
          };

          await transporter.sendMail(adminMailOptions as any);

          return { success: `Рецепт "${recipeName}" успешно добавлен` };
        }
      } catch (error) {
        return { error: JSON.stringify(error) };
      }
    }
  );
