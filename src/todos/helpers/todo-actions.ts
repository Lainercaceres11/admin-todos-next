import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };

  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response ?? {};
};

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response ?? {};
};

export const deleteCompleteTodo = async (): Promise<boolean> => {
  const response = await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return response ?? false;
};
