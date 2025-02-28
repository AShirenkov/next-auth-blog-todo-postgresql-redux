import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/configs/auth";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todos = await prisma.toDo.findMany({
    where: { user: { email: session.user.email } },
  });

  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text } = await req.json();

  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,

        ...(session.user.name && { name: session.user.name }),
      },
    });
  }

  const newToDo = await prisma.toDo.create({
    data: { text, userId: user.id },
  });

  return NextResponse.json(newToDo, { status: 201 });
}
