import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handler(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;
    
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({
            message: "User created successfully",
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
