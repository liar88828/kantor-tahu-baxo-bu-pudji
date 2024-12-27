'use client'
import React, { useEffect, useState } from "react";
import { useOtpStore } from "@/store/otp";

// const targetTime = new Date(Date.now() + 60 * 1000).getTime();

export const Countdown = () => {
    const { store: { time: targetTime }, setData } = useOtpStore()

    const [ remainingTime, setRemainingTime ] = useState(targetTime ? targetTime - Date.now() : 0);
    const [ isMounted, setIsMounted ] = useState(false); // To check if component has mounted

    useEffect(() => {
        setIsMounted(true); // Set to true once mounted
    }, []);

    useEffect(() => {
        if (!isMounted || !targetTime) return;

        const interval = setInterval(() => {
            const now = targetTime - Date.now()
            setRemainingTime(now);
            setData({ remainingTime: now })
        }, 1000);

        return () => clearInterval(interval);
    }, [ isMounted, setData, targetTime ]);

    // If there's no target time or it's null, show a message
    if (!targetTime) return (<>Is button to add 1 min</>);

    // If countdown has finished
    if (remainingTime <= 0) return (<>Time&#39;s up!</>);

    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    return (<>{ minutes }:{ displaySeconds < 10 ? `0${ displaySeconds }` : displaySeconds }s</>
    );
};

// export function Countdown({ startDate }: CountdownProps) {
//     const dataUser = new Date(startDate).getTime(); // Convert startDate to milliseconds
//     const dataNow = Date.now(); // Get current time in milliseconds
//     const date = dataUser - dataNow
//     console.log(date)// to date
//
//     return (
//         <div>
//             asdas
//         </div>
//     )
//
// }

