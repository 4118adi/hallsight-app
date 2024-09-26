import { NextRequest, NextResponse } from "next/server";

export async function handler(request: NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logged Out Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
export {handler as GET, handler as POST};
