import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  UploadCloud,
  Layers,
  Check,
} from 'lucide-react';
import { MockupState } from '../types';
import { deviceMockupGenerator } from '../generators/device-mockup';
import { ASPECT_RATIOS } from '../utils/constants';
import { SAMPLE_PRESETS } from '../utils/samples';

interface CanvasStageProps {
  state: MockupState;
  onSelectSample: (dataUrl: string, name: string, category: string) => void;
  onImageSelected: (file: File) => void;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  state,
  onSelectSample,
  onImageSelected,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const [isStageDragging, setIsStageDragging] = React.useState<boolean>(false);
  const [containerDimensions, setContainerDimensions] = React.useState<{ width: number; height: number }>({
    width: 800,
    height: 600,
  });

  // Calculate target logical canvas dimensions based on selected aspect ratio
  const getCanvasDimensions = React.useCallback(() => {
    const selectedRatioObj = ASPECT_RATIOS.find((r) => r.id === state.aspectRatio);
    let targetW = 1600;
    let targetH = 900;

    if (state.aspectRatio === '1:1') {
      targetW = 1200;
      targetH = 1200;
    } else if (state.aspectRatio === '4:3' || state.aspectRatio === 'dribbble') {
      targetW = 1600;
      targetH = 1200;
    } else if (state.aspectRatio === '9:16') {
      targetW = 1080;
      targetH = 1920;
    } else if (state.aspectRatio === 'twitter') {
      targetW = 1200;
      targetH = 675;
    } else if (state.aspectRatio === 'auto') {
      if (state.frameType === 'phone') {
        targetW = 1080;
        targetH = 1500;
      } else if (state.frameType === 'laptop') {
        targetW = 1600;
        targetH = 1050;
      } else {
        targetW = 1600;
        targetH = 950;
      }
    } else if (selectedRatioObj?.ratio) {
      targetW = 1600;
      targetH = Math.round(1600 / selectedRatioObj.ratio);
    }

    return { width: targetW, height: targetH };
  }, [state.aspectRatio, state.frameType]);

  // ResizeObserver on Stage Container
  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerDimensions({
            width: Math.max(300, entry.contentRect.width),
            height: Math.max(300, entry.contentRect.height),
          });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Canvas Redraw Loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width: targetW, height: targetH } = getCanvasDimensions();
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Render using generator module
    deviceMockupGenerator.render(
      ctx,
      state.sourceImageElement,
      state,
      targetW,
      targetH,
      false
    );
  }, [state, getCanvasDimensions]);

  // Compute CSS display scaling so canvas fits nicely inside stage container
  const canvasLogical = getCanvasDimensions();
  const maxDisplayW = containerDimensions.width - 48;
  const maxDisplayH = containerDimensions.height - 48;

  const baseScale = Math.min(
    maxDisplayW / canvasLogical.width,
    maxDisplayH / canvasLogical.height,
    1
  );

  const finalDisplayScale = baseScale * zoomLevel;
  const displayW = Math.round(canvasLogical.width * finalDisplayScale);
  const displayH = Math.round(canvasLogical.height * finalDisplayScale);

  // Drag-and-drop onto entire canvas stage
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsStageDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsStageDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsStageDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageSelected(file);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      id="canvas-stage-wrapper"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative flex-1 h-full min-h-[420px] bg-neutral-950 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Background Grid Pattern for Studio Canvas */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Drag & drop overlay indicator */}
      {isStageDragging && (
        <div className="absolute inset-4 z-40 rounded-2xl border-2 border-dashed border-indigo-400 bg-indigo-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white animate-in fade-in">
          <UploadCloud className="w-12 h-12 text-indigo-300 animate-bounce mb-2" />
          <p className="text-lg font-bold">Drop your screenshot here</p>
          <p className="text-xs text-indigo-300">Instant canvas placement & cover-fit</p>
        </div>
      )}

      {/* Stage Canvas Card with Checkerboard underneath for alpha transparency */}
      <div
        id="canvas-frame-container"
        className="relative shadow-2xl transition-transform duration-75 flex items-center justify-center"
        style={{
          width: `${displayW}px`,
          height: `${displayH}px`,
        }}
      >
        {/* Transparent Checkerboard Pattern */}
        {state.background.type === 'transparent' && (
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #18181B 25%, transparent 25%),
                linear-gradient(-45deg, #18181B 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #18181B 75%),
                linear-gradient(-45deg, transparent 75%, #18181B 75%)
              `,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
              backgroundColor: '#09090B',
            }}
          />
        )}

        {/* The Live Render Canvas */}
        <canvas
          ref={canvasRef}
          id="mockup-render-canvas"
          className="w-full h-full object-contain rounded-lg relative z-10"
        />
      </div>

      {/* Floating Viewport Controls Toolbar */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-1 rounded-xl shadow-xl">
        <button
          type="button"
          id="zoom-out-btn"
          onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.15).toFixed(2))))}
          title="Zoom Out"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-mono font-medium text-neutral-400 px-2">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          type="button"
          id="zoom-in-btn"
          onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.15).toFixed(2))))}
          title="Zoom In"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-neutral-800 mx-0.5" />

        <button
          type="button"
          id="zoom-fit-btn"
          onClick={() => setZoomLevel(1)}
          title="Reset to Fit Screen"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas Dimensions Tag */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2">
        <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 px-2.5 py-1 rounded-lg">
          {canvasLogical.width} × {canvasLogical.height} px
        </span>
      </div>
    </div>
  );
};
