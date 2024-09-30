
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();


export async function handler(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;

        //check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });      
        if(!user){
            console.log("User does not exist");
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        } else if (!user.isVerified) {
            console.log("User is not verified");
            return NextResponse.json({error: "Please verify your email."}, {status: 400})
        }
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        
        
        //create token data
        const tokenData = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/"
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
export {handler as GET, handler as POST};
