import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


type Props = {}

export default function MainTab({ }: Props) {
    const isThirdTabEnabled = true;
    return (

        <div className='flex fixed top-2 w-full px-0 justify-center'>
            <Tabs defaultValue="events" className='w-[350px]'>
                <div className='flex justify-center'>
                    <TabsList className='flex overflow-hidden w-auto px-3'>
                        <TabsTrigger className='px-5 overflow-hidden' value="events">Events</TabsTrigger>
                        {isThirdTabEnabled && (
                            <TabsTrigger className=' overflow-hidden px-3' value="dashboard">Dashboard</TabsTrigger>
                        )}
                        <TabsTrigger className='px-3 overflow-hidden ' value="account">Account</TabsTrigger>
                    </TabsList></div>
                <div className='flex justify-center' >
                    <TabsContent value="events">This is supoosed to show events.</TabsContent>
                    {isThirdTabEnabled && (
                        <TabsContent value="dashboard">Analytics!!!!!</TabsContent>
                    )}
                    <TabsContent value="account">And this account.</TabsContent>
                </div>
            </Tabs>
        </div>
    )
}