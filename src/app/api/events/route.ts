import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// API Route handler
export async function handler(req: NextRequest) {
  if (req.method === "GET") {
    // Handle GET request - fetch all events
    try {
      const events = await prisma.event.findMany();
      return NextResponse.json({ events }, { status: 200 });
    } catch (error) {
      console.error("Error fetching events:", error);
      return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
  } else if (req.method === "POST") {
    // Handle POST request - create a new event
    try {
      const body = await req.json();  // Parse the request body as JSON
      const { name, description, startTime, endTime, organizer, hall } = body;

      // Validate incoming data (this could be expanded with a schema validation step)
      if (!name || !description || !startTime || !endTime || !organizer || !hall) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }

      // Convert string dates to JavaScript Date objects
      const start = new Date(startTime);
      const end = new Date(endTime);

      // Save to the database
      const newEvent = await prisma.event.create({
        data: {
          name,
          description,
          startTime: start,
          endTime: end,
          organizer,
          hall,
        },
      });

      return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
      console.error("Error creating event:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  } else {
    // Handle unsupported methods
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}

// Ensure correct export for API Route
export { handler as GET, handler as POST };
  