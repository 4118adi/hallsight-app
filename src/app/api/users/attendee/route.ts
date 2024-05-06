import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const attendees = await prisma.attendee.findMany();
    return res.status(200).json(attendees);
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching attendees', error });
  } finally {
    await prisma.$disconnect();
  }
}