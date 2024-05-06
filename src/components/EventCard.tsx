import React from 'react'


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type Props = {}

export default function EventCard({ }: Props) {
    return (
            <Card>
                <CardHeader>
                    <CardTitle>Event Title</CardTitle>
                    <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div></div>
                    <Button size="sm" variant="secondary">
                        Archive Product
                    </Button>
                </CardContent>
            </Card>
    
    )
}