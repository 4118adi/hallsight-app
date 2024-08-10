"use client"

import { useFormState } from "react-dom"
import { useRouter } from 'next/router'; // Import useRouter

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { toast } from "@/components/ui/use-toast"

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z.string({
    required_error: "Please add a description.",
  }),
  startTime: z.date({
    required_error: "Please select a start time.",
  }),
  endTime: z.date({
    required_error: "Please select an end time.",
  }),
  eventDate: z.date({
    required_error: "Event Date is required.",
  }),
  organizer: z.string({
    required_error: "Organizer is required.",
  }),
  hall: z.string({
    required_error: "Hall is required.",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // eventDate: new Date("2023-01-23"),
}

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  // const router = useRouter(); // For navigation after submission, if needed

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      // Redirect or notify the user
      router.push('/success'); // Example of redirecting to a success page
    } catch (error) {
      console.error('Error:', error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Literary Criticism" {...field} />
              </FormControl>
              <FormDescription>
                Title to be displayed on the Event Card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Description</FormLabel>
              <FormControl>
                <Input placeholder="An event aimed towards..." {...field} />
              </FormControl>
              <FormDescription>
                Briefly describe your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizer</FormLabel>
              <FormControl>
                <Input placeholder="Name of the Organizer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hall"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hall</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a hall" {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SOT Auditorium">SOT Auditorium</SelectItem>
                  <SelectItem value="Nagar Auditorium">Nagar Auditorium</SelectItem>
                  <SelectItem value="SOT CR 10">SOT CR 10</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This is your venue.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local"/>
              </FormControl>
              <FormDescription>
                Pick a date and start-time for the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local"/>
              </FormControl>
              <FormDescription>
                Pick a date and end-time for the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit"> Organize Event</Button>
      </form>
    </Form>
  )
}
