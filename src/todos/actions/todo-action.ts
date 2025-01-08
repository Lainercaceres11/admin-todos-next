/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import prisma from "@/prismaClient/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onToggleTodoAction = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con el id ${id} no encontrado`;
  }

  const updateTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-actions");
  return updateTodo ?? {};
};

export const addTodoAction = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("/dashboard/server-actions");
    return todo;
  } catch (error) {
    return {
      message: "Error al crear la tarea",
    };
  }
};

export async function deleteTodoAction() {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath("/dashboard/server-actions");
  } catch (error) {
    return { messag: "Error al intentar eliminar el todo" };
  }
}
