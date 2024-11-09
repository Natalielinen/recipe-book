'use server';

import { getUserSession } from "@/lib/get-userSession";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import nodemailer from 'nodemailer';

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
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
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
};

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
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

    const transporter = nodemailer.createTransport({
        host: "smtp.yandex.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

   const verificationLink = `https://recipe-book-teal-five.vercel.app/api/auth/verify?code=${code}`;
   // const verificationLink = `http://localhost:3000/api/auth/verify?code=${code}`;

     const mailOptions = {
        from: process.env.EMAIL_USER,
        to: createdUser.email,
        subject: 'Подтверждение регистрации',
        html: `Код для подтверждения регистрации: <b>${code}</b>, перейдите по ссылке: <a href="${verificationLink}">${verificationLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}

