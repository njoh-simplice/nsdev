import { useRef, useState, useEffect } from "react";

export default function App() {
  const buttonClick = () => {
    window.alert("Good dog!");
  };

  const gifSrc = "images/favicon.gif";

  const [isHovering, setIsHovering] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // remove this if the gif is same-origin and it causes issues
    img.src = gifSrc;
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
        // canvas got "tainted" due to CORS — fall back to just showing the gif
        console.warn("Could not extract static frame (CORS):", err);
      }
    };
  }, [gifSrc]);

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-y-5">
      <div className="font-bold text-2xl">Hello world</div>

      <canvas ref={canvasRef} className="hidden" />
      <a href="google.com">
        <img
          className="rounded-full w-18 cursor-pointer"
          src={isHovering ? gifSrc : staticFrame || gifSrc}
          alt="favicon"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </a>

      <button
        className="cursor-pointer font-medium text-white bg-gray-950 px-8 py-3 rounded-md hover:opacity-90"
        onClick={buttonClick}
      >
        Click Me!
      </button>
    </div>
  );
}
