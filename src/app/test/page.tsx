'use client'

import { useState, useEffect } from "react";
import styles from "@/app/test/SeatGrid.module.css"; // Import your custom CSS for styling
import UserManagement from "@/components/UserManagement"
// Define the type for seat data
type SeatData = Record<string, boolean>;

const SeatGrid = () => {
    // Initialize the state with the type annotation
    const [seatData, setSeatData] = useState<SeatData>({});

    // Function to fetch the weight sensor data
    const fetchSensorData = async () => {
        try {
            // Replace 'api/weight-sensor' with the actual URL for fetching weight sensor data
            const response = await fetch("/api/weight-sensor");
            if (response.ok) {
                const data: SeatData = await response.json(); // Specify the type for JSON response
                setSeatData(data);
            } else {
                const data = {
                    1: true,
                    2: false,
                    3: true,
                };
                setSeatData(data);

            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    };

    // Fetch sensor data on component mount
    useEffect(() => {
        fetchSensorData();
    }, []);

    return (
        <div className={styles.grid}>
            {/* {Object.keys(seatData).map((seatNo) => (
                <div
                    key={seatNo}
                    className={`${styles.seat} ${seatData[seatNo] ? styles.occupied : styles.vacant
                        }`}
                >
                    {seatNo}
                </div>
            ))} */}
            <UserManagement></UserManagement>
        </div>
    );
};

export default SeatGrid;