import { useEffect, useRef } from "react";

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let globleRadius = Math.min(width, height) / 2 - 20;

        const dots: { x: number; y: number; z: number; lat: number; long: number }[] = [];
        const DOT_COUNT = 400;

        // Initialize dots on a sphere
        for (let i = 0; i < DOT_COUNT; i++) {
            // Fibonacci sphere algorithm for even distribution
            const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
            const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

            const x = globleRadius * Math.cos(theta) * Math.sin(phi);
            const y = globleRadius * Math.sin(theta) * Math.sin(phi);
            const z = globleRadius * Math.cos(phi);

            dots.push({ x, y, z, lat: phi, long: theta });
        }

        let rotation = 0;
        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";

            // Center of canvas
            const cx = width / 2;
            const cy = height / 2;

            dots.forEach((dot) => {
                // Rotate around Y axis
                const rotatedX = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
                const rotatedZ = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);

                // Project 3D to 2D
                // Simple distinct scale with perspective
                const scale = (globleRadius + rotatedZ) / (globleRadius * 2);
                // We only draw if it's on the front side (z > -radius/2 approx, or verify visibility)
                // Actually simpler: visual size based on Z depth

                const size = Math.max(0.5, 2 * scale);
                const alpha = Math.max(0.1, scale);

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.arc(cx + rotatedX, cy + dot.y, size, 0, Math.PI * 2);
                ctx.fill();

                // Highlight Pakistan (approximate) - this is tricky with random/fibonacci dots.
                // Instead, let's just make a "highlight" dot that rotates with them?
                // Or simply draw a glowing red dot that represents the "Server/Location" 
                // For a static 3D look of a globe, we can iterate rotation.
            });

            // Let's add a "Satellite" / "Location" marker that orbits or stays fixed relative to globe
            // For "Built in Lahore", we want a fixed point on the globe.
            // Lahore approx: 31.5N, 74.3E. 
            // Convert Lat/Lon to XYZ on our sphere radius.
            // Lat: 31.5 deg = 0.55 rad. Lon: 74.3 deg = 1.3 rad.
            // Standard spherical conversion: 
            // x = r * cos(lat) * cos(lon)
            // y = r * sin(lat)
            // z = r * cos(lat) * sin(lon)
            // Note: canvas Y is down, so we might flip Y.

            const latRad = (31.5 * Math.PI) / 180;
            const lonRad = (74.3 * Math.PI) / 180 - rotation; // Counter-rotate to stay fixed on globe surface? No, lon is fixed on earth, earth rotates.

            // Actually, let's just make the globe rotate, and the point rotate with it.
            // Adjust longitude by rotation.
            const currentLon = (74.3 * Math.PI) / 180 + rotation;

            // Coordinate system adjustment for visual pleasure
            // y is up/down (latitude), x/z are plane (longitude)
            // phi (lat) from -PI/2 to PI/2. theta (lon) 0 to 2PI.

            const r = globleRadius;
            // y = -r * sin(lat) (negative because canvas y is down)
            const ly = -r * Math.sin(latRad);
            const lx = r * Math.cos(latRad) * Math.sin(currentLon);
            const lz = r * Math.cos(latRad) * Math.cos(currentLon);

            // Draw Lahore marker if visible (z > 0 ish)
            if (lz > 0) {
                const lScale = (globleRadius + lz) / (globleRadius * 2);
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
                ctx.shadowColor = "red";
                ctx.shadowBlur = 10;
                ctx.arc(cx + lx, cy + ly, 4 * lScale, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Ring
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, 0, 0, 0.4)";
                ctx.lineWidth = 1;
                ctx.arc(cx + lx, cy + ly, 8 * lScale, 0, Math.PI * 2);
                ctx.stroke();
            }

            rotation += 0.005;
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            globleRadius = Math.min(width, height) / 2 - 20;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
