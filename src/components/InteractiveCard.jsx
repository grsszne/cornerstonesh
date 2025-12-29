"use client";

import { useState } from "react";

export default function InteractiveCard({ children, className = "" }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative border border-transparent hover:border-accent transition-colors duration-200 ${className}`}
    >
      {/* Optional: Add technical corners or indicators on hover */}
      {isHovering && (
           <>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"></div>
           </>
      )}
      {children}
    </div>
  );
}
