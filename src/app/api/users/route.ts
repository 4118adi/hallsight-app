import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const reqBody = await req.json();
      const { id } = reqBody;

      await prisma.user.delete({
        where: { id: Number(id) },
      });

      return NextResponse.json({ message: "User Deleted Successfully." }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const reqBody = await req.json();
      const { id, role } = reqBody;

      await prisma.user.update({
        where: { id: Number(id) },
        data: { role },
      });

      return NextResponse.json({ message: "User role updated successfully" }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
export {handler as GET, handler as POST, handler as PATCH, handler as DELETE}