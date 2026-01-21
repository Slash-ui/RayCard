import React, { useRef, useEffect, useState } from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface RayCardProps {
  children: React.ReactNode;
  className?: string;
}

export function RayCard({ children, className }: RayCardProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const distance = 32;
      const isCursorNearBorder =
        (e.clientX > rect.left - distance && e.clientX < rect.right + distance) &&
        (e.clientY > rect.top - distance && e.clientY < rect.bottom + distance);

      const isCursorInsideBox =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

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
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY) + distance;

        const spread = 1 + (distFromCenter / maxDist) * 15;
        const blur = 10 + (distFromCenter / maxDist) * 30;

        box.style.setProperty('--shadow-x', `${shadowX}px`);
        box.style.setProperty('--shadow-y', `${shadowY}px`);
        box.style.setProperty('--shadow-blur', `${blur}px`);
        box.style.setProperty('--shadow-spread', `${spread}px`);
        box.style.setProperty('--shadow-opacity', `0.2`);

      } else {
        box.style.setProperty('--shadow-opacity', '0');
      }
    };

    const handleMouseLeave = () => {
      setIsNear(false);
      setIsInside(false);
      if (boxRef.current) {
        boxRef.current.style.setProperty('--shadow-opacity', '0');
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
  }, []);

  return (
    <div
      ref={boxRef}
      className={cn("ray-card", className)}
      style={{
        '--light-opacity': (isNear || isInside) ? 1 : 0,
        boxShadow: 'var(--shadow-x, 0px) var(--shadow-y, 0px) var(--shadow-blur, 20px) var(--shadow-spread, 0px) rgba(0, 0, 0, var(--shadow-opacity, 0))',
        transition: 'box-shadow 0.3s ease-out, opacity 0.3s ease-out',
      } as React.CSSProperties}
    >
      <div className="ray-card-glow" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default RayCard;
