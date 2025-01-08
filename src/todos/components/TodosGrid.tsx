"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

// import * as api from "@/todos/helpers/todo-actions";
// import { useRouter } from "next/navigation";
import { onToggleTodoAction } from "../actions/todo-action";

interface Props {
  todos: Todo[];
}

export const TodosGrid = ({ todos }: Props) => {
  // const router = useRouter();

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updateTodo = await api.updateTodo(id, complete);
  //   router.refresh();
  //   return updateTodo;
  // };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={onToggleTodoAction} />
        ))}
      </div>
    </>
  );
};
