"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  isValidCssColor,
  isValidBorderRadius,
  clampNumber,
  VALIDATION_DEFAULTS,
  VALIDATION_RANGES,
} from "../utils/validation";

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
  // Sanitize and validate props to prevent CSS injection
  const safeGlowColor = isValidCssColor(glowColor) ? glowColor : VALIDATION_DEFAULTS.glowColor;
  const safeGlowIntensity = clampNumber(
    glowIntensity,
    VALIDATION_RANGES.glowIntensity.min,
    VALIDATION_RANGES.glowIntensity.max,
    VALIDATION_DEFAULTS.glowIntensity
  );
  const safeGlowSpread = clampNumber(
    glowSpread,
    VALIDATION_RANGES.glowSpread.min,
    VALIDATION_RANGES.glowSpread.max,
    VALIDATION_DEFAULTS.glowSpread
  );
  const safeBorderRadius = isValidBorderRadius(borderRadius) ? borderRadius : VALIDATION_DEFAULTS.borderRadius;
  const safeProximity = clampNumber(
    proximity,
    VALIDATION_RANGES.proximity.min,
    VALIDATION_RANGES.proximity.max,
    VALIDATION_DEFAULTS.proximity
  );

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
        e.clientX > rect.left - safeProximity &&
        e.clientX < rect.right + safeProximity &&
        e.clientY > rect.top - safeProximity &&
        e.clientY < rect.bottom + safeProximity;

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
          Math.sqrt(centerX * centerX + centerY * centerY) + safeProximity;

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
  }, [disabled, safeProximity]);

  const effectiveIntensity = disabled
    ? 0
    : isNear || isInside
      ? safeGlowIntensity
      : 0;

  return (
    <div
      ref={boxRef}
      className={cn("ray-card", className)}
      style={
        {
          "--light-opacity": effectiveIntensity,
          "--glow-color": safeGlowColor,
          "--border-radius": safeBorderRadius,
          position: "relative",
          padding: "24px",
          backdropFilter: "blur(10px)",
          borderRadius: safeBorderRadius,
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
            background: `radial-gradient(${safeGlowSpread}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${safeGlowColor}, transparent 40%)`,
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
              background: `radial-gradient(${safeGlowSpread}px circle at var(--mouse-x) var(--mouse-y), ${safeGlowColor}, transparent 100%)`,
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
