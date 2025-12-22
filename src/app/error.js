"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <ErrorDisplay
            code="ERR"
            title="SYSTEM_FAILURE"
            description="An unexpected anomaly has occurred in the core systems. Diagnostics running."
            action={{
                label: "Reboot System",
                onClick: () => reset()
            }}
        />
    );
}
