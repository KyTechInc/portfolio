"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/base-tooltip";
import { Icons } from "@/components/icons";

const DOCK_APPS = [
  { name: "Arc", icon: Icons.Arc },
  { name: "Docker", icon: Icons.Docker },
  { name: "Warp", icon: Icons.Warp },
  { name: "NextJS", icon: Icons.NextJS },
  { name: "Supabase", icon: Icons.Supabase },
  { name: "Tailwind", icon: Icons.Tailwind },
  { name: "Raycast", icon: Icons.Raycast },
] as const;

export function DockDemo() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  // Responsive config derived from macOS dock implementation
  const getResponsiveConfig = useCallback(() => {
    if (typeof window === "undefined") {
      return { baseIconSize: 64, maxScale: 1.6, effectWidth: 240 };
    }
    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    if (smallerDimension < 480) {
      return {
        baseIconSize: Math.max(40, smallerDimension * 0.08),
        maxScale: 1.4,
        effectWidth: smallerDimension * 0.4,
      };
    } else if (smallerDimension < 768) {
      return {
        baseIconSize: Math.max(48, smallerDimension * 0.07),
        maxScale: 1.5,
        effectWidth: smallerDimension * 0.35,
      };
    } else if (smallerDimension < 1024) {
      return {
        baseIconSize: Math.max(56, smallerDimension * 0.06),
        maxScale: 1.6,
        effectWidth: smallerDimension * 0.3,
      };
    } else {
      return {
        baseIconSize: Math.max(64, Math.min(80, smallerDimension * 0.05)),
        maxScale: 1.8,
        effectWidth: 300,
      };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = Math.max(4, baseIconSize * 0.08);

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback(
    (mousePosition: number | null) => {
      if (mousePosition === null) return DOCK_APPS.map(() => minScale);

      return DOCK_APPS.map((_, index) => {
        const normalIconCenter = index * (baseIconSize + baseSpacing) + baseIconSize / 2;
        const minX = mousePosition - effectWidth / 2;
        const maxX = mousePosition + effectWidth / 2;
        if (normalIconCenter < minX || normalIconCenter > maxX) return minScale;
        const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
        const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
        const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
        return minScale + scaleFactor * (maxScale - minScale);
      });
    },
    [baseIconSize, baseSpacing, effectWidth, maxScale]
  );

  const calculatePositions = useCallback(
    (scales: number[]) => {
      let currentX = 0;
      return scales.map((scale) => {
        const scaledWidth = baseIconSize * scale;
        const centerX = currentX + scaledWidth / 2;
        currentX += scaledWidth + baseSpacing;
        return centerX;
      });
    },
    [baseIconSize, baseSpacing]
  );

  const [currentScales, setCurrentScales] = useState<number[]>(DOCK_APPS.map(() => minScale));
  const [currentPositions, setCurrentPositions] = useState<number[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTimeRef = useRef<number>(0);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Normalize incoming SVGs: force width/height to 100%, compute a square viewBox
  // that fully contains the icon's content with consistent padding.
  useEffect(() => {
    function parseViewBox(vb: string | null) {
      if (!vb) return null as null | { x: number; y: number; w: number; h: number };
      const nums = vb.split(/\s+/).map(Number).filter((n) => Number.isFinite(n));
      if (nums.length !== 4) return null;
      return { x: nums[0], y: nums[1], w: nums[2], h: nums[3] };
    }

    function normalize(svg: SVGSVGElement) {
      // Prefer real content bbox; fallback to existing viewBox
      let x = 0, y = 0, w = 0, h = 0;
      try {
        const b = svg.getBBox();
        x = b.x; y = b.y; w = b.width; h = b.height;
      } catch {
        const vb = parseViewBox(svg.getAttribute("viewBox"));
        if (vb) { x = vb.x; y = vb.y; w = vb.w; h = vb.h; }
      }
      if (!(w > 0 && h > 0)) return;

      const size = Math.max(w, h);
      const pad = size * 0.12; // consistent visual padding
      const square = size + pad;
      const cx = x + w / 2;
      const cy = y + h / 2;
      const newX = cx - square / 2;
      const newY = cy - square / 2;

      svg.setAttribute("viewBox", `${newX} ${newY} ${square} ${square}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.display = "block";
    }

    iconRefs.current.forEach((container) => {
      const svg = container?.querySelector("svg");
      if (svg instanceof SVGSVGElement) normalize(svg);
    });
  }, []);

  useEffect(() => {
    const initialScales = DOCK_APPS.map(() => minScale);
    setCurrentScales(initialScales);
    setCurrentPositions(calculatePositions(initialScales));
  }, [calculatePositions]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.2 : 0.12;

    setCurrentScales((prev) =>
      prev.map((s, i) => s + (targetScales[i] - s) * lerpFactor)
    );
    setCurrentPositions((prev) =>
      prev.map((p, i) => p + (targetPositions[i] - p) * lerpFactor)
    );

    const scalesNeedUpdate = currentScales.some((s, i) => Math.abs(s - targetScales[i]) > 0.002);
    const positionsNeedUpdate = currentPositions.some((p, i) => Math.abs(p - targetPositions[i]) > 0.1);
    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animateToTarget);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animateToTarget]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveTimeRef.current < 16) return;
      lastMouseMoveTimeRef.current = now;
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        const padding = Math.max(8, baseIconSize * 0.12);
        setMouseX(e.clientX - rect.left - padding);
      }
    },
    [baseIconSize]
  );

  const handleMouseLeave = useCallback(() => setMouseX(null), []);

  const contentWidth = currentPositions.length > 0
    ? Math.max(
        ...currentPositions.map((pos, i) => pos + (baseIconSize * currentScales[i]) / 2)
      )
    : DOCK_APPS.length * (baseIconSize + baseSpacing) - baseSpacing;
  const padding = Math.max(8, baseIconSize * 0.12);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <TooltipProvider>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: Dock magnification needs mouse movement handlers */}
        <div
          ref={dockRef}
          className="backdrop-blur-md scale-[0.65] origin-center"
          style={{
            width: `${contentWidth + padding * 2}px`,
            background: "rgba(45, 45, 45, 0.75)",
            borderRadius: `${Math.max(12, baseIconSize * 0.4)}px`,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: `
              0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(16, baseIconSize * 0.4)}px rgba(0, 0, 0, 0.4),
              0 ${Math.max(2, baseIconSize * 0.05)}px ${Math.max(8, baseIconSize * 0.2)}px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
            `,
            padding: `${padding}px`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative" style={{ height: `${baseIconSize}px`, width: "100%" }}>
            {DOCK_APPS.map((app, index) => {
              const scale = currentScales[index] ?? 1;
              const position = currentPositions[index] ?? 0;
              const scaledSize = baseIconSize * scale;
              const Icon = app.icon;
              return (
                <div
                  key={app.name}
                  className="absolute cursor-pointer flex flex-col items-center justify-end"
                  style={{
                    left: `${position - scaledSize / 2}px`,
                    bottom: "0px",
                    width: `${scaledSize}px`,
                    height: `${scaledSize}px`,
                    transformOrigin: "bottom center",
                    zIndex: Math.round(scale * 10),
                  }}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        ref={(el) => {
                          iconRefs.current[index] = el;
                        }}
                        className="size-full bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1.5 sm:p-2 overflow-hidden flex items-center justify-center"
                      >
                        <Icon className="w-full h-full" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs sm:text-sm" sideOffset={8}>
                      <p>{app.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}