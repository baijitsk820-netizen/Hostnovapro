import React from "react";

interface HostNovaLogoProps {
  size?: number;
  variant?: "icon-only" | "with-text" | "favicon" | "full";
  isDark?: boolean;
  glow?: boolean;
  animateHover?: boolean;
  shimmer?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function HostNovaLogo({
  size = 40,
  variant = "with-text",
  isDark = true,
  glow = true,
  animateHover = true,
  shimmer = true,
  className = "",
  onClick,
}: HostNovaLogoProps) {
  // Define width/height based on size
  const logoWidth = size;
  const logoHeight = size;

  // Render the core 3D H SVG
  const renderSVG = () => (
    <svg
      width={logoWidth}
      height={logoHeight}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`relative select-none ${glow ? "logo-glow-pulse" : ""} ${
        animateHover ? "hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer" : ""
      }`}
      style={{
        filter: glow
          ? "drop-shadow(0 4px 12px rgba(111, 78, 55, 0.15)) drop-shadow(0 2px 4px rgba(193, 154, 107, 0.1))"
          : "none",
      }}
    >
      <defs>
        {/* Coffee Brown (#6F4E37) Receding Gradient */}
        <linearGradient id="coffeeDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4E3422" />
          <stop offset="100%" stopColor="#6F4E37" />
        </linearGradient>

        {/* Mocha (#8B5E3C) Front-Bevel Gradient */}
        <linearGradient id="coffeeMochaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6F4E37" />
          <stop offset="100%" stopColor="#8B5E3C" />
        </linearGradient>

        {/* Premium Latte Gold (#C19A6B) Shimmer Gradient */}
        <linearGradient id="goldShimmerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5E3C" />
          <stop offset="30%" stopColor="#C19A6B" />
          <stop offset="50%" stopColor="#FFF5EB" />
          <stop offset="70%" stopColor="#C19A6B" />
          <stop offset="100%" stopColor="#8B5E3C" />
          {shimmer && (
            <>
              <animate
                attributeName="x1"
                from="-150%"
                to="150%"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                from="-50%"
                to="250%"
                dur="4s"
                repeatCount="indefinite"
              />
            </>
          )}
        </linearGradient>

        {/* Highlight Accent Gradient */}
        <linearGradient id="goldAccentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C19A6B" />
          <stop offset="50%" stopColor="#E6C29E" />
          <stop offset="100%" stopColor="#FFF5EB" />
        </linearGradient>

        {/* 3D Soft Shadow Filter for layered depth */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="-1" dy="2" stdDeviation="1.5" floodColor="#2A1E17" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* --- LEFT PILLAR --- */}
      {/* Left Shaded Receded Facet */}
      <path
        d="M 22 24 L 34 14 L 34 86 L 22 76 Z"
        fill="url(#coffeeDarkGrad)"
      />
      {/* Front Light/Gold Highlight Facet */}
      <path
        d="M 34 14 L 46 24 L 46 76 L 34 86 Z"
        fill="url(#goldShimmerGrad)"
        filter="url(#softShadow)"
      />

      {/* --- CENTRAL CROSSBAR --- */}
      {/* Top light cap of crossbar */}
      <path
        d="M 46 42 L 58 42 L 58 46 L 46 46 Z"
        fill="url(#goldAccentGrad)"
      />
      {/* Front Face of crossbar (Slightly recessed and shadowed) */}
      <path
        d="M 46 46 L 58 46 L 58 56 L 46 56 Z"
        fill="url(#coffeeMochaGrad)"
        filter="url(#softShadow)"
      />

      {/* --- RIGHT PILLAR --- */}
      {/* Left Shaded Facet */}
      <path
        d="M 58 24 L 70 14 L 70 86 L 58 76 Z"
        fill="url(#coffeeDarkGrad)"
      />
      {/* Front Light/Gold Highlight Facet */}
      <path
        d="M 70 14 L 82 24 L 82 76 L 70 86 Z"
        fill="url(#goldShimmerGrad)"
        filter="url(#softShadow)"
      />

      {/* Premium Luxury Bevel Accent Overlays */}
      {/* Elegant geometric line work highlights */}
      <line x1="34" y1="14" x2="34" y2="86" stroke="#FFF5EB" strokeWidth="0.75" strokeOpacity="0.4" />
      <line x1="70" y1="14" x2="70" y2="86" stroke="#FFF5EB" strokeWidth="0.75" strokeOpacity="0.4" />
    </svg>
  );

  // If favicon or pure icon, return just the SVG
  if (variant === "icon-only" || variant === "favicon") {
    return (
      <div
        className={`inline-flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        {renderSVG()}
      </div>
    );
  }

  // Full variants with elegant modern typography
  return (
    <div
      className={`inline-flex items-center space-x-2.5 cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        {renderSVG()}
        {/* Soft background glass blur backing for luxury feel */}
        <div className="absolute -inset-1 rounded-2xl bg-coffee-gold/5 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col">
        <span className="font-display font-bold text-lg leading-none tracking-tight text-coffee-text dark:text-coffee-bg group-hover:text-coffee-gold transition-colors duration-300">
          HostNova<span className="text-coffee-gold font-extrabold text-[1.15em] ml-[0.5px]">Pro</span>
        </span>
        <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-coffee-primary dark:text-coffee-gold/80 -mt-0.5 opacity-90">
          ✦ 3D WEB ARCHITECTS ✦
        </span>
      </div>
    </div>
  );
}
