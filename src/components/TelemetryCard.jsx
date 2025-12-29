"use client";

import { useTelemetry } from "./TelemetryContext";

export default function TelemetryCard({ label, metricKey, unit }) {
  const metrics = useTelemetry();
  const displayValue = metrics[metricKey];

  return (
    <div className="flex flex-col p-6 bg-muted/20 hover:bg-muted/40 transition-colors">
      <div className="font-sans text-sm text-foreground/40 mb-2 uppercase tracking-wide">{label}</div>
      <div className="font-serif text-3xl text-foreground">
        {displayValue}
        <span className="font-sans text-sm text-foreground/40 ml-1 normal-case">{unit}</span>
      </div>
    </div>
  );
}
