"use client";

import { useEffect, useRef, useCallback } from "react";

export default function SlopeField({ className = "", interactive = true, spacing = 40, lineLength = 18, speed = 1 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const gridStateRef = useRef(null); // Persistent per-point state for trailing

  const getSlope = useCallback((x, y, w, h, t) => {
    const nx = (x / w) * 2 - 1;
    const ny = (y / h) * 2 - 1;

    const s1x = Math.cos(t * 0.3) * 0.4;
    const s1y = Math.sin(t * 0.2) * 0.3;
    const s2x = Math.cos(t * 0.2 + 2) * 0.5;
    const s2y = Math.sin(t * 0.25 + 1) * 0.4;

    const dx1 = nx - s1x;
    const dy1 = ny - s1y;
    const dx2 = nx - s2x;
    const dy2 = ny - s2y;

    let vx = -dy1 / (Math.sqrt(dx1 * dx1 + dy1 * dy1) + 0.3)
           + -dy2 / (Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.4);
    let vy = dx1 / (Math.sqrt(dx1 * dx1 + dy1 * dy1) + 0.3)
           + dx2 / (Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.4);

    vx += Math.sin(ny * 3 + t * 0.5) * 0.2;
    vy += Math.cos(nx * 2.5 + t * 0.4) * 0.15;

    return Math.atan2(vy, vx);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height, dpr;
    let cols = 0, rows = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Rebuild grid state on resize
      cols = Math.ceil(width / spacing);
      rows = Math.ceil(height / spacing);
      const total = cols * rows;
      // Store: angleOffset, posOffsetX, posOffsetY, glowAlpha per point
      gridStateRef.current = new Float32Array(total * 4);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      if (!width || !height || !gridStateRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.008 * speed;
      const t = timeRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const gap = spacing;
      const halfLen = lineLength / 2;
      const state = gridStateRef.current;

      let idx = 0;
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const gx = gap / 2 + col * gap;
          const gy = gap / 2 + row * gap;
          if (gx > width || gy > height) { idx++; continue; }

          const si = idx * 4; // state index
          const angle = getSlope(gx, gy, width, height, t);

          // Center emphasis — points near center are more active
          const centerDx = (gx - width * 0.5) / (width * 0.5);
          const centerDy = (gy - height * 0.5) / (height * 0.5);
          const centerDist = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
          const centerBoost = 1 + Math.max(0, 1.2 - centerDist) * 0.8;

          // Ripple wave 1 — expanding rings from drifting origin
          const wave1x = width * (0.35 + Math.sin(t * 0.12) * 0.2);
          const wave1y = height * (0.45 + Math.cos(t * 0.09) * 0.2);
          const dist1 = Math.sqrt((gx - wave1x) ** 2 + (gy - wave1y) ** 2);
          const ripple1 = Math.sin(dist1 * 0.03 - t * 1.2) * Math.max(0, 1 - dist1 / (width * 0.9));

          // Ripple wave 2 — second source, different frequency
          const wave2x = width * (0.65 + Math.cos(t * 0.08) * 0.2);
          const wave2y = height * (0.55 + Math.sin(t * 0.14) * 0.2);
          const dist2 = Math.sqrt((gx - wave2x) ** 2 + (gy - wave2y) ** 2);
          const ripple2 = Math.sin(dist2 * 0.025 - t * 0.9) * Math.max(0, 1 - dist2 / (width * 0.9));

          // Gravity well — lines pulled inward toward a wandering attractor
          const wellX = width * (0.5 + Math.sin(t * 0.06) * 0.3);
          const wellY = height * (0.5 + Math.cos(t * 0.08) * 0.25);
          const wellDx = wellX - gx;
          const wellDy = wellY - gy;
          const wellDist = Math.sqrt(wellDx * wellDx + wellDy * wellDy) + 1;
          const wellStrength = Math.min(1, 15000 / (wellDist * wellDist)) * gap * 0.4;
          const wellOffX = (wellDx / wellDist) * wellStrength;
          const wellOffY = (wellDy / wellDist) * wellStrength;

          // Slow traveling waves in two directions
          const travelWave1 = Math.sin(gx * 0.01 + gy * 0.006 - t * 0.5) * 0.8;
          const travelWave2 = Math.sin(-gx * 0.007 + gy * 0.012 - t * 0.35) * 0.5;

          // Per-point circular orbit
          const orbitPhase = gx * 0.004 + gy * 0.006 + t * 0.3;
          const orbitR = gap * 0.18 * centerBoost;

          // Combine all positional displacement
          const rippleDisp = (ripple1 + ripple2) * gap * 0.4 * centerBoost;
          const travelDisp = (travelWave1 + travelWave2) * gap * 0.15;
          const cx = gx
            + Math.cos(angle) * (rippleDisp + travelDisp)
            + Math.cos(orbitPhase) * orbitR
            + wellOffX;
          const cy = gy
            + Math.sin(angle) * (rippleDisp + travelDisp)
            + Math.sin(orbitPhase) * orbitR
            + wellOffY;

          let drawAngle = getSlope(cx, cy, width, height, t);

          // Compute TARGET mouse influence (what we want to reach)
          let targetAngleOffset = 0;
          let targetPosX = 0;
          let targetPosY = 0;
          let targetGlow = 0;

          if (interactive && mouse.x > -500) {
            const mdx = cx - mouse.x;
            const mdy = cy - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy) + 1;

            // Inverse-square falloff
            const influence = Math.min(1, 8000 / (mDist * mDist));

            // Target rotation offset
            const mouseAngle = Math.atan2(mdy, mdx);
            let diff = mouseAngle - drawAngle;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            targetAngleOffset = diff * influence * 0.5;

            // Target position push
            targetPosX = (mdx / mDist) * influence * 8;
            targetPosY = (mdy / mDist) * influence * 8;

            // Target glow
            targetGlow = Math.min(0.4, 5000 / (mDist * mDist));
          }

          // Lerp stored state toward target — slow easing creates trail
          const lerpRate = 0.03; // Very slow — creates visible lag/trail
          state[si]     += (targetAngleOffset - state[si]) * lerpRate;
          state[si + 1] += (targetPosX - state[si + 1]) * lerpRate;
          state[si + 2] += (targetPosY - state[si + 2]) * lerpRate;
          state[si + 3] += (targetGlow - state[si + 3]) * 0.04;

          // Apply lagged influence
          drawAngle += state[si];
          const finalX = cx + state[si + 1];
          const finalY = cy + state[si + 2];

          // Length pulse — responds to ripples and center proximity
          const lengthPulse = 1
            + (ripple1 * 0.12 + ripple2 * 0.1) * centerBoost
            + Math.sin(gx * 0.02 + gy * 0.015 + t * 1.5) * 0.08;
          const currentHalfLen = halfLen * Math.max(0.6, lengthPulse);

          // Endpoints
          const cosA = Math.cos(drawAngle);
          const sinA = Math.sin(drawAngle);
          const x1 = finalX - cosA * currentHalfLen;
          const y1 = finalY - sinA * currentHalfLen;
          const x2 = finalX + cosA * currentHalfLen;
          const y2 = finalY + sinA * currentHalfLen;

          // Edge fade
          const edgeFadeX = Math.min(gx, width - gx) / (gap * 2.5);
          const edgeFadeY = Math.min(gy, height - gy) / (gap * 2.5);
          const edgeFade = Math.min(1, edgeFadeX, edgeFadeY);

          // Opacity — center emphasis + ripple brightness
          const centerAlpha = 1 + Math.max(0, 0.8 - centerDist) * 0.6;
          const rippleBright = (ripple1 * 0.5 + ripple2 * 0.4 + 0.5) * 0.3;
          const wellGlow = Math.min(0.15, 3000 / (wellDist * wellDist));
          let alpha = (0.18 + rippleBright + wellGlow) * edgeFade * centerAlpha + state[si + 3];

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(245, 245, 247, ${Math.min(alpha, 0.65)})`;
          ctx.lineWidth = 1.2;
          ctx.lineCap = "round";
          ctx.stroke();

          idx++;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [interactive, spacing, lineLength, speed, getSlope]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: "transparent" }}
    />
  );
}
