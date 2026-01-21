"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  type CSSProperties,
  type Ref,
} from "react";
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
  children: ReactNode;
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
  /** Ref to the root element (React 19 ref-as-prop pattern) */
  ref?: Ref<HTMLDivElement>;
  /** Accessible label for the card */
  "aria-label"?: string;
}

interface MouseState {
  x: number;
  y: number;
  isNear: boolean;
  isInside: boolean;
}

interface ShadowState {
  x: number;
  y: number;
  blur: number;
  spread: number;
  opacity: number;
}

const INITIAL_MOUSE_STATE: MouseState = {
  x: 0,
  y: 0,
  isNear: false,
  isInside: false,
};

const INITIAL_SHADOW_STATE: ShadowState = {
  x: 0,
  y: 0,
  blur: 20,
  spread: 0,
  opacity: 0,
};

export function RayCard({
  children,
  className,
  glowColor = VALIDATION_DEFAULTS.glowColor,
  glowIntensity = VALIDATION_DEFAULTS.glowIntensity,
  glowSpread = VALIDATION_DEFAULTS.glowSpread,
  borderRadius = VALIDATION_DEFAULTS.borderRadius,
  proximity = VALIDATION_DEFAULTS.proximity,
  disabled = false,
  glowMode = "both",
  ref,
  "aria-label": ariaLabel,
}: RayCardProps) {
  // Internal ref for DOM measurements
  const internalRef = useRef<HTMLDivElement>(null);
  const boxRef = ref ?? internalRef;

  // State for mouse position and proximity
  const [mouseState, setMouseState] = useState<MouseState>(INITIAL_MOUSE_STATE);
  const [shadowState, setShadowState] = useState<ShadowState>(INITIAL_SHADOW_STATE);

  // Memoized validated props to prevent recalculation on every render
  const safeGlowColor = useMemo(
    () => (isValidCssColor(glowColor) ? glowColor : VALIDATION_DEFAULTS.glowColor),
    [glowColor]
  );

  const safeGlowIntensity = useMemo(
    () =>
      clampNumber(
        glowIntensity,
        VALIDATION_RANGES.glowIntensity.min,
        VALIDATION_RANGES.glowIntensity.max,
        VALIDATION_DEFAULTS.glowIntensity
      ),
    [glowIntensity]
  );

  const safeGlowSpread = useMemo(
    () =>
      clampNumber(
        glowSpread,
        VALIDATION_RANGES.glowSpread.min,
        VALIDATION_RANGES.glowSpread.max,
        VALIDATION_DEFAULTS.glowSpread
      ),
    [glowSpread]
  );

  const safeBorderRadius = useMemo(
    () => (isValidBorderRadius(borderRadius) ? borderRadius : VALIDATION_DEFAULTS.borderRadius),
    [borderRadius]
  );

  const safeProximity = useMemo(
    () =>
      clampNumber(
        proximity,
        VALIDATION_RANGES.proximity.min,
        VALIDATION_RANGES.proximity.max,
        VALIDATION_DEFAULTS.proximity
      ),
    [proximity]
  );

  // Memoized event handler for mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const box = typeof boxRef === "object" && boxRef?.current ? boxRef.current : null;
      if (!box) return;

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

      // Only update state if values changed
      setMouseState((prev) => {
        if (
          prev.x === x &&
          prev.y === y &&
          prev.isNear === isCursorNearBorder &&
          prev.isInside === isCursorInsideBox
        ) {
          return prev;
        }
        return { x, y, isNear: isCursorNearBorder, isInside: isCursorInsideBox };
      });

      const isActive = isCursorNearBorder || isCursorInsideBox;

      if (isActive) {
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
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY) + safeProximity;

        const spread = 1 + (distFromCenter / maxDist) * 15;
        const blur = 10 + (distFromCenter / maxDist) * 30;

        setShadowState((prev) => {
          if (
            prev.x === shadowX &&
            prev.y === shadowY &&
            prev.blur === blur &&
            prev.spread === spread &&
            prev.opacity === 0.2
          ) {
            return prev;
          }
          return { x: shadowX, y: shadowY, blur, spread, opacity: 0.2 };
        });
      } else {
        setShadowState((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      }
    },
    [boxRef, safeProximity]
  );

  // Memoized event handler for mouse leave
  const handleMouseLeave = useCallback(() => {
    setMouseState(INITIAL_MOUSE_STATE);
    setShadowState((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
  }, []);

  // Effect for setting up event listeners
  useEffect(() => {
    if (disabled) return;

    const box = typeof boxRef === "object" && boxRef?.current ? boxRef.current : null;
    if (!box) return;

    document.addEventListener("mousemove", handleMouseMove);
    box.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      box.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, handleMouseMove, handleMouseLeave, boxRef]);

  // Computed effective intensity
  const effectiveIntensity = useMemo(() => {
    if (disabled) return 0;
    return mouseState.isNear || mouseState.isInside ? safeGlowIntensity : 0;
  }, [disabled, mouseState.isNear, mouseState.isInside, safeGlowIntensity]);

  // Memoized style objects to prevent recreation on every render
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      "--light-opacity": effectiveIntensity,
      "--glow-color": safeGlowColor,
      "--border-radius": safeBorderRadius,
      "--mouse-x": `${mouseState.x}px`,
      "--mouse-y": `${mouseState.y}px`,
      position: "relative",
      padding: "24px",
      backdropFilter: "blur(10px)",
      borderRadius: safeBorderRadius,
      overflow: "hidden",
      boxShadow: disabled
        ? "none"
        : `${shadowState.x}px ${shadowState.y}px ${shadowState.blur}px ${shadowState.spread}px rgba(0, 0, 0, ${shadowState.opacity})`,
      transition: "box-shadow 0.3s ease-out, opacity 0.3s ease-out",
    } as CSSProperties),
    [
      effectiveIntensity,
      safeGlowColor,
      safeBorderRadius,
      mouseState.x,
      mouseState.y,
      disabled,
      shadowState,
    ]
  );

  const glowStyle = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(${safeGlowSpread}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${safeGlowColor}, transparent 40%)`,
      opacity: effectiveIntensity,
      transition: "opacity 0.3s ease-out",
    }),
    [safeGlowSpread, safeGlowColor, effectiveIntensity]
  );

  const borderGlowStyle = useMemo<CSSProperties>(
    () => ({
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "1px",
      background: `radial-gradient(${safeGlowSpread}px circle at var(--mouse-x) var(--mouse-y), ${safeGlowColor}, transparent 100%)`,
      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      maskComposite: "exclude",
      WebkitMaskComposite: "xor",
      pointerEvents: "none",
      opacity: effectiveIntensity,
      transition: "opacity 0.3s ease-out",
    } as CSSProperties),
    [safeGlowSpread, safeGlowColor, effectiveIntensity]
  );

  const contentStyle = useMemo<CSSProperties>(
    () => ({
      position: "relative",
      zIndex: 10,
    }),
    []
  );

  // Determine if glow layers should render
  const showCardGlow = glowMode === "both" || glowMode === "card";
  const showBorderGlow = glowMode === "both" || glowMode === "border";

  return (
    <div
      ref={boxRef as React.RefObject<HTMLDivElement>}
      className={cn("ray-card", className)}
      style={containerStyle}
      role="article"
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
    >
      {showCardGlow && <div className="ray-card-glow" style={glowStyle} aria-hidden="true" />}
      {showBorderGlow && (
        <div className="ray-card-border-glow" style={borderGlowStyle} aria-hidden="true" />
      )}
      <div style={contentStyle}>{children}</div>
    </div>
  );
}

RayCard.displayName = "RayCard";

export default RayCard;
