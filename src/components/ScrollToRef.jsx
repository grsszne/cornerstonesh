"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToRef() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      setTimeout(() => {
        const element = document.getElementById(ref);
        if (element) {
          const navHeight = 56;
          const elementTop = element.offsetTop;
          const offsetPosition = elementTop - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, [ref]);

  return null;
}
