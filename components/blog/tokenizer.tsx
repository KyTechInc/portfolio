/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';
import { useState, useEffect, useRef } from 'react';

export default function TokenizationFlow() {
  const [animationStep, setAnimationStep] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dashOffsetRef = useRef(0);

  const nodes = [
    { id: 'input', type: 'inputText', x: 150, y: 250, label: '"Hello, world!"' },
    { id: 'tokenizer', type: 'process', x: 450, y: 250, label: 'Tokenizer', desc: 'tiktoken (GPT)' },
    { id: 'token1', type: 'token', x: 750, y: 100, label: '"Hello"' },
    { id: 'token2', type: 'token', x: 750, y: 200, label: '","' },
    { id: 'token3', type: 'token', x: 750, y: 300, label: '" world"' },
    { id: 'token4', type: 'token', x: 750, y: 400, label: '"!"' },
    { id: 'model', type: 'process', x: 1000, y: 250, label: 'LLM', desc: 'Processing' },
  ];

  const edges = [
    { x1: 250, y1: 250, x2: 360, y2: 250, color: '#ab4642', step: 1 }, // chart-1
    { x1: 540, y1: 250, x2: 700, y2: 100, color: '#a16946', step: 2 }, // chart-2
    { x1: 540, y1: 250, x2: 700, y2: 200, color: '#a16946', step: 2 },
    { x1: 540, y1: 250, x2: 700, y2: 300, color: '#a16946', step: 2 },
    { x1: 540, y1: 250, x2: 700, y2: 400, color: '#a16946', step: 2 },
    { x1: 800, y1: 100, x2: 910, y2: 250, color: '#86c1b9', step: 3 }, // chart-3
    { x1: 800, y1: 200, x2: 910, y2: 250, color: '#86c1b9', step: 3 },
    { x1: 800, y1: 300, x2: 910, y2: 250, color: '#86c1b9', step: 3 },
    { x1: 800, y1: 400, x2: 910, y2: 250, color: '#86c1b9', step: 3 },
  ];

  // Color palette from your design system (dark mode)
  const colors = {
    background: 'oklch(0.1450 0 0)', // --background
    card: 'oklch(0.1684 0 0)', // --card
    border: 'oklch(0.2776 0.0036 286.1607)', // --border
    muted: 'oklch(0.2760 0.0062 258.3576)', // --muted
    mutedForeground: 'oklch(0.7368 0.0067 255.4874)', // --muted-foreground
    foreground: 'oklch(0.9764 0.0013 286.3755)', // --foreground
    primary: 'oklch(0.9702 0 0)', // --primary
    chart1: '#ab4642', // --chart-1 converted
    chart2: '#a16946', // --chart-2 converted
    chart3: '#86c1b9', // --chart-3 converted
  };

  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const parseOklch = (oklch: string) => {
    const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) return 'rgb(255, 255, 255)';
    const [_, l, c, h] = match;
    return `oklch(${l} ${c} ${h})`;
  };

  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
      if (!ctx) return;

      // Clear canvas with background color
      ctx.fillStyle = parseOklch(colors.background);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dotted background
      ctx.fillStyle = 'rgba(71, 77, 87, 0.3)'; // subtle dots
      for (let x = 0; x < canvas.width; x += 24) {
        for (let y = 0; y < canvas.height; y += 24) {
          ctx.beginPath();
          ctx.arc(x + 2, y + 2, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw edges
      edges.forEach(edge => {
        ctx.strokeStyle = edge.color;
        ctx.lineWidth = 2;

        if (animationStep >= edge.step) {
          ctx.setLineDash([8, 8]);
          ctx.lineDashOffset = dashOffsetRef.current;
          ctx.globalAlpha = 1;
        } else {
          ctx.setLineDash([]);
          ctx.globalAlpha = 0.2;
        }

        ctx.beginPath();
        ctx.moveTo(edge.x1, edge.y1);
        ctx.lineTo(edge.x2, edge.y2);
        ctx.stroke();

        if (animationStep >= edge.step) {
          const angle = Math.atan2(edge.y2 - edge.y1, edge.x2 - edge.x1);
          const arrowLength = 10;

          ctx.beginPath();
          ctx.moveTo(edge.x2, edge.y2);
          ctx.lineTo(
            edge.x2 - arrowLength * Math.cos(angle - Math.PI / 6),
            edge.y2 - arrowLength * Math.sin(angle - Math.PI / 6)
          );
          ctx.moveTo(edge.x2, edge.y2);
          ctx.lineTo(
            edge.x2 - arrowLength * Math.cos(angle + Math.PI / 6),
            edge.y2 - arrowLength * Math.sin(angle + Math.PI / 6)
          );
          ctx.stroke();
        }

        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      });

      // Draw nodes
      nodes.forEach(node => {
        const cardColor = parseOklch(colors.card);
        const foregroundColor = parseOklch(colors.foreground);
        const mutedColor = parseOklch(colors.mutedForeground);

        if (node.type === 'inputText') {
          // Draw background with subtle shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 4;

          ctx.fillStyle = cardColor;
          drawRoundedRect(ctx, node.x - 100, node.y - 35, 200, 70, 8);
          ctx.fill();

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;

          ctx.strokeStyle = colors.chart1;
          ctx.lineWidth = 1.5;
          drawRoundedRect(ctx, node.x - 100, node.y - 35, 200, 70, 8);
          ctx.stroke();

          // Draw text
          ctx.fillStyle = mutedColor;
          ctx.font = '11px var(--font-sans)';
          ctx.textAlign = 'center';
          ctx.fillText('Input Text', node.x, node.y - 10);

          ctx.fillStyle = foregroundColor;
          ctx.font = '15px var(--font-mono)';
          ctx.fillText(node.label, node.x, node.y + 15);

          // Draw connection point
          ctx.fillStyle = colors.chart1;
          ctx.beginPath();
          ctx.arc(node.x + 100, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        else if (node.type === 'process') {
          // Draw background with shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 4;

          ctx.fillStyle = cardColor;
          drawRoundedRect(ctx, node.x - 90, node.y - 35, 180, 70, 8);
          ctx.fill();

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;

          ctx.strokeStyle = colors.chart2;
          ctx.lineWidth = 1.5;
          drawRoundedRect(ctx, node.x - 90, node.y - 35, 180, 70, 8);
          ctx.stroke();

          // Draw gear icon circle
          ctx.fillStyle = colors.chart2;
          ctx.beginPath();
          ctx.arc(node.x - 55, node.y, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = cardColor;
          ctx.font = '14px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⚙', node.x - 55, node.y + 4);

          // Draw labels
          ctx.fillStyle = foregroundColor;
          ctx.font = '600 13px var(--font-sans)';
          ctx.fillText(node.label, node.x, node.y - 5);

          ctx.fillStyle = mutedColor;
          ctx.font = '10px var(--font-sans)';
          ctx.fillText(node.desc || '', node.x, node.y + 14);

          // Draw connection points
          ctx.fillStyle = colors.chart2;
          ctx.beginPath();
          ctx.arc(node.x - 90, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(node.x + 90, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        else if (node.type === 'token') {
          // Draw background with shadow
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetY = 4;

          ctx.fillStyle = cardColor;
          drawRoundedRect(ctx, node.x - 50, node.y - 25, 100, 50, 8);
          ctx.fill();

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetY = 0;

          ctx.strokeStyle = colors.chart3;
          ctx.lineWidth = 1.5;
          drawRoundedRect(ctx, node.x - 50, node.y - 25, 100, 50, 8);
          ctx.stroke();

          // Draw text
          ctx.fillStyle = colors.chart3;
          ctx.font = '600 12px var(--font-mono)';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + 4);

          // Draw connection points
          ctx.fillStyle = colors.chart3;
          ctx.beginPath();
          ctx.arc(node.x - 50, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(node.x + 50, node.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw info box
      if (showInfo) {
        const x = 450;
        const y = 450;

        const mutedBg = parseOklch(colors.muted);
        const borderColor = parseOklch(colors.border);
        const foregroundColor = parseOklch(colors.foreground);
        const mutedColor = parseOklch(colors.mutedForeground);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = mutedBg;
        drawRoundedRect(ctx, x - 140, y - 50, 280, 100, 8);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        drawRoundedRect(ctx, x - 140, y - 50, 280, 100, 8);
        ctx.stroke();

        ctx.fillStyle = mutedColor;
        ctx.font = '11px var(--font-sans)';
        ctx.textAlign = 'center';
        ctx.fillText('Token Facts', x, y - 25);

        ctx.fillStyle = foregroundColor;
        ctx.font = '10px var(--font-sans)';
        ctx.fillText('1 token ≈ 0.75 words in English.', x, y);
        ctx.fillText('GPT uses ~100K token vocabulary.', x, y + 16);
      }

      // Animate dash offset
      dashOffsetRef.current = (dashOffsetRef.current - 0.5) % 16;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationStep, showInfo, drawRoundedRect, parseOklch]);

  const startAnimation = () => {
    setAnimationStep(0);
    setTimeout(() => setAnimationStep(1), 500);
    setTimeout(() => setAnimationStep(2), 1500);
    setTimeout(() => setAnimationStep(3), 2500);
  };

  const resetAnimation = () => {
    setAnimationStep(0);
  };

  return (
    <div className="w-full h-[600px] bg-background rounded-lg border border-border relative overflow-hidden my-8">
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        className="w-full h-full"
      />
      
      {/* Controls */}
      <div className="absolute bottom-6 left-6 flex gap-3 z-10">
        <button
          type="button"
          onClick={startAnimation}
          className="bg-card hover:bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border shadow-md transition-all flex items-center gap-2"
        >
          <span>▶</span> Start
        </button>
        <button
          type="button"
          onClick={resetAnimation}
          className="bg-card hover:bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border shadow-md transition-all"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className="bg-card hover:bg-muted text-foreground px-4 py-2 rounded-lg text-sm font-medium border border-border shadow-md transition-all"
        >
          {showInfo ? 'Hide' : 'Show'} Info
        </button>
      </div>

      {/* Animation Step Counter */}
      <div className="absolute top-6 right-6 bg-card border border-border rounded-lg px-4 py-3 z-10 shadow-md">
        <div className="text-xs text-muted-foreground mb-1">Step</div>
        <div className="text-2xl font-bold text-foreground tabular-nums">{animationStep}/3</div>
      </div>
    </div>
  );
}