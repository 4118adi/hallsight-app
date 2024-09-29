"use client"; // Ensure this component is treated as a client component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
    const search = useSearchParams();
    const [token, setToken] = useState("");  // Token state to capture from URL
    const [isVerified, setIsVerified] = useState(false);      // Verification status
    const [error, setError] = useState(false);                // Error state for failed verification
    const [loading, setLoading] = useState(false);            // Loading state

    const verifyEmail = async () => {
        setLoading(true);
        try {
            if (!token) return; // Avoid making the request if there's no token
            await axios.post("/api/auth/verify", { token });
            setIsVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    // Extract token from URL query when the component is mounted
    useEffect(() => {
        const queryToken = search.get("token");
        if (queryToken) {
            setError(false);
            setToken(queryToken);
        }
    }, []);

    // Automatically verify if the token exists in the URL
    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Email Verification</h1>

            {loading && <p className="text-gray-700">Verifying...</p>}

            {isVerified ? (
                <div className="text-center">
                    <p className="text-green-500 mb-4">Your email has been successfully verified!</p>
                    <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Login
                    </Link>
                </div>
            ) : error ? (
                <p className="text-red-500">Email verification failed. Please try again.</p>
            ) : (
                <div className="text-center">
                    <p className="mb-4">Click the button below to verify your email:</p>
                    <button
                        onClick={verifyEmail}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                    >
                        Verify Email
                    </button>
                </div>
            )}
        </div>
    );
}
