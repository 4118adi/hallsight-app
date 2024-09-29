import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "@/helpers/mailer/mailer";

const prisma = new PrismaClient();

async function handler(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;
    
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const salt = await bcryptjs.genSalt(10);    
        // Hash password
        const hashedPassword = await bcryptjs.hash(password,salt);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                id: Math.floor(100000000 + Math.random() * 900000000),
                username,
                email,
                password: hashedPassword
            },
        });

        // Send verification email using nodemailer
        await sendEmail({email, emailType:"verify", userId: newUser.id});

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            newUser: newUser,
        });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally{
      await prisma.$disconnect();
    }
}
export {handler as GET, handler as POST};
