import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { id: Number(params.id) },
      data: { imageUrl: null },
    });

    return NextResponse.json(updatedRecipe, { status: 200 });
  } catch (error) {
    console.error("Ошибка при удалении изображения рецепта:", error);
    return NextResponse.json({ error: "Ошибка при удалении" }, { status: 500 });
  }
}
