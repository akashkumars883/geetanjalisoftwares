"use client";

import { useEffect, useRef, useState } from "react";

let globalMouse = { x: -100, y: -100 };
let hasInitialized = false;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(hasInitialized);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onMouseMove = (e) => {
      globalMouse.x = e.clientX;
      globalMouse.y = e.clientY;

      if (!hasInitialized) {
        hasInitialized = true;
        setIsVisible(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) {
        setIsHovered(false);
        return;
      }

      const isInteractive = Boolean(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden hidden md:block">
      {/* Custom black dot cursor for background; fades out on links so normal browser cursor shows */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-3.5 h-3.5 -mt-1.75 -ml-1.75 rounded-md bg-black border border-white/80 shadow-md pointer-events-none transition-opacity duration-150 ease-out ${
          isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          transform: `translate3d(${globalMouse.x}px, ${globalMouse.y}px, 0)`,
        }}
      />
    </div>
  );
}
