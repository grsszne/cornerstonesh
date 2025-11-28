"use client";

import { useState, useEffect } from "react";

export default function AsciiArt({ width = 80, height = 24, numCircles = 8 }) {
  const [art, setArt] = useState([]);

  useEffect(() => {
    const chars = "  .  .. .......~~~~==cesrnto*$#%";
    
    // Pre-generate circles with squared radius for faster distance checks
    const circles = [];
    for (let i = 0; i < numCircles; i++) {
      const radius = 5 + Math.random() * 10;
      circles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: radius,
        radiusSquared: radius * radius
      });
    }

    // Pre-calculate edge fade factors
    const edgeFadeX = new Array(width);
    const edgeFadeY = new Array(height);
    
    for (let x = 0; x < width; x++) {
      edgeFadeX[x] = Math.min(x, width - x - 1) / (width / 2);
    }
    for (let y = 0; y < height; y++) {
      edgeFadeY[y] = Math.min(y, height - y - 1) / (height / 2);
    }

    // Generate ASCII art
    const result = [];
    for (let y = 0; y < height; y++) {
      const line = [];
      const edgeY = edgeFadeY[y];
      
      for (let x = 0; x < width; x++) {
        // Find nearest circle using squared distance (avoid sqrt)
        let minDistSquared = Infinity;
        let nearestCircle = circles[0];
        
        for (const circle of circles) {
          const dx = x - circle.x;
          const dy = y - circle.y;
          const distSquared = dx * dx + dy * dy;
          
          if (distSquared < minDistSquared) {
            minDistSquared = distSquared;
            nearestCircle = circle;
          }
        }
        
        // Calculate density (only sqrt when needed)
        const dist = Math.sqrt(minDistSquared);
        const normalizedDist = dist / nearestCircle.radius;
        let density = Math.max(0, 1 - normalizedDist);
        
        // Apply pre-calculated edge fade
        const edgeFade = Math.min(edgeFadeX[x], edgeY);
        const fadeFactor = Math.pow(Math.min(edgeFade * 2, 1), 0.8);
        density *= fadeFactor;
        
        const index = Math.floor(density * chars.length);
        const char = chars[Math.min(index, chars.length - 1)];
        
        // Add orange highlights to denser characters
        const shouldHighlight = index >= 6 && Math.random() > 0.7;
        
        if (shouldHighlight && char !== ' ') {
          line.push(<span key={`${y}-${x}`} className="text-orange-500">{char}</span>);
        } else {
          line.push(char);
        }
      }
      line.push('\n');
      result.push(...line);
    }

    setArt(result);
  }, [width, height, numCircles]);

  return (
    <div className="font-mono text-xs leading-none whitespace-pre overflow-hidden opacity-[15%] dark:opacity-20 select-none pointer-events-none" aria-hidden="true">
      {art}
    </div>
  );
}
