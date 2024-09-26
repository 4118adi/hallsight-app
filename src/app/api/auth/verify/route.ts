import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/helpers/mailer/mailer";
import { any } from "zod";
import { error } from "console";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log(token);

        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                verifyTokenExpiration: {
                    gt: new Date()
                }
            }
        });
        if (!user) {
            return NextResponse.json({
                error: "Invalid or Expired Token"
            }, { status: 404 });
        }
        console.log(user)
        if (user) {
            // Update user verification status and clear the token and expiration
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    isVerified: true,              // Set user as verified
                    verifyToken: null,             // Clear the token
                    verifyTokenExpiration: null,   // Clear the expiration
                },
            });
            return NextResponse.json({
                message: "Email Verified Successfully",
                success: true
            });
          
        }
    } catch (error: any) {
        return NextResponse.json({error: error.message}, { status: 500 });
    }
}
