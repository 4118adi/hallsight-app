import { NextResponse, NextRequest } from "next/server";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken/getUserIdFromToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function handler(req:NextRequest) {
    const userId = await getUserIdFromToken(req);
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
    });
    return NextResponse.json({
        message: "User Found",
        data: user
    })
}

export { handler as POST, handler as GET };


