import { NextResponse } from "next/server";

import prisma from "@/prismaClient/prisma";

import { boolean, object, string } from "yup";
import { getUserServerSession } from "@/app/auth/actions/actions";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string) => {
  const user = await getUserServerSession();

  if (!user || user.id) {
    NextResponse.json("No autorizado", { status: 401 });
  }

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!user || todo?.userId === user.id) return null;

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = object({
  description: string().optional(),
  complete: boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  const { description, complete } = await putSchema.validate(
    await request.json()
  );

  const updatedTodo = await prisma.todo.update({
    where: { id: params.id },
    data: { description, complete },
  });

  return NextResponse.json(updatedTodo);
}
