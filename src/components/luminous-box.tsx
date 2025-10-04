"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";

export function LuminousBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
        (e.clientY > rect.top - distance && e.clientY < rect.bottom + distance) &&
        (
          e.clientX < rect.left + distance ||
          e.clientX > rect.right - distance ||
          e.clientY < rect.top + distance ||
          e.clientY > rect.bottom - distance
        );

      const isCursorInsideBox = 
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      setIsNear(isCursorNearBorder);
      setIsInside(isCursorInsideBox);

      if (isCursorNearBorder) {
        box.style.setProperty("--mouse-x", `${x}px`);
        box.style.setProperty("--mouse-y", `${y}px`);

        const shadowX = (x / rect.width - 0.5) * -20;
        const shadowY = (y / rect.height - 0.5) * -20;
        const shadowBlur = 25;
        const shadowSpread = 3;
        const shadowColor = "rgba(0, 0, 0, 0.25)";
        
        box.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`;
      } else if (isCursorInsideBox) {
        box.style.setProperty("--mouse-x", `${rect.width / 2}px`);
        box.style.setProperty("--mouse-y", `${rect.height / 2}px`);
        box.style.boxShadow = `0px 0px 15px 0px rgba(0, 0, 0, 0.15)`;
      } else {
        box.style.boxShadow = "none";
      }
    };

    const handleMouseLeave = () => {
      setIsNear(false);
      setIsInside(false);
      if (box) {
        box.style.boxShadow = "none";
      }
    };
    
    box.style.transition = 'box-shadow 0.3s ease-out';
    box.style.boxShadow = "none";

    document.addEventListener("mousemove", handleMouseMove);
    box.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      box.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={boxRef} className={cn("luminous-box", className)} style={{ '--light-opacity': (isNear || isInside) ? 1 : 0 } as React.CSSProperties}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
