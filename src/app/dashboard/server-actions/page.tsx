export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserServerSession } from "@/app/auth/actions/actions";
import prisma from "@/prismaClient/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de todos",
  description: "Listado de tareas pendientes",
};

export default async function RestPage() {
  const user = await getUserServerSession();

  if (!user || !user.id) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });
  return (
    <div>
      <h1 className="text-5xl font-bold">Server actions</h1>
      <div className="w-full p-3 mx-3 mt-3">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
