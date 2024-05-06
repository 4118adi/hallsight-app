// components/auth/SignupForm.tsx
"use client"
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
export default function SignupForm() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            console.log('Signup successful:', response);
            if (response.status === 200) {
                router.push("/");
            } else {
                setError("Username or Email is already used.");
            }
        } catch (error: any) {
            setError("Failed to sign up.");
            console.error('Error signing up:', error.response.data);
            // Handle error, show error message, etc.
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl text-center">Sign Up</CardTitle>
                <CardDescription>Enter your details to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder="Max"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/" className="underline">
                        Login
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
