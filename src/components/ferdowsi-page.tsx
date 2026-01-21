"use client";

import React from "react";
import RayCard from "./ray-card";

export default function FerdowsiPoetryPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1736841705318-c579dd49ee4f?q=80&w=5148&auto=format&fit=crop")',
          filter: "brightness(0.6)",
        }}
      />

      {/* Attribution */}
      <div className="absolute bottom-4 right-4 z-10 text-xs text-white/50 font-light">
        Photo by&nbsp;
        <a
          href="https://unsplash.com/@hosseinnasr?utm_source=ray-card&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Hossein Nasr
        </a>
        &nbsp;on&nbsp;
        <a
          href="https://unsplash.com/?utm_source=ray-card&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Unsplash
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        <RayCard
          proximity={32}
          glowSpread={200}
          glowIntensity={0.7}
          borderRadius="32px"
          glowMode="border"
          className="max-w-xl w-full mx-auto"
        >
          <div className="flex flex-col items-center text-center p-8 space-y-8">
            {/* Ferdowsi Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c2/%D9%86%DA%AF%D8%A7%D8%B1%D9%87_%D9%81%D8%B1%D8%AF%D9%88%D8%B3%DB%8C_%28Cropped_and_Edited%29.jpg"
                alt="Ferdowsi"
                className="w-full h-full object-cover grayscale brightness-110 contrast-125"
              />
            </div>

            {/* Poetry */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-white font-serif">
                  Ferdowsi
                </h1>
                <p className="text-sm text-white/50 font-light">
                  Ferdowsi Tusi
                </p>
              </div>

              <div className="w-12 h-0.5 bg-white/20 mx-auto rounded-full" />

              <blockquote className="text-xl md:text-2xl text-white/90 italic leading-relaxed font-serif">
                "I see no justice left in all the land;
                <br />
                The wicked thrive, the righteous fall unmanned."
              </blockquote>

              <p className="text-sm text-white/60 pt-2">
                — Shahnameh (The Book of Kings)
              </p>
            </div>
          </div>
        </RayCard>
      </div>
    </div>
  );
}
