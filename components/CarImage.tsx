"use client";

import { useState } from "react";
import type { Car } from "@/lib/cars";

/**
 * Renders a premium gradient "showcase" placeholder by default. If a car has a
 * valid imageUrl it is shown on top, but any load error silently falls back to
 * the placeholder so a broken image never appears.
 */
export default function CarImage({
  car,
  className = "",
  rounded = "rounded-lg",
  priority = false,
}: {
  car: Pick<Car, "name" | "category" | "hue" | "imageUrl">;
  className?: string;
  rounded?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const hue = car.hue ?? 215;
  const showImage = car.imageUrl && car.imageUrl.trim() !== "" && !failed;

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 38% 22%) 0%, hsl(${
          (hue + 30) % 360
        } 30% 14%) 60%, #0b1220 100%)`,
      }}
      aria-hidden={false}
    >
      {/* Decorative road/sheen lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`g-${hue}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c6a15b" stopOpacity="0.7" />
            <stop offset="1" stopColor="#c6a15b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-20 210 Q160 150 440 215" stroke={`url(#g-${hue})`} strokeWidth="2" fill="none" />
        <path d="M-20 235 Q200 175 460 235" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" fill="none" />
        <ellipse cx="200" cy="250" rx="220" ry="40" fill="#000" opacity="0.25" />
      </svg>

      {/* Car silhouette mark */}
      <svg
        className="absolute left-1/2 top-1/2 w-2/3 max-w-[260px] -translate-x-1/2 -translate-y-[60%] opacity-90"
        viewBox="0 0 240 90"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 64c-6 0-10-4-10-9 0-4 2-7 7-9l10-3 14-18c3-4 8-6 14-7 12-2 30-3 44-3 16 0 28 4 40 12l16 11 20 4c8 2 12 6 12 12 0 6-4 10-11 10h-9a16 16 0 01-31 0H60a16 16 0 01-31 0h-11z"
          fill="#fff"
          fillOpacity="0.92"
        />
        <circle cx="45" cy="64" r="9" fill="#0b1220" />
        <circle cx="45" cy="64" r="4" fill="#c6a15b" />
        <circle cx="150" cy="64" r="9" fill="#0b1220" />
        <circle cx="150" cy="64" r="4" fill="#c6a15b" />
        <path d="M58 36c2-3 6-5 11-5h30c10 0 18 3 26 9l6 5H64l-6-9z" fill="#0b1220" fillOpacity="0.25" />
      </svg>

      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={car.imageUrl}
          alt={`${car.name} — ${car.category} car for rent in Mauritius`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Label badge — always present for context */}
      <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-soft/90">
          {car.category}
        </span>
        <span className="font-display text-lg font-bold leading-none text-white drop-shadow">
          {car.name}
        </span>
      </div>
    </div>
  );
}
