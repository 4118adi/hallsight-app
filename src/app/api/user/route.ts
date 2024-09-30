import { NextResponse, NextRequest } from "next/server";
import { getUserIdFromToken } from "@/helpers/getUserIdFromToken/getUserIdFromToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function handler(req:NextRequest) {
    try {
        const userId = await getUserIdFromToken(req);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true
            }
        });
        if (user) {
            return NextResponse.json({
                message: "User Found",
                data: user
            })
        } else {
            return NextResponse.json({
                message: "User Not Found"
            })
        }
    } catch (error: any) {
        console.log(error.message)
    }
}

export { handler as POST, handler as GET };


