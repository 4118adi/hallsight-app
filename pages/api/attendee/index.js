import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all attendees
    const attendees = await prisma.Attendee.findMany();
    res.status(200).json(attendees);
  } else if (req.method === 'POST') {
    // Create a new attendee
    const { name, facePhoto, enrollmentNum, email, school, branch, semester, university } = req.body;
    const attendee = await prisma.Attendee.create({
      data: {
        name,
        facePhoto,
        enrollmentNum,
        email,
        school,
        branch,
        semester,
        university,
      },
    });
    res.status(201).json(attendee);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
