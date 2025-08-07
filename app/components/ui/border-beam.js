"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils"; // Make sure this utility exists or replace with your own

const BorderBeam = ({
  className,
  size = 48,
  delay = 0,
  duration = 6,
  colorFrom = "#7400ff",
  colorTo = "#9b41ff",
  style,
  reverse = false,
  borderThickness = 2,
  opacity = 1,
  glowIntensity = 0.6,
  beamBorderRadius = 16,
  pauseOnHover = false,
  speedMultiplier = 1,
}) => {
  const actualDuration = duration / speedMultiplier;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
      style={{
        borderRadius: `${beamBorderRadius}px`,
        ...style,
      }}
    >
      <motion.div
        className={cn(
          "absolute w-full h-full rounded-[inherit] border-[var(--border-thickness)] border-transparent",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:bg-gradient-to-r before:from-[var(--color-from)] before:to-[var(--color-to)]",
          "before:blur-lg before:opacity-70 before:animate-borderRotate",
          className,
          pauseOnHover && "group-hover:paused"
        )}
        style={{
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-thickness": `${borderThickness}px`,
          opacity: opacity,
          boxShadow:
            glowIntensity > 0
              ? `0 0 ${glowIntensity * 10}px ${glowIntensity * 3}px ${colorFrom}`
              : undefined,
        }}
        animate={{
          rotate: reverse ? [360, 0] : [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: actualDuration,
          ease: "linear",
          delay,
        }}
      />
    </div>
  );
};

export default BorderBeam;
