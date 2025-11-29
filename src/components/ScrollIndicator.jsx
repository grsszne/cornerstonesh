"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide indicator after scrolling 100px
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 my-16 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40 transition-opacity duration-500">
      <svg className="w-6 h-6 text-black dark:text-white" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
}
