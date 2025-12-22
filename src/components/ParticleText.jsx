"use client";

import { useEffect, useRef } from "react";

export default function ParticleText({ text, className = "" }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        const particleDensity = 5;
        const particleSize = 1.5;
        const color = "rgb(249, 115, 22)"; // Orange-500
        const floatSpeed = 0.5;
        const interactRadius = 80;
        const interactForce = 0.5;
        const springForce = 0.08; // Increased for snappier morph
        const friction = 0.85;

        const updateTargets = () => {
            const width = canvas.width;
            const height = canvas.height;
            if (width === 0 || height === 0) return;

            // Create offscreen canvas for text analysis
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext("2d");

            // Draw text
            tempCtx.fillStyle = "white";
            // Dynamic font size: scale down if text is long
            // Base size is 30% of width, but cap max at 200px.
            // For long text like "NOT FOUND" (9 chars), we need to shrink.
            // approx char width is 0.6 * fontSize. Total width = charCount * 0.6 * fontSize.
            // We want Total Width < Width * 0.9 (margin).
            // fontSize < (Width * 0.9) / (charCount * 0.6)
            const charCount = text.length;
            const maxFontSizeByWidth = (width * 0.9) / (Math.max(charCount, 1) * 0.55);
            const fontSize = Math.min(width * 0.35, 200, maxFontSizeByWidth);

            tempCtx.font = `500 ${fontSize}px "Overused Grotesk", sans-serif`;
            tempCtx.textAlign = "center";
            tempCtx.textBaseline = "middle";
            tempCtx.fillText(text, width / 2, height / 2);

            const imageData = tempCtx.getImageData(0, 0, width, height);
            const data = imageData.data;

            const newTargets = [];
            for (let y = 0; y < height; y += particleDensity) {
                for (let x = 0; x < width; x += particleDensity) {
                    const index = (y * width + x) * 4;
                    if (data[index + 3] > 128) {
                        if (Math.random() > 0.3) {
                            newTargets.push({ x, y });
                        }
                    }
                }
            }

            // Reconcile particles with new targets
            const particles = particlesRef.current;

            // 1. Assign new targets to existing particles
            // 2. Spawn new particles if we need more
            // 3. 'Kill' extra particles (release them or hide them)

            // Strategy: Shuffle newTargets to minimize visual bias? No, linear is fine for morph.
            // Actually simple index matching works surprisingly well for text morphs.

            const numParticles = particles.length;
            const numTargets = newTargets.length;

            // Update existing particles
            for (let i = 0; i < Math.min(numParticles, numTargets); i++) {
                particles[i].originX = newTargets[i].x;
                particles[i].originY = newTargets[i].y;
                particles[i].active = true;
            }

            // Add new particles if needed
            if (numTargets > numParticles) {
                for (let i = numParticles; i < numTargets; i++) {
                    particles.push({
                        x: Math.random() * width,
                        y: Math.random() * height,
                        originX: newTargets[i].x,
                        originY: newTargets[i].y,
                        vx: 0,
                        vy: 0,
                        size: Math.random() * particleSize + 0.5,
                        active: true
                    });
                }
            }

            // Deactivate extra particles (let them float away or disappear)
            if (numParticles > numTargets) {
                for (let i = numTargets; i < numParticles; i++) {
                    particles[i].active = false;
                    // Set origin to random offscreen or center to implode? 
                    // Let's set origin to current position so they stop moving (or drift)
                    particles[i].originX = particles[i].x;
                    particles[i].originY = particles[i].y;
                }
            }

            particlesRef.current = particles;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            ctx.fillStyle = color;

            particlesRef.current.forEach((p, i) => {
                // Optimization: Remove inactive particles that are settled? 
                // For now, just render active ones, or handle fade out.
                if (!p.active) {
                    // Optional: Fade out logic could go here. 
                    // For now, just don't render them, or render them fading.
                    // Let's clean up array lazily? No, standard reuse is better for performance than splice.
                    // We'll just skip physics and rendering for inactive ones to simulate "gone".
                    return;
                }

                // Physics
                const dx = p.originX - p.x;
                const dy = p.originY - p.y;
                const distanceSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distanceSq);

                // Spring to target
                const force = dist * springForce;
                const angle = Math.atan2(dy, dx);
                let moveX = Math.cos(angle) * force;
                let moveY = Math.sin(angle) * force;

                // Interactive Repel
                const mouse = mouseRef.current;
                const dxMouse = mouse.x - p.x;
                const dyMouse = mouse.y - p.y;
                const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

                if (distMouseSq < interactRadius * interactRadius) {
                    const distMouse = Math.sqrt(distMouseSq);
                    const repelForce = (interactRadius - distMouse) / interactRadius * interactForce;
                    const repelAngle = Math.atan2(dyMouse, dxMouse);
                    moveX -= Math.cos(repelAngle) * repelForce * 50;
                    moveY -= Math.sin(repelAngle) * repelForce * 50;
                }

                // Noise
                moveX += (Math.random() - 0.5) * floatSpeed;
                moveY += (Math.random() - 0.5) * floatSpeed;

                p.vx = (p.vx + moveX) * friction;
                p.vy = (p.vy + moveY) * friction;

                p.x += p.vx;
                p.y += p.vy;

                // Render
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            updateTargets();
        };

        // Initialize
        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        handleResize(); // Sets size and initial targets
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []); // Run once to setup loop

    // React to text changes by updating targets without tearing down loop
    useEffect(() => {
        // We need to trigger updateTargets inside the main effect scope?
        // Or we can just run the logic here because particlesRef is shared.
        // But we need the CANVAS context for text measurement.
        // Let's refactor: Put updateTargets logic in a ref or use the fact that the main effect depends on nothing.
        // Actually, if we add `text` to dependency of main effect, it restarts everything (bad).
        // Solution: Use a `useEffect` that listens to `text` and invokes the update logic. 
        // But we need access to `canvas` and `ctx`.
        // The simplest way: The ResizeObserver/Event handles size. 
        // We can just call the logic. I'll duplicate the logic or (better) move it to a function referenced by a `useRef`?
        // Or just signal a "needsUpdate" flag? 
        // Simplest: Just use one useEffect with `text` dependency but DON'T reset `particlesRef`.
        // But `animate` uses `requestAnimationFrame`. If code re-runs, we get new animate loop.
        // We must clean up old loop.
        // Is tearing down the loop Visible? 1 frame gap? Probably noticeable flicker.
        // Better to keep loop running.

        // Hack: trigger a custom event or just have the main loop poll `textRef`? No.
        // Let's go with the "Restart Effect" approach but KEEP particlesRef.
        // If we keep particlesRef, the new effect instance picks up the old particles.
        // The only glitch is we might have double-RAF for a split second or a dropped frame.
        // Actually, React cleanup runs BEFORE new effect. So cancelAnimationFrame happens, then new start.
        // If the gap is small (<16ms), it's smooth.
    }, [text]);

    // Actually, I'll merge the logic. 
    // Rerunning the effect is fine IF we persist particlesRef. 
    // The only expensive part is `init` logic.
    // `updateTargets` IS the expensive init logic.

    return (
        <CanvasController text={text} className={className} />
    );
}

