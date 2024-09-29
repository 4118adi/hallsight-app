'use client'

import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { useState, useEffect } from 'react';
import { AccountForm } from "./AccountForm"

import GridContainer from "./GridContainer"

import axios from "axios"

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


    // fetching the data for PEEK here

    const [showGrid, setShowGrid] = useState(false); // State to control the display of the grid
    const [seatStatuses, setSeatStatuses] = useState<string[]>([]); // State to store seat statuses from API

    // Function to fetch seat statuses from the API
    const fetchSeatStatuses = async () => {
        try {
            // Make a GET request to your API to fetch the seat data
            const response = await axios.get('/api/seat');
            const seatStatusObject = response.data;

            setSeatStatuses(seatStatusObject); // Set the array of occupied seat IDs

            console.log('Unoccupied Seats:', seatStatusObject);
            console.log('state:', seatStatuses);

            setShowGrid(true); // Show the grid after fetching the data

        } catch (error) {
            console.error('Error fetching seat data:', error);
        }
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
        // const interval = setInterval(fetchEvents, 1000); // Adjust the interval as needed

        // Clean up interval on component unmount
        // return () => clearInterval(interval);
    }, []);


    return (
        <div className="flex pt-0 min-h-screen w-100% flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background  px-4 md:px-6">

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">


                    <div className=" relative">
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

                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[100px_200px] lg:grid-cols-[100px_500px]">
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
                                            Hall: {event.hall} <br />
                                            Start Time: {new Date(event.startTime).toLocaleString()}
                                            <br />
                                            End Time: {new Date(event.endTime).toLocaleString()}
                                            <br />
                                            Organizer: {event.organizer}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t px-6 py-4">
                                        {/* <Button>Peek</Button> */}
                                        <Sheet>
                                            <SheetTrigger><Button onClick={fetchSeatStatuses}>Peek</Button></SheetTrigger>
                                            <SheetContent side='bottom'>
                                                <SheetHeader>
                                                    <SheetTitle>{event.name}</SheetTitle>
                                                    <SheetDescription>

                                                    </SheetDescription>
                                                </SheetHeader>
                                                {showGrid && (
                                                    <div className="flex-col overflow-x-auto">
                                                        <div className="flex py-2 space-x-2">
                                                            <div className="flex-shrink-0">
                                                                <GridContainer rows={1} startRow={0} columns={7} startLetter="A" seatStatuses={seatStatuses} />

                                                            </div>
                                                            <div className=" flex-shrink-0">
                                                                <GridContainer rows={1} startRow={0} columns={7} startLetter="H" seatStatuses={seatStatuses} />
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <GridContainer rows={1} startRow={0} columns={1} startLetter="O" seatStatuses={seatStatuses} />
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <GridContainer rows={1} startRow={0} columns={1} startLetter="P" seatStatuses={seatStatuses} />
                                                            </div>
                                                        </div>

                                                        <div className="flex space-x-20">
                                                            <div className="flex-shrink-0"> {/* Ensure left container does not shrink */}
                                                                <GridContainer startRow={1} rows={10} columns={7} startLetter="A" seatStatuses={seatStatuses} />

                                                            </div>
                                                            <div className="flex-shrink-0"> {/* Ensure right container does not shrink */}
                                                                <GridContainer startRow={1} rows={10} columns={7} startLetter="H" seatStatuses={seatStatuses} />

                                                            </div>
                                                        </div>
                                                    </div>)}

                                            </SheetContent>
                                        </Sheet>

                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <p>No upcoming events</p>
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
