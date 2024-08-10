import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'; // Assuming you're using Prisma for database

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, organizer, hall, startTime, endTime } = req.body;

    try {
      const event = await prisma.event.create({
        data: {
          name,
          description,
          organizer,
          hall,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });

      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