// Inner component to handle logic cleanly? No, keep it simple.
function CanvasController({ text, className }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // ... config ...
        const particleDensity = 4; // Higher density = more dots
        const particleSize = 1.5;
        const color = "rgb(249, 115, 22)";
        const floatSpeed = 0.5;
        const interactRadius = 80;
        const interactForce = 0.5;
        const ease = 0.1;

        const updateTargets = () => {
            const width = canvas.width;
            const height = canvas.height;
            if (width === 0) return;

            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = width;
            tempCanvas.height = height;
            const tempCtx = tempCanvas.getContext("2d");

            tempCtx.fillStyle = "white";
            const charCount = text.length;
            // Improved font scaling
            const maxFontSizeByWidth = (width * 0.9) / (Math.max(charCount, 1) * 0.6); // 0.6 aspect ratio approx
            const fontSize = Math.min(width * 0.35, 250, maxFontSizeByWidth);

            tempCtx.font = `500 ${fontSize}px "Overused Grotesk", sans-serif`;
            tempCtx.textAlign = "center";
            tempCtx.textBaseline = "middle";
            tempCtx.fillText(text, width / 2, height / 2);

            const imageData = tempCtx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const newTargets = [];

            for (let y = 0; y < height; y += particleDensity) {
                for (let x = 0; x < width; x += particleDensity) {
                    const index = (y * width + x) * 4;
                    if (data[index + 3] > 128) {
                        if (Math.random() > 0.3) newTargets.push({ x, y });
                    }
                }
            }

            const particles = particlesRef.current;
            const numParticles = particles.length;
            const numTargets = newTargets.length;

            // Update existing
            for (let i = 0; i < Math.min(numParticles, numTargets); i++) {
                particles[i].originX = newTargets[i].x;
                particles[i].originY = newTargets[i].y;
                particles[i].active = true;
            }

            // Add new
            for (let i = numParticles; i < numTargets; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    originX: newTargets[i].x,
                    originY: newTargets[i].y,
                    size: Math.random() * particleSize + 0.5,
                    active: true
                });
            }

            // Deactivate excess
            for (let i = numTargets; i < numParticles; i++) {
                particles[i].active = false;
            }

            particlesRef.current = particles;
        };

        let time = 0;
        const animate = () => {
            time += 0.05;
            // Trail effect: instead of clearing, fade out existing pixels
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Adjust alpha for trail length
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';

            ctx.fillStyle = color;

            particlesRef.current.forEach(p => {
                if (!p.active) return;

                let targetX = p.originX;
                let targetY = p.originY;

                const mouse = mouseRef.current;
                const dxMouse = mouse.x - p.x;
                const dyMouse = mouse.y - p.y;
                const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

                if (distMouseSq < interactRadius * interactRadius) {
                    const distMouse = Math.sqrt(distMouseSq);
                    const repelFactor = (interactRadius - distMouse) / interactRadius;
                    const angle = Math.atan2(dyMouse, dxMouse);

                    // Push the target away based on mouse position
                    targetX -= Math.cos(angle) * repelFactor * 100 * interactForce;
                    targetY -= Math.sin(angle) * repelFactor * 100 * interactForce;
                }

                // Linear Interpolation (Ease) for smooth non-bouncy movement
                p.x += (targetX - p.x) * ease;
                p.y += (targetY - p.y) * ease;

                // Subtle jitter (noise)
                p.x += (Math.random() - 0.5) * 0.2;
                p.y += (Math.random() - 0.5) * 0.2;

                // Flickering intensity
                ctx.globalAlpha = Math.random() * 0.5 + 0.5;

                // Fluctuating radius
                const fluctuation = Math.sin(time + p.x * 0.02 + p.y * 0.02) * 0.5;
                const currentSize = Math.max(0.1, p.size + fluctuation);

                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            animationRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            updateTargets();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);

        handleResize(); // Initial
        animate(); // Start loop

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [text]); // Re-run setup when text changes to recalculate targets

    return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />;
}
