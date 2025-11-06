"use server";

import { getUserSession } from "@/lib/get-userSession";
import { prisma } from "@/prisma/prisma-client";
import { formUpdateUserShema } from "@/schemas/auth-schemas";
import { hashSync } from "bcrypt";
import { createSafeActionClient } from "next-safe-action";

const actionClient = createSafeActionClient();

export const updateUserInfo = actionClient
  .schema(formUpdateUserShema)
  .action(async ({ parsedInput: { fullName, email, password } }) => {
    try {
      const currentUser = await getUserSession();

      if (!currentUser) {
        return { error: "Пользователь не найден" };
      }

      const findUser = await prisma.user.findFirst({
        where: {
          id: Number(currentUser.id),
        },
      });

      await prisma.user.update({
        where: {
          id: Number(currentUser.id),
        },
        data: {
          fullName,
          email,
          password: password
            ? hashSync(password as string, 10)
            : findUser?.password,
        },
      });

      return { success: "Данные успешно обновлены" };
    } catch (err) {
      return { error: "Произошла ошибка" };
    }
  });
