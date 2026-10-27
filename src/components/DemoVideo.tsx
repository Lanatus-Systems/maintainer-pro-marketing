"use client";

import { useEffect, useRef } from "react";

/** Muted looping demo. The file only loads once the video nears the viewport. */
export function DemoVideo({ src, poster, width, height, label }: {
  src: string; poster: string; width: number; height: number; label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const load = () => {
      if (!v.src) {
        v.src = src;
        v.load();
        v.play().catch(() => {});
      }
    };
    if (!("IntersectionObserver" in window)) return load();
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { load(); io.disconnect(); }
    }, { rootMargin: "200px" });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref}
      className="landing-demo-video"
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      autoPlay
      controls
      preload="none"
      aria-label={label}
    />
  );
}
