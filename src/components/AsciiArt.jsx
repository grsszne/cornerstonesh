"use client";
import { useState, useEffect, useMemo } from "react";

export default function AsciiArt({ width = 80, height = 24, numCircles = 8 }) {
  const [art, setArt] = useState("");
  
  const chars = useMemo(() => "  .  .. .......~~~~==cornerstone*$#%", []);
  
  useEffect(() => {
    const delay = Math.random() * 40;
    
    const timeoutId = setTimeout(() => {
      // Pre-generate circles
      const circles = Array.from({ length: numCircles }, () => {
        const radius = 5 + Math.random() * 10;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          radiusSquared: radius * radius
        };
      });
      
      // Pre-calculate edge fade factors
      const edgeFadeX = Array.from({ length: width }, (_, x) => 
        Math.min(x, width - x - 1) / (width / 2)
      );
      const edgeFadeY = Array.from({ length: height }, (_, y) => 
        Math.min(y, height - y - 1) / (height / 2)
      );
      
      // Generate as HTML string with spans for highlights
      let result = "";
      
      for (let y = 0; y < height; y++) {
        const edgeY = edgeFadeY[y];
        
        for (let x = 0; x < width; x++) {
          // Find nearest circle
          let minDistSquared = Infinity;
          let nearestRadius = circles[0].radius;
          
          for (const circle of circles) {
            const dx = x - circle.x;
            const dy = y - circle.y;
            const distSquared = dx * dx + dy * dy;
            
            if (distSquared < minDistSquared) {
              minDistSquared = distSquared;
              nearestRadius = circle.radius;
            }
          }
          
          // Calculate density
          const dist = Math.sqrt(Math.sqrt(minDistSquared)) * 2;
          const normalizedDist = dist / nearestRadius;
          let density = Math.max(0, 1 - normalizedDist);
          
          // Apply edge fade
          const edgeFade = Math.min(edgeFadeX[x], edgeY);
          const fadeFactor = Math.pow(Math.min(edgeFade * 4, 1), 0.2);
          density *= fadeFactor;
          
          const index = Math.floor(density * chars.length);
          const char = chars[Math.min(index, chars.length - 1)];
          
          // Add orange highlights to denser characters
          const shouldHighlight = index >= 6 && Math.random() > 0.7;
          
          if (shouldHighlight && char !== ' ') {
            result += `<span class="text-orange-500">${char}</span>`;
          } else {
            result += char;
          }
        }
        result += '\n';
      }
      
      setArt(result);
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [width, height, numCircles, chars]);
  
  return (
    <div 
      className="font-mono text-xs leading-none whitespace-pre overflow-hidden opacity-[15%] dark:opacity-20 select-none pointer-events-none" 
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: art }}
    />
  );
}