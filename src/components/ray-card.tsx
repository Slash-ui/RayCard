"use client";

import React, { useRef, useEffect, useState } from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RayCardProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Additional CSS classes to apply to the card wrapper */
  className?: string;
  /** Custom glow color (overrides theme default) */
  glowColor?: string;
  /** Glow intensity/opacity 0-1 (default: 1) */
  glowIntensity?: number;
  /** Size of the light spread in pixels (default: 300) */
  glowSpread?: number;
  /** Override border radius (default: "16px") */
  borderRadius?: string;
  /** Mouse proximity detection distance in pixels (default: 32) */
  proximity?: number;
  /** Disable the lighting effect entirely */
  disabled?: boolean;
  /** Glow mode - controls which parts glow */
  glowMode?: "both" | "card" | "border";
}

export function RayCard({
  children,
  className,
  glowColor = "#FFFFFB",
  glowIntensity = 1,
  glowSpread = 300,
  borderRadius = "16px",
  proximity = 32,
  disabled = false,
  glowMode = "both",
}: RayCardProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const box = boxRef.current;
    if (!box) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isCursorNearBorder =
        e.clientX > rect.left - proximity &&
        e.clientX < rect.right + proximity &&
        e.clientY > rect.top - proximity &&
        e.clientY < rect.bottom + proximity;

      const isCursorInsideBox =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsNear(isCursorNearBorder);
      setIsInside(isCursorInsideBox);

      const isActive = isCursorNearBorder || isCursorInsideBox;

      if (isActive) {
        box.style.setProperty("--mouse-x", `${x}px`);
        box.style.setProperty("--mouse-y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        let dx = x - centerX;
        let dy = y - centerY;

        if (isCursorInsideBox) {
          dx = (x - centerX) / 2;
          dy = (y - centerY) / 2;
        }

        const maxShadowOffset = 20;
        const shadowX = (-dx / centerX) * maxShadowOffset;
        const shadowY = (-dy / centerY) * maxShadowOffset;

        const distFromCenter = Math.sqrt(dx * dx + dy * dy);
        const maxDist =
          Math.sqrt(centerX * centerX + centerY * centerY) + proximity;

        const spread = 1 + (distFromCenter / maxDist) * 15;
        const blur = 10 + (distFromCenter / maxDist) * 30;

        box.style.setProperty("--shadow-x", `${shadowX}px`);
        box.style.setProperty("--shadow-y", `${shadowY}px`);
        box.style.setProperty("--shadow-blur", `${blur}px`);
        box.style.setProperty("--shadow-spread", `${spread}px`);
        box.style.setProperty("--shadow-opacity", `0.2`);
      } else {
        box.style.setProperty("--shadow-opacity", "0");
      }
    };

    const handleMouseLeave = () => {
      setIsNear(false);
      setIsInside(false);
      if (boxRef.current) {
        boxRef.current.style.setProperty("--shadow-opacity", "0");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    box.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (box) {
        box.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [disabled, proximity]);

  const effectiveIntensity = disabled
    ? 0
    : isNear || isInside
      ? glowIntensity
      : 0;

  return (
    <div
      ref={boxRef}
      className={cn("ray-card", className)}
      style={
        {
          "--light-opacity": effectiveIntensity,
          "--glow-color": glowColor,
          "--border-radius": borderRadius,
          position: "relative",
          padding: "24px",
          backdropFilter: "blur(10px)",
          borderRadius,
          // No overflow hidden here because it might clip shadows if we adjusted them,
          // but currently shadow is simulated via CSS variables on the element itself.
          // Actually, we do need overflow hidden or borderRadius on inner elements to match.
          // The original code had overflow: hidden. I'll keep it to clip the internal glow.
          overflow: "hidden",
          boxShadow: disabled
            ? "none"
            : "var(--shadow-x, 0px) var(--shadow-y, 0px) var(--shadow-blur, 20px) var(--shadow-spread, 0px) rgba(0, 0, 0, var(--shadow-opacity, 0))",
          transition: "box-shadow 0.3s ease-out, opacity 0.3s ease-out",
        } as React.CSSProperties
      }
    >
      {/* Main content glow */}
      {(glowMode === "both" || glowMode === "card") && (
        <div
          className="ray-card-glow"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(${glowSpread}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
            opacity: effectiveIntensity,
            transition: "opacity 0.3s ease-out",
          }}
        />
      )}

      {/* Border glow */}
      {(glowMode === "both" || glowMode === "border") && (
        <div
          className="ray-card-border-glow"
          style={
            {
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              padding: "1px",
              background: `radial-gradient(${glowSpread}px circle at var(--mouse-x) var(--mouse-y), ${glowColor}, transparent 100%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              pointerEvents: "none",
              opacity: effectiveIntensity,
              transition: "opacity 0.3s ease-out",
            } as React.CSSProperties
          }
        />
      )}

      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}

export default RayCard;
