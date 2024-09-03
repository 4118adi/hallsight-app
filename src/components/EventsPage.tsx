'use client'

import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { useState, useEffect } from 'react';
import { AccountForm } from "./AccountForm"
interface Event {
    id: number;
    name: string;
    description: string;
    organizer: string;
    hall: string;
    startTime: string; // Using string to keep it simple; adjust based on your data type
    endTime: string;
}

export function EventDashboard() {

    const [isVisible, setIsVisible] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    // Fetch events from the API
    async function fetchEvents() {
        try {
            const response = await fetch('/api/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await response.json();
            setEvents(data.events); // Assuming the response format is { events: [...] }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
        console.log(":)");

        // Set up polling every 30 seconds
        const interval = setInterval(fetchEvents, 100); // Adjust the interval as needed

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">


                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">

                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base" onClick={toggleVisibility}
                    >
                        <Button > {isVisible && (<b>Browse</b>)} {!isVisible && (<b>Add</b>)}</Button>
                    </Link>

                </nav>

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">


                    <div className="block sm:hidden relative">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base" onClick={toggleVisibility}
                        >
                            <Button>{isVisible && (<b>Browse</b>)} {!isVisible && (<b>Add</b>)}</Button>
                        </Link>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold"><b>Hall</b><i>Sight</i></h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    {isVisible && (
                        <h1 className="text-3xl font-semibold"> Adding Event </h1>
                    )}
                    {!isVisible && (
                        <h1 className="text-3xl font-semibold"> Your Events </h1>)}
                </div>

                {/* SIDE NAVIGATION EXTRA AREA HEREEEEE */}

                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                    </nav>

                    <div className="grid gap-6">
                        {!isVisible && (events.length > 0 ? (
                            events.map((event) => (
                                <Card key={event.id}>
                                    <CardHeader>
                                        <CardTitle>{event.name}</CardTitle>
                                        <CardDescription>{event.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-4">
                                            Organizer: {event.organizer}
                                            <br />
                                            Hall: {event.hall}
                                            <br />
                                            Start Time: {new Date(event.startTime).toLocaleString()}
                                            <br />
                                            End Time: {new Date(event.endTime).toLocaleString()}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t px-6 py-4">
                                        <Button>Peek</Button>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <p>No upcoming events...</p>
                        ))}

                        {isVisible && (
                            <AccountForm />
                        )}

                    </div>

                </div>
            </main>
        </div>
    )
}
