import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export async function handler(req:NextApiRequest,res:NextApiResponse){
    if (req.method === "GET") {
        try {
            const data = await prisma.user.findMany({});
            res.status(200).json(data);            
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        };
    }

    
};
export {handler as GET,handler as POST,handler as DELETE}