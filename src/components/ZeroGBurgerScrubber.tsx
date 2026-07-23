import React, { useEffect, useRef, useState } from 'react';
import { MotionValue } from 'framer-motion';

interface ZeroGBurgerScrubberProps {
  progress: number | MotionValue<number>; // 0.0 to 1.0
  className?: string;
  rotation?: number | MotionValue<number>; // extra rotation angle in degrees
  scaleMultiplier?: number;
  showParticles?: boolean;
}

const TOTAL_FRAMES = 201;

export const ZeroGBurgerScrubber: React.FC<ZeroGBurgerScrubberProps> = ({
  progress,
  className = '',
  rotation = 0,
  scaleMultiplier = 1,
  showParticles = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rotationRef = useRef(0);
  const rawProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Preload frames
  useEffect(() => {
    let mounted = true;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/images/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      loadedImages[i - 1] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      mounted = false;
    };
  }, []);

  // Sync progress value (handles either number or MotionValue)
  useEffect(() => {
    const updateProgress = (val: number) => {
      rawProgressRef.current = val;
      const clamped = Math.max(0, Math.min(1, val));
      targetFrameRef.current = Math.floor(clamped * (TOTAL_FRAMES - 1));
    };

    if (typeof progress === 'number') {
      updateProgress(progress);
    } else if (progress && typeof progress.on === 'function') {
      updateProgress(progress.get());
      const unsubscribe = progress.on('change', (latest) => {
        updateProgress(latest);
      });
      return () => unsubscribe();
    }
  }, [progress]);

  // Sync rotation value (handles either number or MotionValue)
  useEffect(() => {
    const updateRotation = (val: number) => {
      rotationRef.current = val;
    };

    if (typeof rotation === 'number') {
      updateRotation(rotation);
    } else if (rotation && typeof rotation.on === 'function') {
      updateRotation(rotation.get());
      const unsubscribe = rotation.on('change', (latest) => {
        updateRotation(latest);
      });
      return () => unsubscribe();
    }
  }, [rotation]);

  // Main Canvas Render Loop (smooth lerp interpolation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let alive = true;

    const render = () => {
      if (!alive) return;

      // Smooth lerp frame scrubbing
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.15;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      const img = imagesRef.current[frameIndex];

      // Handle Canvas Sizing with dpr
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width > 0 && height > 0) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        if (img && img.complete && img.naturalWidth > 0) {
          // Draw Burger image centered with aspect ratio contain
          const imgAspect = img.naturalWidth / img.naturalHeight;

          let renderW = width * 0.85 * scaleMultiplier;
          let renderH = renderW / imgAspect;

          if (renderH > height * 0.85 * scaleMultiplier) {
            renderH = height * 0.85 * scaleMultiplier;
            renderW = renderH * imgAspect;
          }

          const centerX = width / 2;
          const centerY = height / 2;

          ctx.translate(centerX, centerY);
          if (rotationRef.current !== 0) {
            ctx.rotate((rotationRef.current * Math.PI) / 180);
          }

          ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      alive = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [scaleMultiplier]);

  // Floating particles canvas effect
  useEffect(() => {
    if (!showParticles) return;
    const pCanvas = particleCanvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');
    if (!pCtx) return;

    let particleFrameId: number;
    let alive = true;

    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.5 + 1,
      speedY: (Math.random() * 0.001 + 0.0005) * -1,
      speedX: (Math.random() - 0.5) * 0.0005,
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? '#FF1A1A' : '#FFB000',
    }));

    const renderParticles = () => {
      if (!alive) return;
      const w = pCanvas.clientWidth;
      const h = pCanvas.clientHeight;
      if (w > 0 && h > 0) {
        pCanvas.width = w;
        pCanvas.height = h;

        pCtx.clearRect(0, 0, w, h);

        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y < 0) p.y = 1;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;

          const px = p.x * w;
          const py = p.y * h;

          pCtx.beginPath();
          pCtx.arc(px, py, p.size, 0, Math.PI * 2);
          pCtx.fillStyle = p.color;
          pCtx.shadowBlur = 10;
          pCtx.shadowColor = p.color;
          pCtx.globalAlpha = p.opacity;
          pCtx.fill();
        });
      }

      particleFrameId = requestAnimationFrame(renderParticles);
    };

    renderParticles();

    return () => {
      alive = false;
      cancelAnimationFrame(particleFrameId);
    };
  }, [showParticles]);

  const currentDisplayFrame = Math.min(
    TOTAL_FRAMES,
    Math.max(1, Math.round(currentFrameRef.current + 1))
  );

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Neon Aura */}
      <div className="absolute inset-0 bg-radial-gradient opacity-80 pointer-events-none" />
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#FF1A1A]/15 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full bg-[#FFB000]/10 blur-2xl pointer-events-none" />

      {/* Particle Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Main Scrubber Canvas with Radial Vignette Mask */}
      <canvas
        ref={canvasRef}
        className="relative z-20 w-full h-full max-w-[650px] max-h-[650px] object-contain mix-blend-screen [mask-image:radial-gradient(circle_at_center,black_65%,transparent_98%)] cursor-grab active:cursor-grabbing"
      />

      {/* Frame Loading HUD Badge */}
      {!isLoaded && (
        <div className="absolute z-30 bottom-16 flex items-center space-x-3 px-5 py-2.5 rounded-full bg-[#0A0000]/95 border border-[#FF1A1A]/60 shadow-[0_0_20px_#FF1A1A] backdrop-blur-md">
          <div className="w-4 h-4 rounded-full border-2 border-t-[#FF1A1A] border-r-[#FFB000] border-b-transparent border-l-transparent animate-spin" />
          <span className="font-mono text-xs text-[#FF1A1A] tracking-widest uppercase animate-pulse">
            CALIBRATING ZERO-G FRAMES ({Math.floor((loadedCount / TOTAL_FRAMES) * 100)}%)
          </span>
        </div>
      )}

      {/* HUD Telemetry Frame Indicator */}
      <div className="absolute bottom-4 left-4 z-30 px-3 py-1.5 rounded bg-black/80 border border-[#FF1A1A]/30 font-mono text-[10px] text-gray-400 space-x-3 pointer-events-none backdrop-blur-sm hidden sm:flex">
        <span>
          FRAME: <span className="text-[#FF1A1A] font-bold">{String(currentDisplayFrame).padStart(3, '0')}</span>/201
        </span>
        <span>
          PROGRESS: <span className="text-[#FFB000] font-bold">{Math.round(rawProgressRef.current * 100)}%</span>
        </span>
        <span>FIELD: ACTIVE</span>
      </div>
    </div>
  );
};

