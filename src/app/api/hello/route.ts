/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    message: "hellow",
  });
}
