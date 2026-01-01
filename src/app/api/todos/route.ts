import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const title = String(body?.title || "").trim();

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const created = await prisma.todo.create({
    data: { title },
  });

  return NextResponse.json(created, { status: 201 });
}
