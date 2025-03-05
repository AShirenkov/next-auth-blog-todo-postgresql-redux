import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await prisma.toDo.delete({ where: { id: params.id } });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
