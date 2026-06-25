import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  // Mouse coordinates using MotionValues for bypass-render efficiency (60fps)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for butter-smooth trailing animation
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if mobile or touch device
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 1024px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return () => window.removeEventListener("resize", checkDevice);

    const moveCursor = (e: MouseEvent) => {
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Premium magnetic pull: 35% pull toward center of button, 65% follow mouse
        const pullX = centerX + (e.clientX - centerX) * 0.35;
        const pullY = centerY + (e.clientY - centerY) * 0.35;
        cursorX.set(pullX);
        cursorY.set(pullY);
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("button, a, [role='button'], input, select, textarea, .cursor-pointer");
      if (interactive) {
        setIsHovered(true);
        if (interactive.tagName === "BUTTON" || interactive.closest("button") || interactive.classList.contains("magnetic") || interactive.classList.contains("cursor-pointer")) {
          setMagneticTarget(interactive as HTMLElement);
        }
      } else {
        setIsHovered(false);
        setMagneticTarget(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, magneticTarget]);

  if (isMobile) return null;

  return (
    <>
      {/* 1. External Latte Gold Glow Trailing Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99999,
        }}
        animate={{
          width: isHovered ? (magneticTarget ? "60px" : "44px") : "22px",
          height: isHovered ? (magneticTarget ? "60px" : "44px") : "22px",
          backgroundColor: isHovered ? "rgba(193, 154, 107, 0.12)" : "rgba(193, 154, 107, 0)",
          borderColor: isHovered ? "#C19A6B" : "rgba(193, 154, 107, 0.45)",
          borderWidth: isHovered ? "1.5px" : "1px",
          scale: isClicking ? 0.85 : 1,
          boxShadow: isHovered 
            ? "0 0 16px rgba(193, 154, 107, 0.45)" 
            : "0 0 0px rgba(193, 154, 107, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 26,
          mass: 0.2,
        }}
        className="rounded-full pointer-events-none"
      />

      {/* 2. Inner Coffee-Gold Solid Active Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 999999,
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? "#8B5E3C" : "#6F4E37", // Mocha brown on hover, Coffee brown default
        }}
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 28,
        }}
        className="w-2 h-2 rounded-full pointer-events-none shadow-sm"
      />
    </>
  );
}
