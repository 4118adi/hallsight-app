import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Helper function to get the Flask API URL
const getFlaskApiUrl = () => {
    // Use environment variable or fallback to localhost
    const baseUrl = process.env.FLASK_API_URL || 'http://127.0.0.1:5000';
    return `${baseUrl}/detect-seats`;
};

export async function GET(req: NextRequest) {
    try {
        console.log("Sending request to Flask API...");
        
        // Fetch data from Flask API using Axios
        const response = await axios.get(getFlaskApiUrl(), {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 15000,  // Set a timeout of 5 seconds
        });

        console.log("Flask API Response:", response.data);
        
        // Return a successful JSON response using NextResponse
        return NextResponse.json(response.data, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching data from Flask API:", error.message);

        // Handle different types of errors
        if (error.code === 'ECONNABORTED') {
            return NextResponse.json({ message: 'Request to Flask API timed out' }, { status: 504 });
        } else if (error.response) {
            return NextResponse.json({ message: error.response.data }, { status: error.response.status });
        } else {
            return NextResponse.json({ message: 'Failed to fetch data from Flask API' }, { status: 500 });
        }
    }
}
