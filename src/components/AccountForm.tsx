"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";



const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  description: z.string(),
  startTime: z.date({ required_error: "Please select a start time." }),
  endTime: z.date({ required_error: "Please select an end time." }),
  organizer: z.string(),
  hall: z.string({ required_error: "Please select a hall." }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const router = useRouter();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {},
  });

  const { errors } = useFormState({ control: form.control });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      console.log("Form submitted successfully:", data);
      // router.push("/success"); // Redirect to a success page after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Event Title</Label>
          <Input
            id="name"
            type="text"
            placeholder="Literary Criticism"
            {...form.register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Event Description</Label>
          <Input
            id="description"
            type="text"
            placeholder="An event aimed towards..."
            {...form.register("description")}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            type="text"
            placeholder="Name of the Organizer"
            {...form.register("organizer")}
          />
          {errors.organizer && <p>{errors.organizer.message}</p>}
        </div>

        <div>
          <Label htmlFor="hall">Hall</Label>
          <Select onValueChange={(value) => form.setValue("hall", value)}
          >
            <SelectTrigger id="hall">
              <SelectValue placeholder="Select a venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SOT Auditorium">SOT Auditorium</SelectItem>
              <SelectItem value="Nagar Auditorium">Nagar Auditorium</SelectItem>
              <SelectItem value="SOT CR 10">SOT CR 10</SelectItem>

            </SelectContent>
          </Select>

          {errors.hall && <p>{errors.hall.message}</p>}
        </div>

        <div>
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="datetime-local"
            {...form.register("startTime", {
              valueAsDate: true,
            })}
          />
          {errors.startTime && <p>{errors.startTime.message}</p>}
        </div>

        <div>
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="datetime-local"
            {...form.register("endTime", {
              valueAsDate: true,
            })}
          />
          {errors.endTime && <p>{errors.endTime.message}</p>}
        </div>

        <Button type="submit">Organize</Button>
      </form>
    </div>
  );
}
