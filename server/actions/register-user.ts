"use server";

import getBaseUrl from "@/lib/base-url";
import { prisma } from "@/prisma/prisma-client";
import { hashSync } from "bcrypt";
import { createSafeActionClient } from "next-safe-action";
import { formRegisterSchema } from "@/schemas/auth-schemas";
import { sendEmail } from "@/lib/sendEmail";

const actionClient = createSafeActionClient();

export const registerUser = actionClient
  .schema(formRegisterSchema)
  .action(
    async ({ parsedInput: { fullName, email, password } }) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (user) {
          if (!user.verified) {
            return { error: "Почта не подтверждена" };
          }

          return { error: "Пользователь уже существует" };
        }

        const createdUser = await prisma.user.create({
          data: {
            fullName: fullName,
            email: email,
            password: hashSync(password, 10),
            verified: null,
          },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
          data: {
            code,
            userId: createdUser.id,
          },
        });

        const verificationLink = `${getBaseUrl()}/api/auth/verify?code=${code}`;

        await sendEmail(
          createdUser.email,
          "Подтверждение регистрации",
          `Код для подтверждения регистрации: <b>${code}</b>, перейдите по ссылке: <a href="${verificationLink}">${verificationLink}</a>`
        );

        return {
          success:
            "Пользователь успешно зарегистрирован. Письмо с сылкой для подтверждения отправлено на указанную почту.",
        };
      } catch (err) {
        console.log("Error [CREATE_USER]", err);
        throw err;
      }
    }
  );
