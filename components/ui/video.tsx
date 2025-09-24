"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface VideoProps {
  src: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}

export function Video({
  src,
  className,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
  playsInline = true,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to play video on mount for Safari
    if (autoPlay) {
      const playVideo = async () => {
        try {
          if (videoRef.current) {
            await videoRef.current.play();
          }
        } catch (error) {
          console.log("Autoplay prevented:", error);
        }
      };
      playVideo();
    }
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      className={cn(
        "rounded-xl aspect-3/2 w-full bg-neutral-100 dark:bg-neutral-900 object-cover",
        className
      )}
      poster={poster}
      autoPlay={autoPlay}
      playsInline={playsInline}
      loop={loop}
      muted={muted}
      controls={controls}
    >
      {/* MP4 Source */}
      <source src={src} type="video/mp4" />
      {/* WebM Source for broader compatibility */}
      <source src={src.replace('.mp4', '.webm')} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
} 