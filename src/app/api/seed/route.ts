/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/prismaClient/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  await prisma?.todo.deleteMany();
  await prisma.user.deleteMany();

 await prisma.user.create({
    data: {
      email: "test1@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      roles: ["client", "admin"],
      todos: {
        create: [
          { description: "Learn React", complete: true },
          { description: "Learn JS", complete: true },
          { description: "Learn Node", complete: true },
          { description: "Learn RJX" },
          { description: "Learn Zustand" },
        ],
      },
    },
  });

  return NextResponse.json({
    message: "seed",
  });
}
