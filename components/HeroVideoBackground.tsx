"use client";

import { useEffect, useRef } from "react";

const LOOP_END = 7.5; // segundos — corta antes do nome aparecer no vídeo

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotion = () => {
      if (mq.matches) video.pause();
      else video.play().catch(() => {});
    };

    const onTimeUpdate = () => {
      if (video.currentTime >= LOOP_END) {
        video.currentTime = 0;
        if (!mq.matches) video.play().catch(() => {});
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    mq.addEventListener("change", applyMotion);
    applyMotion();

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      mq.removeEventListener("change", applyMotion);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
    >
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
        }}
      />
    </div>
  );
}
