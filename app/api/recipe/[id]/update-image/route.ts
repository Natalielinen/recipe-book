import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  imageUrl: z.string().url(),
});


export async function POST(req: NextRequest, { params }: { params: { id: number } }) {
    try {
    const body = await req.json();
    const { imageUrl } = schema.parse(body);

    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(params.id) },
      data: { imageUrl },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении изображения рецепта:", error);
    return NextResponse.json({ error: "Ошибка при обновлении" }, { status: 500 });
  }
}