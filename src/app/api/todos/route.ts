import { getUserServerSession } from "@/app/auth/actions/actions";
import prisma from "@/prismaClient/prisma";

import { NextResponse } from "next/server";
import { boolean, object, string } from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");
  if (isNaN(take)) {
    return NextResponse.json(
      { message: "Take must be a number" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "Skip must be a number" },
      { status: 400 }
    );
  }

  try {
    const todos = await prisma.todo.findMany({ take: take, skip: skip });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// Esquema para crear todos
const postSchema = object({
  description: string().required(),
  complete: boolean().optional().default(false),
});

export async function POST(request: Request) {
  const user = await getUserServerSession();

  if (!user || user.id) {
    NextResponse.json("No autorizado", { status: 401 });
  }

  const { description, complete } = await postSchema.validate(
    await request.json()
  );

  const todo = await prisma.todo.create({
    data: { description, complete, userId: user?.id },
  });

  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE() {
  const user = await getUserServerSession();

  if (!user || user.id) {
    NextResponse.json("No autorizado", { status: 401 });
  }

  try {
    await prisma.todo.deleteMany({
      where: { complete: true, userId: user?.id },
    });
    return NextResponse.json({ message: "Todos eliminados" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
