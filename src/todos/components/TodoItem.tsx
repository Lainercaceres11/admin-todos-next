/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Todo } from "@prisma/client";

import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import css from "./todo-item.module.css";
import { startTransition, useOptimistic } from "react";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [optimisticTodo, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!optimisticTodo.complete));
      await toggleTodo(optimisticTodo.id, !optimisticTodo.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!optimisticTodo.complete));
    }
  };
  return (
    <div className={optimisticTodo.complete ? css.todoDone : css.todoPending}>
      <div className="flex justify-center items-center sm:flex-col gap-4">
        <div
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${
            optimisticTodo.complete ? "bg-blue-100" : "bg-red-100"
          } `}
        >
          {optimisticTodo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {optimisticTodo.description}
        </div>
      </div>
    </div>
  );
};
