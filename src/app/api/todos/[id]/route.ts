import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const id = params.id;
  const body = await request.json();

  const data: { title?: string; done?: boolean } = {};
  if (typeof body?.title === "string" && body.title.trim()) data.title = body.title.trim();
  if (typeof body?.done === "boolean") data.done = body.done;

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  try {
    const updated = await prisma.todo.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "todo not found" }, { status: 404 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const id = params.id;

  try {
    const removed = await prisma.todo.delete({ where: { id } });
    return NextResponse.json(removed);
  } catch {
    return NextResponse.json({ error: "todo not found" }, { status: 404 });
  }
}
