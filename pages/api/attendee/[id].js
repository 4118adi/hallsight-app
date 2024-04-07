import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const attendeeId = req.query.id;

  if (req.method === 'GET') {
    // Fetch attendee by ID
    const attendee = await prisma.Attendee.findUnique({
      where: { id: parseInt(attendeeId) },
    });
    if (!attendee) {
      res.status(404).json({ message: 'attendee not found' });
    } else {
      res.status(200).json(attendee);
    }
  } else if (req.method === 'PUT') {
    // Update attendee by ID
    const { name, facePhoto, enrollmentNum, email, school, branch, semester, university } = req.body;
    const updatedattendee = await prisma.Attendee.update({
      where: { id: parseInt(attendeeId) },
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
    res.status(200).json(updatedattendee);
  } else if (req.method === 'DELETE') {
    // Delete attendee by ID
    const deletedattendee = await prisma.Attendee.delete({
      where: { id: parseInt(attendeeId) },
    });
    res.status(200).json(deletedattendee);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
