import { useEffect, useRef, useState } from "react";

const GIF_SRC = "/images/logo.gif";

/**
 * Logo that shows a still first frame and plays the GIF on hover — the site's
 * one deliberate "surprise" interaction (see DESIGN.md > Motion). Stays on the
 * still frame when the user prefers reduced motion.
 *
 * The still frame is extracted client-side by painting the first GIF frame to
 * an offscreen canvas. Same-origin asset, so no crossOrigin / tainting concerns.
 */
export default function AnimatedLogo({ className = "" }: { className?: string }) {
  const [isHovering, setIsHovering] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = GIF_SRC;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      try {
        setStaticFrame(canvas.toDataURL());
      } catch (err) {
        // Extraction failed for some reason — fall back to the animated GIF.
        console.warn("Could not extract static logo frame:", err);
      }
    };
  }, []);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const showAnimated = isHovering && !prefersReducedMotion;

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <img
        className={className}
        src={showAnimated ? GIF_SRC : (staticFrame ?? GIF_SRC)}
        alt="NSDEV logo"
        width={80}
        height={80}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
    </>
  );
}
